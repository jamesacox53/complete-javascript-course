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

const launchMapty = function () {

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(successGettingUserPosition, failureGettingUserPosition);
    }
}

const successGettingUserPosition = function (position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    
    const locationCoords = [latitude, longitude];

    initializeMap(locationCoords);
}

const failureGettingUserPosition = function () {
    initializeMap();
}

// Displaying a Map Using Leaflet Library

let map;

const initializeMap = function (initialLocationCoords=[51.505, -0.09]) {

    map = L.map('map').setView(initialLocationCoords, 13);

    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    createMarker(initialLocationCoords);

    map.on('click', clickOnMap);
}

// Displaying a Map Marker

const createMarker = function (locationCoords) {
    
    const popUpOptions = {
        maxWidth: 250,
        minWidth: 100,
        autoClose: false,
        closeOnClick: false,
        className: 'running-popup'
    };

    L.marker(locationCoords).addTo(map)
    .bindPopup(L.popup(popUpOptions)).setPopupContent('Workout').openPopup();
}

const clickOnMap = function (mapEvent) {
    
    const latitude = mapEvent.latlng.lat;
    const longitude = mapEvent.latlng.lng;
    
    const locationCoords = [latitude, longitude];

    createMarker(locationCoords);
}

launchMapty();