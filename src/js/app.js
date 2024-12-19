var header = document.querySelector("header");
let lastScrollTop = 0;
const sectionTop = document.querySelectorAll('.section-top');

// Функции
function addPadTop(section) {
  section.style.marginTop = `${header.offsetHeight}px`;
}

function handleScroll() {
  if (window.innerWidth > 980) {
    const currentScroll = window.scrollY;
    header.classList.toggle('hidden', currentScroll > lastScrollTop);
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  } else {
    header.classList.remove('hidden');
  }
}

window.addEventListener("load", function () {
  const link = document.querySelector(".header__burger");
  const menu = document.querySelector(".header__nav");

  if (menu) {
    link.addEventListener("click", () => {
      link.classList.toggle("active");
      menu.classList.toggle("open");
    }, { passive: true });

    window.addEventListener("scroll", () => {
      if (menu.classList.contains("open")) {
        link.classList.remove("active");
        menu.classList.remove("open");
      }
    });

    document.addEventListener("click", (e) => {
      if (!e.target.closest(".header__nav, .header__burger")) {
        link.classList.remove("active");
        menu.classList.remove("open");
      }
    });
  }

  sectionTop.forEach(addPadTop);

  // Табы портфолио
  document.querySelectorAll(".tabs").forEach(tabsContainer => {
    const STATE = { currentTab: null };
    const targetsContainer = tabsContainer.querySelector(".targets");
    const triggers = Array.from(tabsContainer.querySelectorAll(".trigger"));
    const select = tabsContainer.querySelector(".mobile-select");
    const targets = triggers.map(trigger => document.querySelector(trigger.dataset.target));

    function activateTab(ind) {
      if (ind == null) return ind;
      triggers[ind].classList.add("active");
      targets[ind].classList.add("active");
      targetsContainer.style.transform = `translateX(-${ind * 100}%)`;
      return ind;
    }

    function deactivateTab(ind) {
      if (ind == null) return ind;
      triggers[ind].classList.remove("active");
      targets[ind].classList.remove("active");
      return null;
    }

    if (targetsContainer) {
      triggers.forEach((trigger, ind) => {
        trigger.addEventListener("click", () => {
          STATE.currentTab = deactivateTab(STATE.currentTab);
          STATE.currentTab = activateTab(ind);
        }, { passive: true });
      });

      const currentHash = window.location.hash;
      const initialIndex = currentHash ? triggers.findIndex(trigger => trigger.getAttribute('href') === currentHash) : 0;
      STATE.currentTab = activateTab(initialIndex !== -1 ? initialIndex : 0);

      if (select) {
        select.addEventListener("change", (event) => {
          const selectedOption = select.options[select.selectedIndex];
          const targetId = selectedOption.dataset.target;
          const ind = targets.findIndex(target => target.id === targetId.slice(1));
          if (ind !== -1) {
            STATE.currentTab = deactivateTab(STATE.currentTab);
            STATE.currentTab = activateTab(ind);
          }
        }, { passive: true });
      }
    }
  });

  // Превью видео
  const video = document.querySelector(".portfolio-video__box");
  if(video) {
    video.addEventListener("click", function(event) {
      const YTid = this.dataset.id;
      this.classList.add("player");
      this.innerHTML = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${YTid}?autoplay=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    }, { passive: true });
  }

  // Swiper
  var portfolioSwiper = new Swiper(".portfolioSwiper", {
    slidesPerView: 1.2,
    spaceBetween: 0,
    centeredSlides: true,
    loop: true,
    // autoplay: {
    //   delay: 3000,
    //   disableOnInteraction: false,
    // },
    navigation: {
      nextEl: ".portfolio-gallery__prev",
      prevEl: ".portfolio-gallery__next",
    },
    breakpoints: {
      768: {
        slidesPerView: 3,
        centeredSlides: false,
      },
    }
  });

  // Popup

  function hidePopup(popup) {
    popup.addEventListener('click', function(e) {
      const target = e.target;
      if (
        target.classList.contains("popup__close") ||
        target.classList.contains("popup")
      ) {
        popup.style.transition = "opacity 0.4s";
        popup.style.opacity = "0";
        setTimeout(() => {
          popup.style.display = "none";
        }, 400);
      }
    });
  }

  function showPopup(popup) {
    popup.style.display = "flex";
    setTimeout(() => {
      popup.style.transition = "opacity 0.4s";
      popup.style.opacity = "1";
    }, 10);
  } 

  //popup
  let popup = document.querySelector('.popup')
  let popupBtns = document.querySelectorAll(".popup-btn");
  if(popup && popupBtns){
    hidePopup(popup);
    popupBtns.forEach( btn => {
      btn.addEventListener('click', () => {
        showPopup(popup);
      })
    })
  }

  window.addEventListener("resize", () => {
    sectionTop.forEach(addPadTop);
    if (window.innerWidth <= 980) {
      header.classList.remove('hidden');
    }
  });

  window.addEventListener('scroll', handleScroll);
});
