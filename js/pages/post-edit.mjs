import { fetchData } from "../components/fetch.mjs";
import { showLoader, hideLoader } from '../components/loader.mjs';

document.addEventListener("DOMContentLoaded", async function() {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('postId');
    if (postId) {
        const postData = JSON.parse(localStorage.getItem('post'));

        if (postData && postData.id === postId) {
            populateForm(postData);
        } else {
            console.error('Post data not found in local storage or post ID does not match.');
        }
    } else {
        console.error("No post ID found in URL parameters.");
    }
    document.getElementById('post-image-url').addEventListener('input', updateImagePreview);
});

function checkAccessToken() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (!userInfo || !userInfo.accessToken) {
        alert("You are not authorized to be here. Please log in.");
        window.location.href = './account/login.html';
    }
}
checkAccessToken();

function populateForm(postData) {
    document.getElementById("post-title").value = postData.title;
    document.getElementById("post-content").innerHTML = postData.body.replace(/\n/g, "<br>");
    document.getElementById("post-image-url").value = postData.media.url;
    document.getElementById("post-image-alt").value = postData.media.alt;
    updateImagePreview();
}

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

async function updatePost(formData, postId) {
    try {
        showLoader();
        await fetchData(`https://v2.api.noroff.dev/blog/posts/Alfred/${postId}`, 'PUT', formData);
        alert('"Change is the law of life". You updated successfully!')
        redirectToPostIndex(postId);
    } catch (error) {
        console.error('Error updating post:', error);
        if (error.message.includes('403')) {
            hideLoader();
            alert('You are not authorized to update this post. Please make sure you have the correct permissions.');
        } else {
            alert('Failed to update post. Please try again.');
        }
    }
}

async function deletePost(postId) {
    try {
        showLoader();
        await fetchData(`https://v2.api.noroff.dev/blog/posts/Alfred/${postId}`, 'DELETE');
        hideLoader();
        redirectToPostIndex();
    } catch (error) {
        console.error('Error deleting post:', error);
        if (error.message.includes('403')) {
            hideLoader();
            alert('You are not authorized to update this post. Please make sure you have the correct permissions.');
        } else {
            alert('Failed to update post. Please try again.');
        }
    }
}
document.getElementById('delete-btn').addEventListener('click', async () => {
    const postId = new URLSearchParams(window.location.search).get('postId');
    if (confirm('Are you sure you want to Terminator™ this post?')) {
        await deletePost(postId);
    }
});

document.getElementById('post-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const postId = new URLSearchParams(window.location.search).get('postId');
    const formData = new FormData(event.target);
    const postData = {
        title: formData.get('post-title'),
        media: {
            url: formData.get('post-image-url'),
            alt: formData.get('post-image-alt'),
        },
        body: formData.get('post-content'),
    };
    await updatePost(postData, postId);
});

function redirectToPostIndex() {
    window.location.href = '../index.html';
}