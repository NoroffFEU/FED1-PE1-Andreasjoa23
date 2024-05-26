import { fetchData } from "../components/fetch.mjs";


document.addEventListener("DOMContentLoaded", function() {
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

function populateForm(postData) {
    document.getElementById("post-title").value = postData.title;
    document.getElementById("post-content").value = postData.body;
    document.getElementById("post-image-url").value = postData.media.url;
    document.getElementById("post-image-alt").value = postData.media.alt;
    updateImagePreview();
}

function updateImagePreview() {
    const imageUrl = document.getElementById('post-image-url').value;
    const imagePreview = document.getElementById('image-preview');

    if (imageUrl) {
        imagePreview.src = imageUrl;
    }
}

async function updatePost(formData, postId) {
    try {
        await fetchData(`https://v2.api.noroff.dev/blog/posts/Alfred/${postId}`, 'PUT', formData);
        redirectToPostIndex(postId);
    } catch (error) {
        console.error('Error updating post:', error);
        alert('Failed to update post. Please try again.');
    }
}

async function deletePost(postId) {
    try {
        await fetchData(`https://v2.api.noroff.dev/blog/posts/Alfred/${postId}`, 'DELETE');
        redirectToPostIndex();
    } catch (error) {
        console.error('Error deleting post:', error);
        alert('Failed to delete post. Please try again.');
    }
}

function redirectToPostIndex() {
    window.location.href = '/index.html';
}

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
    alert('Post updated successfully!');
});

document.getElementById('delete-btn').addEventListener('click', async () => {
    const postId = new URLSearchParams(window.location.search).get('postId');
    if (confirm('Are you sure you wanna terminator this post?')) {
        await deletePost(postId);
    }
});