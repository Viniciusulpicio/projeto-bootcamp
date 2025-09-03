const toggleBtn = document.getElementById('modeToggle');
const htmlEl = document.documentElement;

// Caminhos das imagens
const lightImg = './img/modo-claro.png';
const darkImg = './img/modo-escuro.png';

// Recupera tema salvo
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  htmlEl.setAttribute('data-theme', savedTheme);
  toggleBtn.src = savedTheme === 'light' ? darkImg : lightImg;
}

toggleBtn.addEventListener('click', () => {
  const next = htmlEl.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  htmlEl.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  toggleBtn.src = next === 'light' ? darkImg : lightImg;
});

const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
  item.addEventListener('click', () => {
    // fecha os outros
    faqItems.forEach(el => {
      if (el !== item) el.classList.remove('active');
    });

    // abre/fecha o clicado
    item.classList.toggle('active');
  });
});