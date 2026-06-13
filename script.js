const header = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelectorAll(".nav-links a, .nav-phone");

const updateHeader = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 18);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

navToggle.addEventListener("click", () => {
  const isOpen = document.body.classList.toggle("nav-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    document.body.classList.remove("nav-open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);

document.querySelectorAll(".reveal").forEach((element) => {
  revealObserver.observe(element);
});

const contactForm = document.querySelector("#contact-form");

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(contactForm);
  const name = data.get("name");
  const email = data.get("email");
  const topic = data.get("topic");
  const message = data.get("message");
  const subject = encodeURIComponent(`Poptávka z webu: ${topic}`);
  const body = encodeURIComponent(
    `Jméno: ${name}\nE-mail: ${email}\nTéma: ${topic}\n\nZpráva:\n${message}`
  );

  window.location.href = `mailto:jakub.krupansky@bcas.cz?subject=${subject}&body=${body}`;
});
