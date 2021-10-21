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