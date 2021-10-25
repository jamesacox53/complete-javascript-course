'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

// Using the Geolocation API

const successGettingUserPosition = function (position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const googleMapsLocation = `https://www.google.com/maps/@${latitude},${longitude},14z`;
}

const failureGettingUserPosition = function (position) {
    alert('Could not get your position.')
}

const launchMapty = function () {

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(successGettingUserPosition, failureGettingUserPosition);
    }
}

launchMapty();