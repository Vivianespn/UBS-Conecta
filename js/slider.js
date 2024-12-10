(function () {
  // Seleciona os elementos do slider
  const slides = document.querySelectorAll('.slides img');
  const prevButton = document.querySelector('.slider .prev');
  const nextButton = document.querySelector('.slider .next');
  const indicatorsContainer = document.querySelector('.indicators');

  // Variáveis para controle do slider
  let currentSlide = 0;
  const totalSlides = slides.length;

  // Função para atualizar o slider (mover para a próxima/prev imagem)
  function updateSlider() {
    const offset = -currentSlide * 100; // Calcula o deslocamento para mostrar a imagem atual
    document.querySelector(
      '.slides'
    ).style.transform = `translateX(${offset}%)`;
    updateIndicators();
  }

  // Função para criar os indicadores
  function createIndicators() {
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if (i === 0) dot.classList.add('active'); // Ativa o primeiro indicador
      dot.addEventListener('click', () => {
        currentSlide = i; // Atualiza o slide ao clicar no indicador
        updateSlider();
      });
      indicatorsContainer.appendChild(dot);
    }
  }

  // Função para atualizar os indicadores
  function updateIndicators() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentSlide);
    });
  }

  // Botão "Próximo"
  nextButton.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % totalSlides; // Vai para a próxima imagem ou volta ao início
    updateSlider();
  });

  // Botão "Anterior"
  prevButton.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides; // Vai para a anterior ou para a última
    updateSlider();
  });

  // Auto-play (opcional)
  let autoPlay = setInterval(() => {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
  }, 5000); // Altere o valor em milissegundos para ajustar o tempo entre trocas

  // Pausar auto-play ao passar o mouse no slider
  const sliderElement = document.querySelector('.slider');
  sliderElement.addEventListener('mouseover', () => clearInterval(autoPlay));
  sliderElement.addEventListener('mouseout', () => {
    autoPlay = setInterval(() => {
      currentSlide = (currentSlide + 1) % totalSlides;
      updateSlider();
    }, 5000);
  });

  // Inicialização
  createIndicators();
})();
