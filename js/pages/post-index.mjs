document.addEventListener("DOMContentLoaded", function() {
    const post = JSON.parse(localStorage.getItem('post'));
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    if (post) {
        displayPost(post, userInfo);
    } else {
        console.error('No post data found in local storage');
    }

    function displayPost(post, userInfo) {
        const postContainer = document.getElementById("postDetail");

        const media = document.createElement("img");
        media.classList.add("post-media");
        media.src = post.media.url;
        media.alt = post.media.alt;

        const title = document.createElement("h1");
        title.classList.add("post-title");
        title.textContent = post.title;

        const body = document.createElement("p");
        body.classList.add("post-body");
        body.textContent = post.body;

        const author = document.createElement("p");
        author.classList.add("post-author");
        author.textContent = `Author: ${post.author ? post.author.name : 'Unknown'}`;

        const created = document.createElement("p");
        created.classList.add("post-created");
        created.textContent = `Created: ${formatDate(post.created)}`;

        const updated = document.createElement("p");
        updated.classList.add("post-updated");
        updated.textContent = `Updated: ${formatDate(post.updated)}`;

        const creatorDetails = document.createElement("div");
        creatorDetails.classList.add("creator-details");

        creatorDetails.append(author,created,updated);
        postContainer.append(title, media, creatorDetails, body);

        if (userInfo) {
            const editButton = document.createElement("button");
            editButton.textContent = "Edit";
            editButton.classList.add("edit-button");
            editButton.addEventListener("click", () => {
                savePostDataToLocalStorage(post);
                redirectToEditPage(post.id);
            });
            postContainer.appendChild(editButton);
        }
    }

    function formatDate(dateString) {
        const options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        };
        return new Date(dateString).toLocaleString(undefined, options).replace(',', '');
    }

    function savePostDataToLocalStorage(post) {
        localStorage.setItem('post', JSON.stringify(post));
    }

    function redirectToEditPage(postId) {
        window.location.href = `./edit.html?postId=${postId}`;
    }
});
