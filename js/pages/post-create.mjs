import { showLoader, hideLoader } from '../components/loader.mjs';
import { fetchData } from '../components/fetch.mjs';

document.addEventListener("DOMContentLoaded", function() {
    const postForm = document.getElementById('post-form');
    const cancelButton = document.getElementById('cancel-button');
    const postImageURL = document.getElementById('post-image-url');
    postImageURL.addEventListener('change', updateImagePreview);

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
            alert('Failed to create post. Please try again.');
        } finally {
            hideLoader();
        }
    });

    cancelButton.addEventListener('click', () => {
        postForm.reset();
    });
});