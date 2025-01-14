// let currentIndex = 0;

// function moveSlide(direction) {
//   const carouselInner = document.querySelector('.carousel-inner');
//   const items = document.querySelectorAll('.carousel-item');
//   currentIndex = (currentIndex + direction + items.length) % items.length;
//   carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;
// }
// Recuperar os dados do localStorage
const formData = JSON.parse(localStorage.getItem('formData'));

if (formData && formData['full-name']) {
  // Substitua 'full-name' pelo name do campo de nome completo
  const nomeCompleto = formData['full-name'].trim();
  const primeiroNome = nomeCompleto.split(' ')[0]; // Extrai o primeiro nome

  // Exibir o primeiro nome
  document.querySelector('.user-name').textContent = primeiroNome;
} else {
  alert('Nome não encontrado.');
}
