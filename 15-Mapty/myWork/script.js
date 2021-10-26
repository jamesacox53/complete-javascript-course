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


// Refactoring for Project Architecture

class App {

    map;

    constructor() {
        this._launchMapty();
    }

    // Using the Geolocation API

    _launchMapty() {

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this._successGettingUserPosition.bind(this), this._failureGettingUserPosition.bind(this));
        }
    }

    _successGettingUserPosition(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        const locationCoords = [latitude, longitude];

        this._initializeMap(locationCoords);
    }

    _failureGettingUserPosition() {
        this._initializeMap();
    }

    // Displaying a Map Using Leaflet Library

    _initializeMap(initialLocationCoords = [51.505, -0.09]) {

        this.map = L.map('map').setView(initialLocationCoords, 13);

        L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);

        this.map.on('click', this._clickOnMap.bind(this));
    }

    // Displaying a Map Marker

    _createMarker(locationCoords, content, popUpOptions) {

        L.marker(locationCoords).addTo(this.map)
            .bindPopup(L.popup(popUpOptions)).setPopupContent(content).openPopup();
    }

    _clickOnMap(mapEvent) {

        form.classList.remove('hidden');
        inputDistance.focus();

        inputType.addEventListener('change', this._exerciseTypeChanges.bind(this));

        form.addEventListener('submit', (function (eventElem) {
            this._submitWorkout(eventElem, mapEvent);
        }).bind(this));
    }

    // Rendering Workout Input Form

    _submitWorkout(eventElem, mapEvent) {
        eventElem.preventDefault();

        const latitude = mapEvent.latlng.lat;
        const longitude = mapEvent.latlng.lng;

        const locationCoords = [latitude, longitude];

        this._createRunningMarker(locationCoords);

        this._clearWorkoutFormFields();
    }

    _clearWorkoutFormFields() {

        inputDistance.value = '';
        inputDuration.value = '';
        inputCadence.value = '';
        inputElevation.value = '';
    }

    _exerciseTypeChanges(eventElem) {

        inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
        inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
    }

    _createRunningMarker(locationCoords) {
        this._createStandardMarker(locationCoords, 'Running', 'running-popup');
    }

    _createCyclingMarker(locationCoords) {
        this._createStandardMarker(locationCoords, 'Cycling', 'cycling-popup');
    }

    _createStandardMarker(locationCoords, content, className) {

        const popUpOptions = {
            maxWidth: 250,
            minWidth: 100,
            autoClose: false,
            closeOnClick: false,
            className: className
        };

        this._createMarker(locationCoords, content, popUpOptions);
    }
}

const maptyApp = new App();