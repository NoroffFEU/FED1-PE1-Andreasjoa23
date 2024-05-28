import { showLoader, hideLoader } from '../components/loader.mjs';
import { fetchData } from '../components/fetch.mjs';
import { populateCarousel } from '../components/carousel.mjs';

document.addEventListener("DOMContentLoaded", async function() {
    try {
        showLoader();
        const data = await fetchData('https://v2.api.noroff.dev/blog/posts/Alfred', 'GET', null, false);
        populateCarousel(data);
        populateBlogList(data);
    } catch (error) {
        console.error('Error:', error);
    } finally {
        hideLoader();
    }

    function populateBlogList(posts) {
        const movieListContainer = document.getElementById("movieList");

        posts.forEach(post => {
            const postCard = document.createElement("div");
            postCard.classList.add("post-card");

            const media = document.createElement("img");
            media.classList.add("post-media");
            media.src = post.media.url;
            media.alt = post.media.alt;

            const title = document.createElement("h2");
            title.classList.add("post-title");
            title.textContent = post.title;

            const readMoreLink = document.createElement("button");
            readMoreLink.textContent = "Read More";
            readMoreLink.classList.add("read-more-button");
            readMoreLink.href = "post/index.html?id=" + post.id;
            readMoreLink.dataset.postId = post.id;
            readMoreLink.addEventListener("click", () => {
                savePostDataToLocalStorage(post);
                redirectToPostPage(post.id);
            });

            media.addEventListener('click', () => {
                savePostDataToLocalStorage(post);
                redirectToPostPage(post.id);
            });

            postCard.append(media, title, readMoreLink);

            if (localStorage.getItem('userInfo')) {
                const editButton = document.createElement("button");
                editButton.textContent = "Edit post";
                editButton.classList.add("edit-button");
                editButton.addEventListener("click", () => {
                    savePostDataToLocalStorage(post);
                    redirectToEditPage(post.id);
                });
                postCard.appendChild(editButton);
            }
            movieListContainer.appendChild(postCard);
        });
    }

    function savePostDataToLocalStorage(post) {
        localStorage.setItem('post', JSON.stringify(post));
    }
    function redirectToPostPage(postId) {
        window.location.href = `post/index.html?id=${postId}`;
    }
    function redirectToEditPage(postId) {
        window.location.href = `post/edit.html?postId=${postId}`;
    }
});
