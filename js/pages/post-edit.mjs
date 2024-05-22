import { fetchData } from "../components/fetch.mjs";

document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('postId');
    console.log(postId)

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
});

function populateForm(postData) {
    const titleInput = document.getElementById("post-title");
    const contentInput = document.getElementById("post-content");
    const imageUrlInput = document.getElementById("post-image-url");
    const imageAlt = document.getElementById("post-image-alt");
    const currentImage = document.getElementById("current-image");

    titleInput.value = postData.title;
    contentInput.value = postData.body;
    currentImage.src = postData.media.url;
    imageUrlInput.value = postData.media.url;
    imageAlt.value = postData.media.alt;
}

document.getElementById('post-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const postId = new URLSearchParams(window.location.search).get('postId');
    const formData = new FormData(event.target);
    const trying = {
        title: formData.get('post-title'),
        media: {
            url: formData.get('post-image-url'),
            alt: formData.get('post-image-alt'),
        },
        body: formData.get('post-content'),
    }
    await fetchData(`https://v2.api.noroff.dev/blog/posts/Alfred/${postId}`,'PUT', trying)
    alert('wohooo, mutherfucker')
})