const yearNode = document.querySelector("#year");
if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}

const menuButton = document.querySelector(".menu-toggle");
const navList = document.querySelector(".nav-list");

if (menuButton && navList) {
  menuButton.addEventListener("click", () => {
    const isOpen = navList.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        const delayMs = index * 90;
        setTimeout(() => {
          entry.target.classList.add("is-visible");
        }, delayMs);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((node) => observer.observe(node));

const stats = document.querySelectorAll(".stat-value");
const animateCount = (node) => {
  const endValue = Number(node.getAttribute("data-count"));
  let current = 0;
  const step = Math.max(1, Math.floor(endValue / 42));

  const timer = setInterval(() => {
    current += step;
    if (current >= endValue) {
      node.textContent = String(endValue);
      clearInterval(timer);
      return;
    }
    node.textContent = String(current);
  }, 24);
};

const statsObserver = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        obs.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

stats.forEach((node) => statsObserver.observe(node));

const shapes = Array.from(document.querySelectorAll(".shape"));
window.addEventListener("pointermove", (event) => {
  const x = event.clientX / window.innerWidth - 0.5;
  const y = event.clientY / window.innerHeight - 0.5;

  shapes.forEach((shape, i) => {
    const movement = (i + 1) * 9;
    shape.style.transform = `translate(${x * movement}px, ${y * movement}px)`;
  });
});

const form = document.querySelector(".contact-form");
if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const button = form.querySelector("button");
    if (button) {
      button.textContent = "Sent";
      button.disabled = true;
    }
  });
}
