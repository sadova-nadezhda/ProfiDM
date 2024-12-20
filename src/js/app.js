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
    if (currentScroll <= 0) {
      header.classList.remove('hidden');
    } else {
      header.classList.add('hidden');
    }
    lastScrollTop = currentScroll;
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

  // Аккордеон
  document.querySelectorAll(".accordion-header").forEach((button) => {
    button.addEventListener("click", () => {
      const accordionContent = button.nextElementSibling;

      button.classList.toggle("active");

      if (button.classList.contains("active")) {
        accordionContent.style.maxHeight = accordionContent.scrollHeight + "px";
      } else {
        accordionContent.style.maxHeight = 0;
      }

      document.querySelectorAll(".accordion-header").forEach((otherButton) => {
        if (otherButton !== button) {
          otherButton.classList.remove("active");
          otherButton.nextElementSibling.style.maxHeight = 0;
        }
      });
    });
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

  var servicesSwiper2 = new Swiper(".servicesSwiper2", {
    direction: 'horizontal',
    initialSlide: 1,
    loop: true,
    reverseDirection: true,
    pagination: {
      el: ".services-inner__pagination",
      type: "fraction",
    },
    navigation: {
      nextEl: ".services-inner__next",
      prevEl: ".services-inner__prev",
    },
  });

  var servicesSwiper = new Swiper(".servicesSwiper", {
    direction: 'horizontal',
    loop: true,
    reverseDirection: true,
    pagination: {
      el: ".services-inner__pagination",
      type: "fraction",
    },
    navigation: {
      nextEl: ".services-inner__next",
      prevEl: ".services-inner__prev",
    },
  });

  var portfolioCards = new Swiper(".portfolioCards", {
    direction: "vertical",
    slidesPerView: 2,
    spaceBetween: 80,
    mousewheel: true,
    breakpoints: {
      768: {
        slidesPerView: 1.05,
        spaceBetween: 50,
      },
    }
  });

  var clientsCards = new Swiper(".clientsCards", {
    slidesPerView: 2,
    spaceBetween: 0,
    mousewheel: true,
    breakpoints: {
      768: {
        slidesPerView: 3,
        spaceBetween: 0,
      },
    }
  });

  let servicesCards;

  function initSwiper() {
    if (window.innerWidth > 768) {
      if (!servicesCards) {
        servicesCards = new Swiper(".servicesCards", {
          slidesPerView: 3,
          spaceBetween: 0,
          mousewheel: true,
        });
      }
    } else {
      if (servicesCards) {
        servicesCards.destroy(true, true); // Уничтожаем слайдер
        servicesCards = null;
      }
    }
  }

  initSwiper();


  var benefitsCards = new Swiper(".benefitsCards", {
    slidesPerView: 1,
    spaceBetween: 8,
    mousewheel: true,
    breakpoints: {
      768: {
        slidesPerView: 2,
        spaceBetween: 0,
      },
      981: {
        slidesPerView: 3,
        spaceBetween: 0,
      },
    }
  });

  // Popup hide/show

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

  // popup
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

  // file

  let file = document.querySelector('.file');
  if(file){
    file.addEventListener('change', ()=> {
      if(file.files[0]?.name) {
        document.querySelector('.file-done').style.display = 'block';
        document.querySelector('.file-done').innerHTML = file.files[0].name;
        document.querySelector('.file-empty').style.display = 'none';
      }
      else {
        document.querySelector('.file-done').style.display = 'none';
        document.querySelector('.file-empty').style.display = 'block';
      }
    });
  }

  window.addEventListener("resize", () => {
    initSwiper();
    sectionTop.forEach(addPadTop);
    if (window.innerWidth <= 980) {
      header.classList.remove('hidden');
    }
  });

  window.addEventListener('scroll', () => {
    handleScroll()
    let sectionAnim = document.querySelectorAll('.section-anim');
    sectionAnim.forEach( section => {
      let offsetTop = section?.getBoundingClientRect().top + window.scrollY;
      if (window.scrollY > offsetTop - 200) {
        section.classList.add('active');
      }
    })
  });
});
