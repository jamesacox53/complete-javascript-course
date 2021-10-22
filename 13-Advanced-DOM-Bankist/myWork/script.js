'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (event) {
  event.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// PROJECT: "Bankist" Website

btnsOpenModal.forEach(button => button.addEventListener('click', openModal));

// Implementing Smooth Scrolling

const btnScrollTo = document.querySelector('.btn--scroll-to');

const section1 = document.querySelector('#section--1');

const scrollToSection1 = function (event) {

  const s1Coords = section1.getBoundingClientRect();

  window.scrollTo({
    left: s1Coords.left + window.pageXOffset, 
    top: s1Coords.top + window.pageYOffset,
    behavior: 'smooth'
  });
}

btnScrollTo.addEventListener('click', scrollToSection1);

// Event Delegation: Implementing Page Navigation

const clickNavLinks = function(event) {
  event.preventDefault();
  
  if (event.target.classList.contains('nav__link')) {
    
    const id = event.target.getAttribute('href');
    
    document.querySelector(id).scrollIntoView({behavior: 'smooth'});
  }
}

document.querySelector('.nav__links').addEventListener('click', clickNavLinks);

// Building a Tabbed Component

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

const tabClicked = function(event) {

  const clicked = event.target.closest('.operations__tab');

  if(!clicked) return;

  makeAllTabsInactive();

  clicked.classList.add('operations__tab--active');

  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');

}

const makeAllTabsInactive = function () {

  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  tabsContent.forEach(content => content.classList.remove('operations__content--active'));

}

tabsContainer.addEventListener('click', tabClicked);


// Passing Arguments to Event Handlers

const nav = document.querySelector('.nav');

const mouseOverNavBar = (event) => mouseEventNavBar(event, dimAllOtherNavBarElements);

const dimAllOtherNavBarElements = (link) => changeOpacityNavBarElements(0.5, link);

const mouseOutNavBar = (event) => mouseEventNavBar(event, unDimAllOtherNavBarElements);

const unDimAllOtherNavBarElements = (link) => changeOpacityNavBarElements(1, link);

const mouseEventNavBar = function (event, mouseEventFunction) {
  const link = event.target.closest('.nav__link');

  if(!link) return;
  
  mouseEventFunction(link);
}

const changeOpacityNavBarElements = function (opacity, link) {
  
  const links = nav.querySelectorAll('.nav__link');

  const logo = nav.querySelector('img');

  links.forEach(element => {

    if (element !== link) {
      element.style.opacity = opacity;
    }
  });

  logo.style.opacity = opacity;
}

nav.addEventListener('mouseover', mouseOverNavBar);

nav.addEventListener('mouseout', mouseOutNavBar);

// A Better Way: The Intersection Observer API

const header = document.querySelector('.header');

const stickyNav = function (entries) {

  for (const entry of entries) {

    if (!entry.isIntersecting) {
      nav.classList.add('sticky');
    } else {
      nav.classList.remove('sticky');
    }
  }
}

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${nav.getBoundingClientRect().height}px`
});

headerObserver.observe(header);

// Revealing Elements on Scroll

const allSections = document.querySelectorAll('.section');

const hideAllSections = function () {
  
  for (const section of allSections) {
    section.classList.add('section--hidden');
  }
}

const revealSection = function(entries, observer) {
  const entry = entries[0];

  if (!entry.isIntersecting) return;
  
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
}

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15
});

const revealElementsOnScroll = function () {
  
  hideAllSections();

  allSections.forEach(function(section) {
    sectionObserver.observe(section);
  });
}

revealElementsOnScroll();

// Lazy Loading Images

const imgTargets = document.querySelectorAll('img[data-src]');

const loadImage = function (entries, observer) {
  const entry = entries[0];

  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', () => entry.target.classList.remove('lazy-img'));

  observer.unobserve(entry.target);
}

const imageObserver = new IntersectionObserver(loadImage, {
  root: null,
  threshold: 0,
  rootMargin: '200px'
});

const lazyLoadImages = function () {

  imgTargets.forEach((image) => imageObserver.observe(image));
}

lazyLoadImages();

// Building a Slider Component: Part 1

const slides = document.querySelectorAll('.slide');
let sliderPosition = 0;

const buttonLeft = document.querySelector('.slider__btn--left');
const buttonRight = document.querySelector('.slider__btn--right');

const goToSlide = function (sliderPosition) {
  
  slides.forEach((slide, index) => slide.style.transform = `translateX(${100 * (index - sliderPosition)}%)`);

  const dots = document.querySelectorAll('.dots__dot');

  dots.forEach((dot) => {
    
    if(dot.dataset.slide == sliderPosition) {
      
      dot.classList.add('dots__dot--active');
    
    } else {

      dot.classList.remove('dots__dot--active');
    }
  });
}

const putSlidesSideBySide = () => goToSlide(0);

const moveRightSlide = function () {
  
  sliderPosition = (sliderPosition + 1) % slides.length;

  goToSlide(sliderPosition);
}

const moveLeftSlide = function () {
  
  if (sliderPosition <= 0) {

    sliderPosition = slides.length - 1;
  
  } else {
  
    sliderPosition--;
  }
  
  goToSlide(sliderPosition);
}

const slider = function () {

  createDots();
  putSlidesSideBySide();

  buttonRight.addEventListener('click', moveRightSlide);
  buttonLeft.addEventListener('click', moveLeftSlide);

  dotContainer.addEventListener('click', sliderButtonClicked);

  observeSlider();
}

// Building a Slider Component: Part 2

const sliderElement = document.querySelector('.slider');

const arrowKeyPressed = function (event) {

  if (event.key === 'ArrowLeft') moveLeftSlide();
  if (event.key === 'ArrowRight') moveRightSlide();
}

const arrowKeyEventListener = function (entries) {
  const entry = entries[0];

  if (entry.isIntersecting) {

    document.addEventListener('keydown', arrowKeyPressed);

  } else {

    document.removeEventListener('keydown', arrowKeyPressed);
  }
}

const sliderObserver = new IntersectionObserver(arrowKeyEventListener, {
  root: null,
  threshold: 0
});

const observeSlider = () => sliderObserver.observe(sliderElement);

const dotContainer = document.querySelector('.dots');

const createDots = function () {
  
  for(let i = 0; i < slides.length; i++) {

    const buttonHtml = 
    `<button class="dots__dot" data-slide="${i}"></button>`;

    dotContainer.insertAdjacentHTML('beforeend', buttonHtml);
  }
}

const sliderButtonClicked = function (event) {
  
  if (!event.target.classList.contains("dots__dot")) return;

  const slide = event.target.dataset.slide;

  goToSlide(slide);
}

slider();