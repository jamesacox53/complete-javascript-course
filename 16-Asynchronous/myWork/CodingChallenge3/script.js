'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

const imgContainer = document.querySelector('.images');

const createImage = function (imgPath) {

    return new Promise(function (resolve, reject) {
        const img = document.createElement('img');
        img.src = imgPath;


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

let currentImage;

const _handleImage = function (image) {

    currentImage = image;

    return wait(2);
}

const _hideImage = function () {

    currentImage.style.display = 'none';

    return wait(2);
}

const processImage = function (imgPath) {
    return createImage(imgPath).then(_handleImage).then(_hideImage);
}

// PART 1

const loadNPause = async function () {

    try {
        let image = await createImage('img/img-1.jpg');

        await wait(2);
        image.style.display = 'none';

        await wait(2);

        image = await processImage('img/img-2.jpg');

        await wait(2);
        image.style.display = 'none';

    } catch (error) {
        console.error(error);
    }

}

// processImage('img/img-1.jpg').then(() => processImage('img/img-2.jpg')).catch(_handleError);

// loadNPause();

// PART 2

// 1.

const loadAll = async function (imagePathArray) {

    try {

        // 2.

        const imagePromises = imagePathArray.map(async imagePath => await createImage(imagePath));

        // 3.

        console.log(imagePromises);

        // 4.

        const images = await Promise.all(imagePromises);

        // 5.

        images.forEach(image => image.classList.add('parallel'));

    } catch (error) {
        console.error(error);
    }
}

const imagePathArray = ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg'];

loadAll(imagePathArray);