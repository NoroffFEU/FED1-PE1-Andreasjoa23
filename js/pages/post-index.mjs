document.addEventListener("DOMContentLoaded", function() {
    
    const urlParams = new URLSearchParams(window.location.search);
    const postTitle = urlParams.get('title');
    const postBody = urlParams.get('body');
    const imageUrl = urlParams.get('imageUrl');
    const created = urlParams.get('created');
    const updated = urlParams.get('updated');
    const authorName = urlParams.get('authorName');

    const postDetailContainer = document.getElementById("postDetail");

    const imageTitleContainer = document.createElement("div");
    imageTitleContainer.classList.add("image-title-container");

    const image = document.createElement("img");
    image.src = imageUrl;
    image.alt = postTitle;

    const title = document.createElement("h1");
    title.textContent = postTitle;

    const body = document.createElement("p");
    body.textContent = postBody;

    const createdElement = document.createElement("post-info");
    createdElement.textContent = `Posted: ${created}`;

    const updatedElement = document.createElement("post-info");
    updatedElement.textContent = `Updated: ${updated}`;

    const author = document.createElement("post-info");
    author.textContent = `Posted by: ${authorName}`;

    imageTitleContainer.append(image, title);
    postDetailContainer.append(imageTitleContainer, author, createdElement, updatedElement, body);
});
