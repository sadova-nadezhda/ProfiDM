var header = document.querySelector("header");
let lastScrollTop = 0;
var sectionTop = document.querySelector('.section-top');

// Functions
function addPadTop(header, section) {
  let headerHeight = header.offsetHeight;
  section.style.marginTop = `${headerHeight}px`;
}

function handleScroll() {
  if (window.innerWidth > 980) {
    const currentScroll = window.scrollY;

    if (currentScroll > lastScrollTop) {
      // Скролл вниз — прячем шапку
      header.classList.add('hidden');
    } else {
      // Скролл вверх — показываем шапку
      header.classList.remove('hidden');
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; 
  } else {
    header.classList.remove('hidden');
  }
}


window.addEventListener("load", function () {
  let link = document.querySelector(".header__burger");
  let menu = document.querySelector(".header__nav");
  if (menu) {
    link.addEventListener(
      "click",
      function () {
        link.classList.toggle("active");
        menu.classList.toggle("open");
      },
      false
    );
    window.addEventListener("scroll", () => {
      if (menu.classList.contains("open")) {
        link.classList.remove("active");
        menu.classList.remove("open");
      }
    });
    document.addEventListener("click", (e) => {
      let target = e.target;
      if (
        !target.classList.contains("header__nav") &&
        !target.classList.contains("header__burger")
      ) {
        link.classList.remove("active");
        menu.classList.remove("open");
      }
    });
  }
  if (sectionTop && header) {
    addPadTop(header, sectionTop)
  }
  window.addEventListener("resize", () => {
    if (sectionTop && header) {
      addPadTop(header, sectionTop)
    }
    if (window.innerWidth <= 980) {
      header.classList.remove('hidden');
    }
  });  
  window.addEventListener('scroll', handleScroll);
});
