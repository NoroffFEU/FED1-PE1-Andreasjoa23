import { showLoader, hideLoader } from '../components/loader.mjs';
import { fetchData } from '../components/fetch.mjs';

document.addEventListener("DOMContentLoaded", function() {
    const postForm = document.getElementById('post-form');
    const cancelButton = document.getElementById('cancel-button');
    const postImageURL = document.getElementById('post-image-url');
    postImageURL.addEventListener('change', updateImagePreview);

    function checkAccessToken() {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (!userInfo || !userInfo.accessToken) {
            alert("You are not authorized to be here. Please log in.");
            window.location.href = '../account/login.html';
        }
    }
    checkAccessToken();

    function updateImagePreview() {
        const imageUrl = document.getElementById('post-image-url').value;
        const imagePreview = document.getElementById('image-preview');
        const urlPattern = /^(https?:\/\/[^\s$.?#].[^\s]*)$/;
    
        if (imageUrl && urlPattern.test(imageUrl)) {
            imagePreview.src = imageUrl;
            imagePreview.alt = "Image Preview";
            imagePreview.style.display = "block";
        } else {
            imagePreview.src = "";
            imagePreview.alt = "";
            imagePreview.style.display = "none";
            if (imageUrl) {
                alert("There is no URL that starts like that.");
            }
        }
    }
    
    postForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const newPostData = {
            title: formData.get('post-title'),
            media: {
                url: formData.get('post-image-url'),
                alt: formData.get('post-image-alt'),
            },
            body: formData.get('post-content'),
        };
        showLoader();  
        try {
            const response = await fetchData('https://v2.api.noroff.dev/blog/posts/Alfred', 'POST', newPostData);
            const newPostId = response.id;

            if (newPostId) {
                localStorage.setItem('post', JSON.stringify({
                    ...newPostData,
                    id: newPostId,
                    created: new Date().toISOString(),
                    updated: new Date().toISOString()
                }));
                alert('You just created a Hollywood level post!')
                window.location.href = `../index.html?id=${newPostId}`;
            } else {
                alert('Failed to get the ID of the newly created post.');
            }
            
        } catch (error) {
            console.error('Error creating post:', error);
            if (error.message.includes('403')) {
                alert('You are not authorized to create a post. Please make sure you have the correct permissions.');
            } else {
                alert('Failed to create post. Please try again.');
            }
        } finally {
            hideLoader();
        }
    });

    cancelButton.addEventListener('click', () => {
        postForm.reset();
    });
});