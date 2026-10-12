// =====================================================
// MARCA QUE O JAVASCRIPT ESTÁ ATIVO
// =====================================================
document.documentElement.classList.add("js");

const header = document.querySelector(".header");
const burger = document.getElementById("burger");
const menu = document.getElementById("menu");


// =====================================================
// MENU MOBILE
// =====================================================
function toggleMenu(open) {
  if (!burger || !menu) return;

  menu.classList.toggle("open", open);
  burger.setAttribute("aria-expanded", String(open));
  burger.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");

  const icon = burger.querySelector("i");
  if (icon) icon.className = open ? "fa-solid fa-xmark" : "fa-solid fa-bars";
}

if (burger && menu) {
  burger.addEventListener("click", () => toggleMenu(!menu.classList.contains("open")));

  // Fecha ao clicar em um link
  menu.querySelectorAll("a").forEach(link =>
    link.addEventListener("click", () => toggleMenu(false))
  );

  // Fecha ao clicar fora do menu
  document.addEventListener("click", event => {
    if (menu.classList.contains("open") && !menu.contains(event.target) && !burger.contains(event.target)) {
      toggleMenu(false);
    }
  });
}

// Fecha com ESC
document.addEventListener("keydown", event => {
  if (event.key === "Escape") toggleMenu(false);
});

// Fecha o menu se a janela voltar para desktop
window.addEventListener("resize", () => {
  if (window.innerWidth > 900) toggleMenu(false);
});


// =====================================================
// ELEMENTOS CRIADOS PELO JS (barra de progresso e botão "topo")
// =====================================================
const progress = document.createElement("div");
progress.className = "scroll-progress";
progress.setAttribute("aria-hidden", "true");
document.body.appendChild(progress);

const toTop = document.createElement("button");
toTop.className = "to-top";
toTop.type = "button";
toTop.setAttribute("aria-label", "Voltar ao topo");
toTop.innerHTML = '<i class="fa-solid fa-arrow-up" aria-hidden="true"></i>';
toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
document.body.appendChild(toTop);


// =====================================================
// ROLAGEM: cabeçalho, progresso e botão topo
// (um único listener, agrupado com requestAnimationFrame)
// =====================================================
let ticking = false;

function onScroll() {
  const y = window.scrollY;
  const max = document.documentElement.scrollHeight - window.innerHeight;

  if (header) header.classList.toggle("scrolled", y > 24);
  progress.style.transform = "scaleX(" + (max > 0 ? Math.min(y / max, 1) : 0) + ")";
  toTop.classList.toggle("show", y > 600);

  ticking = false;
}

window.addEventListener("scroll", () => {
  if (!ticking) {
    ticking = true;
    requestAnimationFrame(onScroll);
  }
}, { passive: true });

onScroll();


// =====================================================
// ANIMAÇÃO AO ROLAR (com atraso escalonado entre irmãos)
// =====================================================
const reveals = document.querySelectorAll(".reveal");

reveals.forEach(el => {
  const siblings = [...el.parentElement.children].filter(c => c.classList.contains("reveal"));
  el.style.setProperty("--d", Math.min(siblings.indexOf(el), 6) * 70 + "ms");
});

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

  reveals.forEach(el => revealObserver.observe(el));
} else {
  reveals.forEach(el => el.classList.add("visible"));
}


// =====================================================
// MENU — SEÇÃO ATUAL (IntersectionObserver)
// =====================================================
if (menu && "IntersectionObserver" in window) {
  const links = [...menu.querySelectorAll('a[href^="#"]:not(.btn)')];
  const map = new Map();

  links.forEach(link => {
    const section = document.querySelector(link.getAttribute("href"));
    if (section) map.set(section, link);
  });

  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(l => l.classList.remove("active"));
        map.get(entry.target).classList.add("active");
      }
    });
  }, { rootMargin: "-45% 0px -50% 0px" });

  map.forEach((_, section) => sectionObserver.observe(section));
}


// =====================================================
// ANO AUTOMÁTICO NO FOOTER
// =====================================================
const yearElement = document.querySelector("[data-year]");
if (yearElement) yearElement.textContent = new Date().getFullYear();