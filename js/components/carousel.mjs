export function populateCarousel(posts) {
    const carouselContainer = document.querySelector('.carousel-container');
    const slides = carouselContainer.querySelectorAll('.carousel-slide');

    posts.slice(0, slides.length).forEach((post, index) => {
        const slide = slides[index];
        slide.innerHTML = `
            <img class="post-media" src="${post.media.url}" alt="${post.media.alt}">
            <div class="carousel-title">${post.title}</div>
            <a href="#" class="read-more-button" data-post-id="${post.id}">Read More</a>`;

        slide.addEventListener('click', (event) => {
            if (event.target.classList.contains('read-more-button')) {
                savePostDataToLocalStorage(post);
                redirectToPostPage();
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

function savePostDataToLocalStorage(post) {
    localStorage.setItem('post', JSON.stringify(post));
}

function redirectToPostPage() {
    window.location.href = `post/index.html`;
}
