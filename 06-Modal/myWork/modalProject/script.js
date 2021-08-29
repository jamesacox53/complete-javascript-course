'use strict';

// click on the modal to make sure overlay isn't triggered, click on the text of the modal.

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const showModalButtons = document.querySelectorAll(".show-modal");
const modalCrossExitButton = document.querySelector(".close-modal");

const mainMethod = function () {
    
    for (let i = 0; i < showModalButtons.length; i++) {
        showModalButtons[i].addEventListener('click', showModal);
    }

    modalCrossExitButton.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);

    document.addEventListener('keydown', keyPressed);
};

const showModal = function () {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
};

const closeModal = function () {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
};

const keyPressed = function (event) {
    if (event.key === 'Escape') {
        escapeKeyPressed(event);
    }
};

const escapeKeyPressed = function (event) {
    if (!modal.classList.contains("hidden")) {
        closeModal();
    }
};

mainMethod();