let currentIndex = 0;

function moveSlide(direction) {
  const carouselInner = document.querySelector('.carousel-inner');
  const items = document.querySelectorAll('.carousel-item');
  currentIndex = (currentIndex + direction + items.length) % items.length;
  carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;
}
