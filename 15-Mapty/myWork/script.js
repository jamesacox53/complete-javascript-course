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
    
    map.on('click', clickOnMap);
}

// Displaying a Map Marker

const createMarker = function (locationCoords, content, popUpOptions) {
    
    L.marker(locationCoords).addTo(map)
    .bindPopup(L.popup(popUpOptions)).setPopupContent(content).openPopup();
}

const clickOnMap = function (mapEvent) {
    
    form.classList.remove('hidden');
    inputDistance.focus();

    inputType.addEventListener('change', exerciseTypeChanges);
    
    form.addEventListener('submit', (event) => submitWorkout(event, mapEvent));
}

// Rendering Workout Input Form

const submitWorkout = function (event, mapEvent) {
    event.preventDefault();
    console.log(mapEvent);

    const latitude = mapEvent.latlng.lat;
    const longitude = mapEvent.latlng.lng;
    
    const locationCoords = [latitude, longitude];

    createRunningMarker(locationCoords);

    clearWorkoutFormFields();
}

const clearWorkoutFormFields = function () {

    inputDistance.value = '';
    inputDuration.value = '';
    inputCadence.value = '';
    inputElevation.value = '';
}

const exerciseTypeChanges = function (event) {
    
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
}

const createRunningMarker = (locationCoords) => createStandardMarker (locationCoords, 'Running', 'running-popup');

const createCyclingMarker = (locationCoords) => createStandardMarker (locationCoords, 'Cycling', 'cycling-popup');

const createStandardMarker = function (locationCoords, content, className) {
    
    const popUpOptions = {
        maxWidth: 250,
        minWidth: 100,
        autoClose: false,
        closeOnClick: false,
        className: className
    };

    createMarker(locationCoords, content, popUpOptions);
}

launchMapty();