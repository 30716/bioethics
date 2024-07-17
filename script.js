let slideIndex = 0;
const slides = document.querySelectorAll(".slides");
const dots = document.querySelectorAll(".dot");

function showSlides() {
  slides.forEach((slide, index) => {
    slide.classList.remove("active");
    dots[index].classList.remove("active-dot");
  });
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  slides[slideIndex - 1].classList.add("active");
  dots[slideIndex - 1].classList.add("active-dot");
  setTimeout(showSlides, 10000); // 10초마다 슬라이드 변경
}

function changeSlide(n) {
  slideIndex += n;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  if (slideIndex < 1) {
    slideIndex = slides.length;
  }
  slides.forEach((slide, index) => {
    slide.classList.remove("active");
    dots[index].classList.remove("active-dot");
  });
  slides[slideIndex - 1].classList.add("active");
  dots[slideIndex - 1].classList.add("active-dot");
}

function currentSlide(n) {
  slideIndex = n;
  slides.forEach((slide, index) => {
    slide.classList.remove("active");
    dots[index].classList.remove("active-dot");
  });
  slides[slideIndex - 1].classList.add("active");
  dots[slideIndex - 1].classList.add("active-dot");
}

showSlides();
