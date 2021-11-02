'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

// https://restcountries.com/v2/

// https://restcountries.com/v3.1/name/{name}

// Lecture: Our First AJAX Call: XMLHttpRequest

/*

const _dataArrivedForIndividual = function () {

    const data = _getCountryData(this);

    _displayCountryDataOnPage(data, 'individual');
}


const _createCountryCardHTML = function (countryDataObject, type) {


    let className;

    if (type === 'individual') {
        className = '';
    }

    if (type === 'neighbour') {
        className = 'neighbour';
    }

    const countryLanguages = countryDataObject.languages;
    const countryCurrencies = countryDataObject.currencies;

    const countryCardHTML = `<article class="country ${className}">
        <img class="country__img" src="${countryDataObject.flags.svg}" />
        <div class="country__data">
            <h3 class="country__name">${countryDataObject.name.common}</h3>
            <h4 class="country__region">${countryDataObject.region}</h4>
            <p class="country__row"><span>👫</span>${(+countryDataObject.population / 1000000).toFixed(1)}M people</p>
            <p class="country__row"><span>🗣️</span>${countryLanguages[Object.keys(countryLanguages)[0]]}</p>
    <p class="country__row"><span>💰</span>${(countryCurrencies[Object.keys(countryCurrencies)[0]]).name}</p>
        </div>
    </article> `

    return countryCardHTML;
}

const showCountryDataForCountryName = function (countryName) {

    const request = _createAndSendRequestCountryName(countryName);

    request.addEventListener('load', _dataArrivedForIndividual);
}

// Lecture: Welcome to Callback Hell

const showCountryAndNeighboursData = function (country) {

    const request = _createAndSendRequestCountryName(country);

    request.addEventListener('load', _dataArrivedForIndividualAndNeighbours);
}

const _getCountryData = function (response) {

    const data = JSON.parse(response.responseText)[0];
    return data;
}

const _displayCountryDataOnPage = function (data, type) {

    const countryCardHTML = _createCountryCardHTML(data, type);

    countriesContainer.insertAdjacentHTML('beforeend', countryCardHTML);

    countriesContainer.style.opacity = 1;
}

const _createAndSendRequestCountryName = function (country) {

    const request = new XMLHttpRequest();
    request.open('GET', `https://restcountries.com/v3.1/name/${country}`);

    request.send();

    return request;
}

const _dataArrivedForIndividualAndNeighbours = function () {

    const data = _getCountryData(this);

    _displayCountryAndNeighbourDataOnPage(data);
}

const _displayCountryAndNeighbourDataOnPage = function (data) {

    _displayCountryDataOnPage(data, 'individual');

    const neighbours = data.borders;

    neighbours.forEach((neighbour) => {
        _showCountryDataForNeighbour(neighbour);
    });
}

const _createAndSendRequestCountryCode = function (countryCode) {

    const request = new XMLHttpRequest();
    request.open('GET', `https://restcountries.com/v3.1/alpha/${countryCode}`);

    request.send();

    return request;
}

const _showCountryDataForNeighbour = function (countryCode) {

    const request = _createAndSendRequestCountryCode(countryCode);

    request.addEventListener('load', _dataArrivedForIndividualNeighbour);
}

const _dataArrivedForIndividualNeighbour = function () {

    const data = _getCountryData(this);

    _displayCountryDataOnPage(data, 'neighbour');
}

*/

// Lecture: Consuming Promises

// const showCountryDataForCountryNameViaPromise = function (country) {

//     fetch(`https://restcountries.com/v3.1/name/${country}`).then(_successfullyGotCountryDataViaPromise);
// }

const _successfullyGotCountryDataViaPromise = function (response) {

    response.json().then(function (data) {
        _displayCountryDataOnPage(data[0], 'individual');
    }).catch(_catchError);
}

const _createCountryCardHTML = function (countryDataObject, type) {

    let className;

    if (type === 'individual') {
        className = '';
    }

    if (type === 'neighbour') {
        className = 'neighbour';
    }

    const countryLanguages = countryDataObject.languages;
    const countryCurrencies = countryDataObject.currencies;

    const countryCardHTML = `<article class="country ${className}">
        <img class="country__img" src="${countryDataObject.flags.svg}" />
        <div class="country__data">
            <h3 class="country__name">${countryDataObject.name.common}</h3>
            <h4 class="country__region">${countryDataObject.region}</h4>
            <p class="country__row"><span>👫</span>${(+countryDataObject.population / 1000000).toFixed(1)}M people</p>
            <p class="country__row"><span>🗣️</span>${countryLanguages[Object.keys(countryLanguages)[0]]}</p>
    <p class="country__row"><span>💰</span>${(countryCurrencies[Object.keys(countryCurrencies)[0]]).name}</p>
        </div>
    </article> `

    return countryCardHTML;
}

const _displayCountryDataOnPage = function (data, type) {

    const countryCardHTML = _createCountryCardHTML(data, type);

    countriesContainer.insertAdjacentHTML('beforeend', countryCardHTML);

    countriesContainer.style.opacity = 1;
}

const showCountryAndNeighboursDataForCountryNameViaPromise = function (country) {

    const url = `https://restcountries.com/v3.1/name/${country}`;

    return _getJSON(url, _successfullyGotCountryDataViaPromiseForNeighbour);
}

const _successfullyGotCountryDataViaPromiseForNeighbour = function (responseJSON) {

    responseJSON.then(function (dataArr) {

        const data = dataArr[0];
        _displayCountryDataOnPage(data, 'individual');

        const neighbours = data.borders;

        if (!neighbours) return;

        let neighbourPromises = _showNeighboursDataForCountryNameViaPromise(neighbours[0]);

        for (let i = 1; i < neighbours.length; i++) {
            neighbourPromises = neighbourPromises.then(() => _showNeighboursDataForCountryNameViaPromise(neighbours[i]));
        }
    }).catch(_catchError);
}

const _showNeighboursDataForCountryNameViaPromise = function (neighbourCode) {

    const url = `https://restcountries.com/v3.1/alpha/${neighbourCode}`;

    return _getJSON(url, _successfullyGotNeighbourCountryDataViaPromise);
}

const _successfullyGotNeighbourCountryDataViaPromise = function (responseJSON) {

    return responseJSON.then(function (data) {
        _displayCountryDataOnPage(data[0], 'neighbour');
    }).catch(_catchError);
}

// Lecture: Handling Rejected Promises

const _catchError = function (err) {
    console.error(`${err}`);

    renderError(`Something went wrong. ${err.message}. Try again!`);
}

const renderError = function (message) {

    countriesContainer.insertAdjacentText('beforeend', message);
    countriesContainer.style.opacity = 1;
}

// Lecture: Throwing Errors Manually

const _getJSON = function (url, callback) {

    return fetch(url).then((response) => {
        if (!response.ok) {
            throw new Error(`Country not found. ${response.status}`)
        }
        return callback(response.json());
    }).catch(_catchError);
}

// Lecture: Consuming Promises with Async/Await

const showCountryDataForCountryNameViaAsync = async function (country) {

    const response = await fetch(`https://restcountries.com/v3.1/name/${country}`)


    _successfullyGotCountryDataViaPromise(response);
}

btn.addEventListener('click', function () {
    showCountryDataForCountryNameViaAsync('uk');
});