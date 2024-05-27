import { fetchData } from '../components/fetch.mjs';

document.addEventListener("DOMContentLoaded", async function() {
    try {
        const data = await fetchData('https://v2.api.noroff.dev/blog/posts/Alfred', 'GET', null, false);
        console.log("Blog Posts", data);

        populateCarousel(data);
        populateBlogList(data);

    } catch (error) {
        console.error('Error:', error);
    }
    function populateCarousel(posts) {
        const carouselContainer = document.querySelector('.carousel-container');
        const slides = carouselContainer.querySelectorAll('.carousel-slide');

        posts.slice(0, slides.length).forEach((post, index) => {
            const slide = slides[index];
            slide.innerHTML = `
                <img class="post-media" src="${post.media.url}" alt="${post.media.alt}">
                <div class="carousel-title">${post.title}</div>
                <a href="post/index.html?id=${post.id}" class="read-more-button" data-post-id="${post.id}">Read More</a>`;
        
            slide.addEventListener('click', (event) => {
                if (event.target.classList.contains('read-more-button')) {
                    savePostDataToLocalStorage(post);
                    redirectToPostPage(post.id);
                }
                event.stopPropagation();
            });
        });
        
        slides[0].style.display = 'block';

        const prevButton = document.querySelector('.prev-button');
        const nextButton = document.querySelector('.next-button');

        let currentIndex = 0;

        prevButton.addEventListener('click', showPrevSlide);
        nextButton.addEventListener('click', showNextSlide);

        function showPrevSlide() {
            slides[currentIndex].style.display = 'none';
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            slides[currentIndex].style.display = 'block';
        }

        function showNextSlide() {
            slides[currentIndex].style.display = 'none';
            currentIndex = (currentIndex + 1) % slides.length;
            slides[currentIndex].style.display = 'block';
        }
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

            const readMoreLink = document.createElement("a");
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
                editButton.textContent = "Edit";
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