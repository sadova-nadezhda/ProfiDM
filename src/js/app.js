const header = document.querySelector("header");
const sectionTop = document.querySelectorAll(".section-top");
let lastScrollTop = 0;

const initHeaderScroll = () => {
  const currentScroll = window.scrollY;
  if (window.innerWidth > 980) {
    header.classList.toggle("hidden", currentScroll > 0);
    lastScrollTop = currentScroll;
  } else {
    header.classList.remove("hidden");
  }
};

const addPadTop = (section) => {
  section.style.marginTop = `${header.offsetHeight}px`;
};

const toggleMenu = (link, menu) => {
  link.classList.toggle("active");
  menu.classList.toggle("open");
};

const closeMenu = (link, menu) => {
  link.classList.remove("active");
  menu.classList.remove("open");
};

const initTabs = (tabsContainer) => {
  const STATE = { currentTab: null };
  const targetsContainer = tabsContainer.querySelector(".targets");
  const triggers = [...tabsContainer.querySelectorAll(".trigger")];
  const select = tabsContainer.querySelector(".mobile-select");
  const targets = triggers.map(trigger => document.querySelector(trigger.dataset.target));

  const activateTab = (ind) => {
    if (ind == null) return ind;
    triggers[ind].classList.add("active");
    targets[ind].classList.add("active");
    targetsContainer.style.transform = `translateX(-${ind * 100}%)`;
    return ind;
  };

  const deactivateTab = (ind) => {
    if (ind == null) return ind;
    triggers[ind].classList.remove("active");
    targets[ind].classList.remove("active");
    return null;
  };

  triggers.forEach((trigger, ind) => {
    trigger.addEventListener("click", () => {
      STATE.currentTab = deactivateTab(STATE.currentTab);
      STATE.currentTab = activateTab(ind);
    });
  });

  const initialIndex = triggers.findIndex(trigger => trigger.getAttribute("href") === window.location.hash) || 0;
  STATE.currentTab = activateTab(initialIndex);

  if (select) {
    select.addEventListener("change", () => {
      const ind = [...select.options].findIndex(opt => opt.dataset.target === `#${targets[0].id}`);
      STATE.currentTab = deactivateTab(STATE.currentTab);
      STATE.currentTab = activateTab(ind);
    });
  }
};

const initAccordion = () => {
  document.querySelectorAll(".accordion-header").forEach((button) => {
    button.addEventListener("click", () => {
      const content = button.nextElementSibling;
      const isActive = button.classList.toggle("active");
      content.style.maxHeight = isActive ? `${content.scrollHeight}px` : "0";

      document.querySelectorAll(".accordion-header").forEach((otherButton) => {
        if (otherButton !== button) {
          otherButton.classList.remove("active");
          otherButton.nextElementSibling.style.maxHeight = "0";
        }
      });
    });
  });
};

const initVideoPreview = () => {
  const video = document.querySelector(".portfolio-video__box");
  if (!video) return;

  video.addEventListener("click", () => {
    const YTid = video.dataset.id;
    video.classList.add("player");
    video.innerHTML = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${YTid}?autoplay=1" frameborder="0" allowfullscreen></iframe>`;
  });
};

const initPopups = () => {
  const popup = document.querySelector(".popup");
  const popupBtns = document.querySelectorAll(".popup-btn");
  if (!popup || !popupBtns.length) return;

  const showPopup = () => {
    popup.style.display = "flex";
    setTimeout(() => popup.style.opacity = "1", 10);
  };

  const hidePopup = () => {
    popup.style.opacity = "0";
    setTimeout(() => popup.style.display = "none", 400);
  };

  popup.addEventListener("click", (e) => {
    if (e.target.classList.contains("popup") || e.target.classList.contains("popup__close")) hidePopup();
  });

  popupBtns.forEach(btn => btn.addEventListener("click", showPopup));
};

const initFileUpload = () => {
  const fileInput = document.querySelector(".file");
  const fileDone = document.querySelector(".file-done");
  const fileEmpty = document.querySelector(".file-empty");

  if (!fileInput || !fileDone || !fileEmpty) return;

  fileInput.addEventListener("change", () => {
    const fileName = fileInput.files[0]?.name;
    fileDone.style.display = fileName ? "block" : "none";
    fileEmpty.style.display = fileName ? "none" : "block";
    if (fileName) fileDone.textContent = fileName;
  });
};

const initMapAnimations = () => {
  document.querySelectorAll(".hero__map circle").forEach(circle => {
    circle.style.animationDuration = `${(Math.random() * 2 + 1).toFixed(2)}s`;
    circle.style.animationDelay = `${(Math.random() * 2).toFixed(2)}s`;
  });
};

window.addEventListener("load", () => {
  document.querySelectorAll(".tabs").forEach(initTabs);
  sectionTop.forEach(addPadTop);
  initAccordion();
  initVideoPreview();
  initPopups();
  initFileUpload();
  initMapAnimations();

  document.querySelector(".header__burger")?.addEventListener("click", () => {
    const menu = document.querySelector(".header__nav");
    const burger = document.querySelector(".header__burger");
    toggleMenu(burger, menu);
  });

  // AOS
  AOS.init({
    duration: 1200,
    offset: 0,
  });

  // Swiper
  var portfolioSwiper = new Swiper(".portfolioSwiper", {
    slidesPerView: 1.2,
    spaceBetween: 0,
    centeredSlides: true,
    loop: true,
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
  var clientsCards = new Swiper(".clientsCards", {
    slidesPerView: 2,
    spaceBetween: 0,
    speed: 1500,
    breakpoints: {
      768: {
        slidesPerView: 'auto',
        spaceBetween: 0,
      },
    }
  });
  var benefitsCards = new Swiper(".benefitsCards", {
    slidesPerView: 1,
    spaceBetween: 8,
    speed: 1500,
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
          slidesPerView: "auto",
          spaceBetween: 0,
          speed: 1500,
        });
      }
    } else {
      if (servicesCards) {
        servicesCards.destroy(true, true);
        servicesCards = null;
      }
    }
  }
  initSwiper();

  // portfolio
  const portfolio = document.querySelector('.portfolio-height');
  const portfolioCardsBox = portfolio?.querySelector('.portfolio__cards');
  if (portfolio && portfolioCardsBox) {
    if (window.innerWidth > 767) {
      portfolio.style.height = `${portfolioCardsBox.offsetHeight + 340}px`;
    } else {
      portfolio.style.height = `${portfolioCardsBox.offsetHeight + 200}px`;
    }
    
  }

  // GSAP
  gsap.registerPlugin(ScrollTrigger);

  let horizontalSections = document.querySelectorAll('.horizontal');
  
  horizontalSections.forEach(horizontalSection => {
    gsap.to(horizontalSection, {
      x: () => horizontalSection.scrollWidth * -1,
      xPercent: 100,
      scrollTrigger: {
        trigger: horizontalSection,
        start: 'center center',
        end: '+=2000px',
        pin: horizontalSection,
        scrub: 0.5,
        invalidateOnRefresh: true
      }
    });
  });

  window.addEventListener("scroll", ()=> {
    initHeaderScroll();
    let sectionAnim = document.querySelectorAll('.section-anim');
    sectionAnim.forEach( section => {
      let offsetTop = section?.getBoundingClientRect().top + window.scrollY;
      if (window.scrollY > offsetTop - 300) {
        section.classList.add('active');
      }
    })
  });

  window.addEventListener("resize", () => {
    initSwiper();
    sectionTop.forEach(addPadTop);
    if (window.innerWidth <= 980) {
      header.classList.remove('hidden');
    }
  });
  
});