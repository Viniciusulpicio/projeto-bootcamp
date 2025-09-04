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


const form = document.getElementById("formInscricao");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const ano = document.getElementById("ano").value;
  const ensino = document.getElementById("ensino").value;
  const cep = document.getElementById("cep").value.trim();
  const numero = document.getElementById("numero").value.trim();

  // Regex
  const nomeRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]{3,}$/; // apenas letras e espaços
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
  const cepRegex = /^[0-9]{5}-?[0-9]{3}$/; // 8 dígitos obrigatórios (00000-000 ou 00000000)
  const numeroRegex = /^[0-9]{1,5}$/; // 1 a 5 dígitos numéricos

  if (!nomeRegex.test(nome)) {
    alert(" Digite um nome válido (mín. 3 letras).");
    return;
  }
  if (!emailRegex.test(email)) {
    alert(" Digite um e-mail válido.");
    return;
  }
  if (!ano) {
    alert(" Selecione o ano escolar (Primeiro, Segundo ou Terceiro).");
    return;
  }
  if (!ensino) {
    alert(" Selecione o tipo de ensino.");
    return;
  }
  if (!cepRegex.test(cep)) {
    alert(" Digite um CEP válido (ex: 17500-000).");
    return;
  }
  if (!numeroRegex.test(numero)) {
    alert(" Digite um número de residência válido.");
    return;
  }

  alert(" Inscrição realizada com sucesso!");
  form.reset();
});

const menuToggle = document.getElementById('menuToggle');
const menu = document.querySelector('.menu');

menuToggle.addEventListener('click', () => {
  const isOpen = menu.classList.toggle('show');
  menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
});
