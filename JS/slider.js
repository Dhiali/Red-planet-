
  document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelectorAll('.slide');
    const prev = document.querySelector('.prev');
    const next = document.querySelector('.next');
    let currentSlide = 0;

    // Show the first slide initially
    slides[currentSlide].classList.add('active');

    // Function to hide all slides
    function hideAllSlides() {
      slides.forEach(slide => {
        slide.classList.remove('active');
      });
    }

    // Function to show the current slide
    function showSlide() {
      hideAllSlides();
      slides[currentSlide].classList.add('active');
    }

    // Next button click event
    next.addEventListener('click', function () {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide();
    });

    // Previous button click event
    prev.addEventListener('click', function () {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      showSlide();
    });
  });
