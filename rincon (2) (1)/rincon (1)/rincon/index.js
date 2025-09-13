// Seleccionar elementos necesarios
const header = document.querySelector('header');
const nav = document.querySelector('nav');
const menuToggle = document.querySelector('.menu-toggle');
const heroSection = document.querySelector('#hero');

// Función: Ocultar header al hacer scroll
if (heroSection && header && nav) {
  const heroHeight = heroSection.offsetHeight;
  let lastScrollTop = 0;

  window.addEventListener('scroll', function () {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    // Cerrar menú si está abierto al hacer scroll
    if (nav.classList.contains('active')) {
      nav.classList.remove('active');
    }

    // Ocultar/mostrar header dependiendo del scroll
    if (currentScroll > heroHeight) {
      if (currentScroll > lastScrollTop) {
        header.classList.add('hidden');
      } else {
        header.classList.remove('hidden');
      }
    } else {
      header.classList.remove('hidden');
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  });
}

// Función: Toggle del menú responsive
if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
  });
}

// Función: Botones de WhatsApp
document.querySelectorAll('.btn-whatsapp').forEach(button => {
  button.addEventListener('click', (e) => {
    const card = e.target.closest('.carta');
    const productName = card ? card.querySelector('p').textContent : 'una habitación';

    const whatsappUrl = `https://wa.me/50497781626?text=Hola, estoy interesado en ${encodeURIComponent(productName)}`;
    window.open(whatsappUrl, '_blank');
  });
});
const slider = document.getElementById('sliderHabitaciones');
const btnLeft = document.querySelector('.scroll-btn.left');
const btnRight = document.querySelector('.scroll-btn.right');

// Ajustar visibilidad de botones según posición del scroll
function updateScrollButtons() {
  const scrollLeft = slider.scrollLeft;
  const scrollMax = slider.scrollWidth - slider.clientWidth;

  btnLeft.style.display = scrollLeft > 0 ? 'block' : 'none';
  btnRight.style.display = scrollLeft < scrollMax ? 'block' : 'none';
}

// Scroll al presionar los botones
btnLeft.addEventListener('click', () => {
  slider.scrollBy({ left: -300, behavior: 'smooth' });
});

btnRight.addEventListener('click', () => {
  slider.scrollBy({ left: 300, behavior: 'smooth' });
});

// Actualizar botones al hacer scroll manual
slider.addEventListener('scroll', updateScrollButtons);

// También al cargar la página
window.addEventListener('load', updateScrollButtons);

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("header nav");

menuToggle.addEventListener("click", () => {
  nav.classList.toggle("active");
});