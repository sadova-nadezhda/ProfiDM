var header = document.querySelector("header");
let lastScrollTop = 0;
const sectionTop = document.querySelectorAll('.section-top');

// Функции
function addPadTop(section) {
  section.style.marginTop = `${header.offsetHeight}px`;
}

function headerScroll() {
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

  // preloader
  const layers = document.querySelectorAll(".logo-layer");

  // Таймлайн для анимации
  const tl = gsap.timeline({
    defaults: { ease: "power4.in" },
  });

  tl.fromTo(
    layers,
    {
      opacity: 0,
      rotation: -40,
      rotationX: 50, 
      rotationY: 90, 
      z: (i) => i * 150,
      y: 100,
      scale: 1.5, 
    },
    {
      duration: 4,
      opacity: 1,
      rotation: 0,
      rotationX: 0, 
      rotationY: 0,
      z: 0,
      y: 0,
      scale: 0.7,
      clearProps: "rotation, rotationX, rotationY, z, y",
    }
  );

  // Скрытие прелоудера после завершения анимации
  tl.add(() => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
      preloader.style.opacity = 0; 
    }
  }, "+=1"); 

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

  // AOS
  AOS.init({
    duration: 1200,
    offset: 0,
  });

  // Map Home
  document.querySelectorAll('.hero__map circle').forEach(circle => {
    const randomDuration = (Math.random() * 2 + 1).toFixed(2) + 's';
    const randomDelay = (Math.random() * 2).toFixed(2) + 's';
  
    circle.style.animationDuration = randomDuration;
    circle.style.animationDelay = randomDelay;
  });

  // portfolio
  function updatePortfolioHeight() {
    const portfolio = document.querySelector('.portfolio-height');
    const portfolioCardsBox = portfolio?.querySelector('.portfolio__cards');
  
    if (portfolio && portfolioCardsBox) {
      if (window.innerWidth > 767) {
        portfolio.style.height = `${portfolioCardsBox.offsetHeight + 340}px`;
      } else {
        portfolio.style.height = `${portfolioCardsBox.offsetHeight + 200}px`;
      }
    }
  }
  
  updatePortfolioHeight();

  // GSAP
  gsap.registerPlugin(ScrollTrigger);

  function initializeHorizontalScroll() {
    let horizontals = document.querySelectorAll('.horizontal');
    
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  
    if (window.innerWidth > 767) {
      horizontals.forEach(horizontal => {
        let parentElement = horizontal.parentElement;
        
        gsap.to(horizontal, {
          x: () => horizontal.scrollWidth * -1,
          xPercent: 100,
          scrollTrigger: {
            trigger: horizontal,
            start: 'center center',
            end: '+=2000px',
            pin: horizontal,
            scrub: true,
            invalidateOnRefresh: true,
            // onEnter: () => {
            //   parentElement.classList.add('active');
            // },
            // onLeave: () => {
            //   parentElement.classList.remove('active');
            // }
          }
        });
      });
    } else {
      horizontals.forEach(horizontal => {
        gsap.killTweensOf(horizontal); 
        gsap.set(horizontal, { clearProps: "all" }); 
      });
    }
  }

  initializeHorizontalScroll();

  // Swiper

  var portfolioSwiper = new Swiper(".portfolioSwiper", {
    slidesPerView: 1.2,
    spaceBetween: 0,
    centeredSlides: true,
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
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
    // autoplay: {
    //   delay: 3000,
    //   disableOnInteraction: false,
    // },
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
    // autoplay: {
    //   delay: 3000,
    //   disableOnInteraction: false,
    // },
    pagination: {
      el: ".services-inner__pagination",
      type: "fraction",
    },
    navigation: {
      nextEl: ".services-inner__next",
      prevEl: ".services-inner__prev",
    },
  });

  var benefitsCards = new Swiper(".benefitsCards", {
    slidesPerView: 1.2,
    spaceBetween: 8,
    speed: 500,
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    on: {
      init() {
        this.el.addEventListener('mouseenter', () => {
          this.autoplay.stop();
        });

        this.el.addEventListener('mouseleave', () => {
          this.autoplay.start();
        });
      }
    },
    breakpoints: {
      768: {
        slidesPerView: 'auto',
        spaceBetween: 0,
      },
    }
  });

  let servicesCards;
  function initSwiper() {
    if (window.innerWidth > 768) {
      if (!servicesCards) {
        servicesCards = new Swiper(".servicesCards", {
          slidesPerView: 'auto',
          spaceBetween: 0,
          speed: 500,
          loop: true,
          autoplay: {
            delay: 3000,
            disableOnInteraction: false,
          },
          on: {
            init() {
              this.el.addEventListener('mouseenter', () => {
                this.autoplay.stop();
              });

              this.el.addEventListener('mouseleave', () => {
                this.autoplay.start();
              });
            }
          },
        });
      }
    }
  }
  initSwiper();

  // Функция для подготовки разметки каждого слайдера
  const prepareSwiperMarkup = (sliderContainer) => {
    if (!sliderContainer.querySelector('.swiper-wrapper')) {
      const wrapper = document.createElement('div');
      wrapper.classList.add('swiper-wrapper');

      const cards = Array.from(sliderContainer.children);
      cards.forEach((card) => {
        card.classList.add('swiper-slide'); 
        wrapper.appendChild(card);
      });

      sliderContainer.appendChild(wrapper);
    }
  };

  // Функция для инициализации слайдера с учетом его дополнительных классов
  const initializeSwiper = (sliderContainer) => {
    const isClientsCards = sliderContainer.classList.contains('clients__cards');
    const slidesPerView = isClientsCards ? 2.2 : 1.2; 

    new Swiper(sliderContainer, {
      slidesPerView: slidesPerView,
      spaceBetween: 8, 
      speed: 500,
      loop: true,
      // autoplay: {
      //   delay: 3000,
      //   disableOnInteraction: false,
      // },
    });
  };

  // Основная функция для инициализации всех слайдеров
  const initMobSwipers = () => {
    const sliderContainers = document.querySelectorAll('.js-slider');

    sliderContainers.forEach((sliderContainer) => {
      prepareSwiperMarkup(sliderContainer);

      if (window.innerWidth <= 767) {
        initializeSwiper(sliderContainer);
      }
    });
  };

  initMobSwipers();

  // mask phone
  $.fn.setCursorPosition = function (pos) {
    if ($(this).get(0).setSelectionRange) {
      $(this).get(0).setSelectionRange(pos, pos);
    } else if ($(this).get(0).createTextRange) {
      var range = $(this).get(0).createTextRange();
      range.collapse(true);
      range.moveEnd("character", pos);
      range.moveStart("character", pos);
      range.select();
    }
  };
  $('input[type="tel"]')
    .click(function () {
      $(this).setCursorPosition(3);
    })
    .mask("+7 (999) 999 99 99");


  window.addEventListener("resize", () => {
    initSwiper();
    initMobSwipers();
    initializeHorizontalScroll();
    updatePortfolioHeight();
    sectionTop.forEach(addPadTop);
    if (window.innerWidth <= 980) {
      header.classList.remove('hidden');
    }
  });

  window.addEventListener('scroll', () => {
    headerScroll()
  });
});