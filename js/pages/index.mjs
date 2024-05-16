import { fetchData } from '../components/fetch.mjs';

document.addEventListener("DOMContentLoaded", async function() {
    try {
        const data = await fetchData();
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
                <h2 class="post-title">${post.title}</h2>
                <a href="post/index.html?id=${post.id}&title=${encodeURIComponent(post.title)}&body=${encodeURIComponent(post.body)}&imageUrl=${encodeURIComponent(post.media.url)}&created=${encodeURIComponent(post.created)}&updated=${encodeURIComponent(post.updated)}&authorName=${encodeURIComponent(post.author.name)}" class="read-more-button">Read More</a>`;
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

            readMoreLink.href = `post/index.html?id=${post.id}&title=${encodeURIComponent(post.title)}&body=${encodeURIComponent(post.body)}&imageUrl=${encodeURIComponent(post.media.url)}&created=${encodeURIComponent(post.created)}&updated=${encodeURIComponent(post.updated)}&authorName=${encodeURIComponent(post.author.name)}`;

            postCard.append(media, title, readMoreLink);
            movieListContainer.appendChild(postCard);
        });
    }
});