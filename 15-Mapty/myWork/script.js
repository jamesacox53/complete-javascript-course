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

    workouts = [];
    map;
    mapEvent;

    constructor() {
        this._launchMapty();
    }

    // Using the Geolocation API

    _launchMapty() {

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this._successGettingUserPosition.bind(this), this._failureGettingUserPosition.bind(this));

            form.addEventListener('submit', (eventElem) => eventElem.preventDefault());
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

    _clickOnMap(mapE) {

        let returning = false;

        if (this._alreadyClickedMapWithoutSubmitting()) returning = true;

        this.mapEvent = mapE;
        form.classList.remove('hidden');
        inputDistance.focus();

        if (returning) return;

        const exerciseTypeChanges = this._exerciseTypeChanges.bind(this);

        inputType.addEventListener('change', exerciseTypeChanges);

        const submitWorkout = function (eventElem) {

            if (this._submitWorkout(eventElem)) {
                form.removeEventListener('submit', submitWorkout);
                inputType.removeEventListener('change', exerciseTypeChanges);
                this.mapEvent = undefined;
            }
        }.bind(this);

        form.addEventListener('submit', submitWorkout);
    }

    // Rendering Workout Input Form

    _submitWorkout(eventElem) {
        eventElem.preventDefault();

        // Get Data from form
        const workoutData = this._getDataFromWorkoutForm();

        // Check if data is valid
        if (!workoutData) return false;

        const locationCoords = this._getLocationCoordsFromMapEvent(this.mapEvent);

        const workout = this._createWorkout(locationCoords, workoutData);

        this.workouts.push(workout);

        this._createWorkoutMarker(workout);

        this._clearWorkoutFormFields();

        return true;
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

    // Creating a New Workout

    _getDataFromWorkoutForm() {

        const workout = {};
        workout.type = inputType.value;

        workout.distance = +inputDistance.value;

        if (!this._checkDataElementIsCorrect('Distance', workout.distance)) return null;

        workout.duration = +inputDuration.value;

        if (!this._checkDataElementIsCorrect('Duration', workout.duration)) return null;

        if (workout.type === 'running') {
            workout.cadence = +inputCadence.value;
            if (!this._checkDataElementIsCorrect('Cadence', workout.cadence)) return null;
        }

        if (workout.type === 'cycling') {
            workout.elevationGain = +inputElevation.value;
            if (!this._checkElevationGainElementIsCorrect(workout.elevationGain)) return null;
        }

        return workout;
    }

    _checkDataElementIsCorrect(fieldName, element) {

        if (!Number.isFinite(element)) {
            alert(`${fieldName} has to be a number.`);
            return false;
        }

        if (element <= 0) {
            alert(`${fieldName} has to be a positive number.`);
            return false;
        }

        return true;
    }

    _checkElevationGainElementIsCorrect(elevationGain) {

        if (!Number.isFinite(elevationGain)) {
            alert(`Elevation Gain has to be a number.`);
            return false;
        }

        return true;
    }

    _alreadyClickedMapWithoutSubmitting() {

        return this.mapEvent;
    }

    _createWorkout(locationCoords, workoutInput) {

        let workoutRet;
        if (workoutInput.type === 'running') {
            workoutRet = new Running(locationCoords, workoutInput.distance, workoutInput.duration, workoutInput.cadence);
        }

        if (workoutInput.type === 'cycling') {
            workoutRet = new Cycling(locationCoords, workoutInput.distance, workoutInput.duration, workoutInput.elevationGain);
        }

        return workoutRet;
    }

    _getLocationCoordsFromMapEvent(mapEvent) {

        const latitude = mapEvent.latlng.lat;
        const longitude = mapEvent.latlng.lng;

        return [latitude, longitude];
    }

    _createWorkoutMarker(workout) {

        if (workout.type === 'running') {
            this._createRunningMarker(workout.locationCoords);
        }

        if (workout.type === 'cycling') {
            this._createCyclingMarker(workout.locationCoords);
        }
    }
}

// Managing Workout Data: Creating Classes

class Workout {

    type;
    id;
    date;
    locationCoords;
    distance;
    duration;

    constructor(locationCoords, distance, duration, type) {

        this.type = type;
        this.date = Date.now();
        this.id = this.date.toString().slice(-10);
        this.locationCoords = locationCoords;
        this.distance = distance; // in km
        this.duration = duration; // in min
    }

}

class Running extends Workout {

    cadence;
    pace;

    constructor(locationCoords, distance, duration, cadence) {

        super(locationCoords, distance, duration, 'running');
        this.cadence = cadence;

        this._calculatePace();
    }

    _calculatePace() {
        this.pace = this.duration / this.distance;
    }
}


class Cycling extends Workout {

    elevationGain;
    speed;

    constructor(locationCoords, distance, duration, elevationGain) {

        super(locationCoords, distance, duration, 'cycling');
        this.elevationGain = elevationGain;

        this._calculateSpeed();
    }

    _calculateSpeed() {
        this.speed = this.distance / (this.duration / 60);
    }
}

const maptyApp = new App();