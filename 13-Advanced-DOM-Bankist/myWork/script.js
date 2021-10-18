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