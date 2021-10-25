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
    
    const locationCoords = [latitude, longitude];

    getLocationOnMap(locationCoords);
}

const failureGettingUserPosition = function () {
    getLocationOnMap();
}

// Displaying a Map Using Leaflet Library

const getLocationOnMap = function (locationCoords=[51.505, -0.09]) {

    var map = L.map('map').setView(locationCoords, 13);

    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

L.marker(locationCoords).addTo(map)
    .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
    .openPopup();
}

const launchMapty = function () {

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(successGettingUserPosition, failureGettingUserPosition);
    }
}

launchMapty();