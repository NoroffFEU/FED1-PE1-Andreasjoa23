document.addEventListener("DOMContentLoaded", function() {
    const post = JSON.parse(localStorage.getItem('post'));
    if (post) {
        displayPost(post);
    } else {
        console.error('No post data found in local storage');
    }

    function displayPost(post) {
        const postContainer = document.getElementById("postDetail");

        const media = document.createElement("img");
        media.classList.add("post-media");
        media.src = post.media.url;
        media.alt = post.media.alt;

        const title = document.createElement("h2");
        title.classList.add("post-title");
        title.textContent = post.title;

        const body = document.createElement("p");
        body.classList.add("post-body");
        body.textContent = post.body;

        const author = document.createElement("p");
        author.classList.add("post-author");
        author.textContent = `Author: ${post.author.name}`;

        const created = document.createElement("p");
        created.classList.add("post-created");
        created.textContent = `Created: ${post.created}`;

        const updated = document.createElement("p");
        updated.classList.add("post-updated");
        updated.textContent = `Updated: ${post.updated}`;

        postContainer.append(media, title, body, author, created, updated);
    }
});
