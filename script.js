const toggleBtn = document.getElementById('modeToggle');
const htmlEl = document.documentElement;

// Caminhos das imagens
const lightImg = './img/modo-claro.png';
const darkImg  = './img/modo-escuro.png';

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


    // ====== AOS ======
    AOS.init({ duration: 700, once: true, offset: 80 });

    // ====== PARTICLES (tsParticles) ======
    (async () => {
      await tsParticles.load({ id: 'tsparticles', options: {
        background: { color: 'transparent' },
        fullScreen: { enable: false },
        particles: {
          number: { value: 60 },
          color: { value: ['#22d3ee', '#6366f1'] },
          links: { enable: true, color: '#64748b' },
          move: { enable: true, speed: 1.2 },
          opacity: { value: 0.6 },
          size: { value: { min: 1, max: 3 } }
        },
        interactivity: { events: { onHover: { enable: true, mode: 'repulse' } }, modes: { repulse: { distance: 120 } } }
      }});
    })();

    // ====== COUNTDOWN (até 07/09/2025 23:59 São Paulo) ======
    const countdownEl = document.getElementById('countdown');
    function updateCountdown(){
      const end = new Date('2025-09-07T23:59:00-03:00').getTime();
      const now = Date.now();
      let diff = Math.max(0, end - now);
      const d = Math.floor(diff / (1000*60*60*24)); diff -= d*24*60*60*1000;
      const h = Math.floor(diff / (1000*60*60)); diff -= h*60*60*1000;
      const m = Math.floor(diff / (1000*60)); diff -= m*60*1000;
      const s = Math.floor(diff / 1000);
      countdownEl.textContent = `${String(d).padStart(2,'0')}:${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
    }
    updateCountdown();
    setInterval(updateCountdown, 1000);

    // ====== SIMULADOR DE INSCRITOS (CountUp simples) ======
    const statEl = document.getElementById('stat-inscritos');
    let count = 128; // número inicial fictício
    statEl.textContent = count;
    setInterval(() => { count += Math.floor(Math.random()*3); statEl.textContent = count; }, 2500);

    // ====== SWIPER ======
    const swiper = new Swiper('.swiper', {
      slidesPerView: 1,
      spaceBetween: 16,
      loop: true,
      pagination: { el: '.swiper-pagination', clickable: true },
      navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
      breakpoints: { 700: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }
    });

    // ====== GLightbox ======
    const lightbox = GLightbox({ selector: '.glightbox' });

    // ====== VanillaTilt ======
    VanillaTilt.init(document.querySelectorAll('[data-tilt]'));

    // ====== ISOTOPE (grid de histórias) ======
    let iso;
    window.addEventListener('load', () => {
      const grid = document.querySelector('.grid');
      iso = new Isotope(grid, { itemSelector: '.grid-item', layoutMode: 'masonry' });
    });
    document.querySelectorAll('.filters button').forEach(btn => {
      btn.addEventListener('click', () => iso.arrange({ filter: btn.dataset.filter }));
    });

    // ====== FORM / SWEETALERT / CONFETTI / LOTTIE ======
    const form = document.getElementById('formInscricao');
    const lottieEl = document.getElementById('lottieSuccess');
    let anim;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const nome = document.getElementById('nome');
      const email = document.getElementById('email');
      const curso = document.getElementById('curso');
      const area = document.getElementById('area');

      if(!nome.value || !email.validity.valid || !curso.value || !area.value){
        Swal.fire({ icon: 'error', title: 'Ops!', text: 'Preencha todos os campos corretamente.' });
        return;
      }

      Swal.fire({
        title: 'Inscrição realizada!',
        text: 'Você receberá novidades em breve.',
        icon: 'success',
        confirmButtonColor: '#4f46e5'
      });

      confetti({ particleCount: 120, spread: 70, origin: { y: .7 } });

      lottieEl.style.display = 'block';
      if(!anim){
        anim = lottie.loadAnimation({
          container: lottieEl,
          renderer: 'svg', loop: false, autoplay: true,
          path: 'https://lottie.host/2d66b8f8-2a63-4b7d-8a9b-2a9f0d5e1b13/1bH0mH1yCq.json'
        });
      } else { anim.goToAndPlay(0, true); }

      form.reset();
    });

    // ====== FAQ Accordion ======
    document.querySelectorAll('.faq-item').forEach(item => {
      const q = item.querySelector('.faq-q');
      const a = item.querySelector('.faq-a');
      q.addEventListener('click', () => {
        const open = a.style.display === 'block';
        a.style.display = open ? 'none' : 'block';
        q.querySelector('span').textContent = open ? '+' : '−';
      });
    });

    // ====== GSAP / ScrollTrigger micro animações ======
    gsap.registerPlugin(ScrollTrigger);
    gsap.utils.toArray('.card, .track, .prize, .stat, .step').forEach((el, i) => {
      gsap.from(el, { y: 24, opacity: 0, duration: .6, delay: i*0.03, scrollTrigger: { trigger: el, start: 'top 85%' } });
    });