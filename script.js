const menuToggle = document.querySelector("#menuToggle");
const nav = document.querySelector("#nav");

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const open = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!open));
    menuToggle.setAttribute("aria-label", open ? "Open menu" : "Close menu");
    nav.classList.toggle("open", !open);
  });
  nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open menu");
  }));
}

const revealItems = document.querySelectorAll(".section, .work-item, .stack-card, .journey-card, .contact-layout");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach(item => {
    item.classList.add("reveal");
    observer.observe(item);
  });
} else {
  revealItems.forEach(item => item.classList.add("visible"));
}

const copyButton = document.querySelector("#copyEmail");
const feedback = document.querySelector("#copyFeedback");
if (copyButton && feedback) {
  copyButton.addEventListener("click", async () => {
    const email = copyButton.dataset.email;
    try {
      await navigator.clipboard.writeText(email);
      feedback.textContent = "EMAIL COPIED";
    } catch {
      feedback.textContent = `EMAIL: ${email}`;
    }
  });
}
