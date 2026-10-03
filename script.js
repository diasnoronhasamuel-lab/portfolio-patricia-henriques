// =====================================================
// MARCA QUE O JAVASCRIPT ESTÁ ATIVO
// =====================================================

document.documentElement.classList.add("js");


// =====================================================
// MENU MOBILE
// =====================================================

const burger = document.getElementById("burger");
const menu = document.getElementById("menu");


function toggleMenu(open) {

  if (!burger || !menu) {
    return;
  }

  menu.classList.toggle("open", open);

  burger.setAttribute(
    "aria-expanded",
    String(open)
  );

  burger.setAttribute(
    "aria-label",
    open
      ? "Fechar menu"
      : "Abrir menu"
  );


  const icon = burger.querySelector("i");

  if (icon) {

    icon.className = open
      ? "fa-solid fa-xmark"
      : "fa-solid fa-bars";

  }

}


// Abre / fecha menu

if (burger && menu) {

  burger.addEventListener("click", () => {

    const isOpen =
      menu.classList.contains("open");

    toggleMenu(!isOpen);

  });


  // Fecha quando clicar em algum link

  menu
    .querySelectorAll("a")
    .forEach(link => {

      link.addEventListener("click", () => {

        toggleMenu(false);

      });

    });

}


// Fecha com ESC

document.addEventListener("keydown", event => {

  if (event.key === "Escape") {

    toggleMenu(false);

  }

});


// =====================================================
// ANIMAÇÃO AO ROLAR
// =====================================================

const reveals =
  document.querySelectorAll(".reveal");


if ("IntersectionObserver" in window) {

  const observer =
    new IntersectionObserver(
      (entries, obs) => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target.classList.add(
              "visible"
            );

            obs.unobserve(
              entry.target
            );

          }

        });

      },
      {
        threshold: 0.12
      }
    );


  reveals.forEach(element => {

    observer.observe(element);

  });

} else {

  reveals.forEach(element => {

    element.classList.add("visible");

  });

}


// =====================================================
// MENU — SEÇÃO ATUAL
// =====================================================

if (menu) {

  const links = [
    ...menu.querySelectorAll(
      'a[href^="#"]:not(.btn)'
    )
  ];


  const sections = links
    .map(link => {

      const id =
        link.getAttribute("href");

      return document.querySelector(id);

    })
    .filter(Boolean);


  function updateActiveSection() {

    const position =
      window.scrollY + 160;

    let current = 0;


    sections.forEach(
      (section, index) => {

        if (
          section.offsetTop <= position
        ) {

          current = index;

        }

      }
    );


    links.forEach(
      (link, index) => {

        link.classList.toggle(
          "active",
          index === current
        );

      }
    );

  }


  window.addEventListener(
    "scroll",
    updateActiveSection,
    {
      passive: true
    }
  );


  updateActiveSection();

}


// =====================================================
// FECHAR MENU SE A JANELA VOLTAR PARA DESKTOP
// =====================================================

window.addEventListener("resize", () => {

  if (
    window.innerWidth > 900
  ) {

    toggleMenu(false);

  }

});


// =====================================================
// ANO AUTOMÁTICO NO FOOTER
// =====================================================

const yearElement =
  document.querySelector("[data-year]");


if (yearElement) {

  yearElement.textContent =
    new Date().getFullYear();

}