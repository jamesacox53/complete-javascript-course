'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

// 1.

const imgContainer = document.querySelector('.images');

const createImage = function (imgPath) {

    return new Promise(function (resolve, reject) {
        const img = document.createElement('img');
        img.src = imgPath;

        // 2.

        img.addEventListener('load', function () {
            imgContainer.append(img);
            resolve(img);
        });

        img.addEventListener('error', function () {
            reject(new Error('Image was not found.'));
        });
    });
}

const _handleError = function (error) {

    console.error(error);
}

const wait = function (seconds) {

    return new Promise(function (resolve) {
        setTimeout(resolve, seconds * 1000);
    });
}

// 5. & 7.

let currentImage;

const _handleImage = function (image) {

    currentImage = image;

    return wait(2);
}

// 6.

const _hideImage = function () {

    currentImage.style.display = 'none';

    // 8.

    return wait(2);
}

const processImage = function (imgPath) {
    return createImage(imgPath).then(_handleImage).then(_hideImage);
}

// 4.

processImage('img/img-1.jpg').then(() => processImage('img/img-2.jpg')).catch(_handleError);
