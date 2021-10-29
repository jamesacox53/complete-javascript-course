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
    mapZoomLevel = 13;
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

            containerWorkouts.addEventListener('click', this._moveToMarker.bind(this));
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

        this.map = L.map('map').setView(initialLocationCoords, this.mapZoomLevel);

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

        this._renderWorkout(workout);

        this._createWorkoutMarker(workout);

        this._hideWorkoutForm();

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

    _createWorkoutMarker(workout) {

        let workoutContent = '';

        if (workout.type === 'running') {
            workoutContent += '🏃‍♂️ ';
        }

        if (workout.type === 'cycling') {
            workoutContent += '🚴‍♀️ ';
        }

        workoutContent += workout.description;

        const popUpOptions = {
            maxWidth: 250,
            minWidth: 100,
            autoClose: false,
            closeOnClick: false,
            className: `${workout.type}-popup`
        };

        this._createMarker(workout.locationCoords, workoutContent, popUpOptions);
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

    // Rendering Workouts

    _renderWorkout(workout) {

        const workoutHTML = this._getWorkoutHTML(workout);

        form.insertAdjacentHTML('afterend', workoutHTML);
    }

    _getWorkoutHTML(workout) {

        let workoutHTML;

        if (workout.type === 'running') {
            workoutHTML = this._getRunningWorkoutHTML(workout);
        }

        if (workout.type === 'cycling') {
            workoutHTML = this._getCyclingWorkoutHTML(workout);
        }

        return workoutHTML;
    }

    _getRunningWorkoutHTML(workout) {
        let workoutHTML = this._getCommonWorkoutHTML(workout, '🏃‍♂️');

        workoutHTML += `
        <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.pace.toFixed(1)}</span>
            <span class="workout__unit">min/km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">🦶🏼</span>
            <span class="workout__value">${workout.cadence}</span>
            <span class="workout__unit">spm</span>
          </div>
        </li>`;

        return workoutHTML;
    }

    _getCyclingWorkoutHTML(workout) {
        let workoutHTML = this._getCommonWorkoutHTML(workout, '🚴‍♀️');

        workoutHTML += `
        <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.speed.toFixed(1)}</span>
            <span class="workout__unit">km/h</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⛰</span>
            <span class="workout__value">${workout.elevationGain}</span>
            <span class="workout__unit">m</span>
          </div>
        </li>`;

        return workoutHTML;
    }

    _getCommonWorkoutHTML(workout, emoji) {

        return `<li class="workout workout--${workout.type}" data-id="${workout.id}" >
        <h2 class="workout__title">${workout.description}</h2>
        <div class="workout__details">
            <span class="workout__icon">${emoji}</span>
            <span class="workout__value">${workout.distance}</span>
            <span class="workout__unit">km</span>
        </div>
        <div class="workout__details">
            <span class="workout__icon">⏱</span>
            <span class="workout__value">${workout.duration}</span>
            <span class="workout__unit">min</span>
        </div>`
    }

    _hideWorkoutForm() {

        this._clearWorkoutFormFields();

        inputDistance.blur();
        inputDuration.blur();
        inputCadence.blur();
        inputElevation.blur();

        form.style.display = 'none';
        form.classList.add('hidden');
        setTimeout(() => form.style.display = 'grid', 1000);

    }

    // Move to Marker on Click

    _moveToMarker(event) {
        const workoutElement = event.target.closest('.workout');

        if (!workoutElement) return;

        const selectedWorkout = this.workouts.find(workout => workout.id === workoutElement.dataset.id);

        const mapOptions = {
            animate: true,
            pan: {
                duration: 1
            }
        }

        this.map.setView(selectedWorkout.locationCoords, this.mapZoomLevel, mapOptions);
    }
}

// Managing Workout Data: Creating Classes

class Workout {

    type;
    id;
    description;
    date;
    locationCoords;
    distance;
    duration;

    constructor(locationCoords, distance, duration, type) {

        this.type = type;
        this.date = new Date();
        this.id = (Date.now() + '').slice(-10);
        this.locationCoords = locationCoords;
        this.distance = distance; // in km
        this.duration = duration; // in min
        this._setDescription(this.type, this.date);
    }

    _setDescription(type, date) {
        this.description = this._getDescription(type, date);
    }

    _getDescription(type, date) {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return `${type[0].toUpperCase() + type.slice(1)} on ${months[date.getMonth()]} ${date.getDate()} `;
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