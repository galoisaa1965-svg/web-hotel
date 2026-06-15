const WHATSAPP_NUMBER = "50432707995";

document.addEventListener("DOMContentLoaded", () => {
  setupMenu();
  setupHeaderOnScroll();
  setupRoomSlider();
  setupWhatsappButtons();
  setupReservationForm();
  setupReservationDates();
});

function setupMenu() {
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");

  if (!menuToggle || !nav) return;

  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("active");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

function setupHeaderOnScroll() {
  const header = document.querySelector(".site-header");
  const nav = document.querySelector(".main-nav");
  const hero = document.querySelector(".hero");

  if (!header) return;

  let lastScrollTop = 0;

  window.addEventListener("scroll", () => {
    const currentScroll = window.scrollY || document.documentElement.scrollTop;
    const heroHeight = hero ? hero.offsetHeight : 180;

    if (nav && nav.classList.contains("active")) {
      nav.classList.remove("active");
      const menuToggle = document.querySelector(".menu-toggle");
      if (menuToggle) menuToggle.setAttribute("aria-expanded", "false");
    }

    if (currentScroll > heroHeight && currentScroll > lastScrollTop) {
      header.classList.add("hidden");
    } else {
      header.classList.remove("hidden");
    }

    lastScrollTop = Math.max(currentScroll, 0);
  });
}

function setupRoomSlider() {
  const slider = document.getElementById("sliderHabitaciones");
  const btnLeft = document.querySelector(".scroll-btn.left");
  const btnRight = document.querySelector(".scroll-btn.right");

  if (!slider || !btnLeft || !btnRight) return;

  const scrollAmount = 324;

  function updateButtons() {
    const maxScroll = slider.scrollWidth - slider.clientWidth;
    btnLeft.style.display = slider.scrollLeft > 5 ? "block" : "none";
    btnRight.style.display = slider.scrollLeft < maxScroll - 5 ? "block" : "none";
  }

  btnLeft.addEventListener("click", () => {
    slider.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  });

  btnRight.addEventListener("click", () => {
    slider.scrollBy({ left: scrollAmount, behavior: "smooth" });
  });

  slider.addEventListener("scroll", updateButtons);
  window.addEventListener("resize", updateButtons);
  updateButtons();
}

function setupWhatsappButtons() {
  document.querySelectorAll(".btn-whatsapp").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();

      const roomName =
        button.dataset.room ||
        button.closest(".room-card")?.querySelector("h3")?.textContent ||
        "una habitación";

      const message = `Hola, quiero información para reservar: ${roomName}.`;
      openWhatsapp(message);
    });
  });
}

function setupReservationForm() {
  const form = document.getElementById("reservation-form");

  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = new FormData(form);
    const name = data.get("name").trim();
    const email = data.get("email").trim();
    const phone = data.get("phone").trim();
    const checkin = data.get("checkin");
    const checkout = data.get("checkout");
    const room = data.get("room");
    const guests = data.get("guests");
    const message = data.get("message").trim();

    if (!name || !email || !phone || !checkin || !checkout || !room || !guests) {
      alert("Por favor, completa todos los campos requeridos.");
      return;
    }

    if (checkout <= checkin) {
      alert("La fecha de salida debe ser posterior a la fecha de entrada.");
      return;
    }

    const whatsappMessage =
      `Hola, quiero hacer una reserva en Hotel Marsol:\n\n` +
      `Nombre: ${name}\n` +
      `Correo: ${email}\n` +
      `Teléfono: ${phone}\n` +
      `Fecha de entrada: ${checkin}\n` +
      `Fecha de salida: ${checkout}\n` +
      `Habitación: ${room}\n` +
      `Número de personas: ${guests}` +
      (message ? `\nComentarios: ${message}` : "");

    openWhatsapp(whatsappMessage);
  });
}

function setupReservationDates() {
  const checkin = document.getElementById("checkin");
  const checkout = document.getElementById("checkout");

  if (!checkin || !checkout) return;

  const today = new Date().toISOString().split("T")[0];
  checkin.min = today;
  checkout.min = today;

  checkin.addEventListener("change", () => {
    checkout.min = checkin.value;

    if (checkout.value && checkout.value <= checkin.value) {
      checkout.value = "";
    }
  });
}

function openWhatsapp(message) {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}
