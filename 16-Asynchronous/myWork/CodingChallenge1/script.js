'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

// 1.

const whereAmI = function (lat, lng) {

    const url = `https://geocode.xyz/${lat},${lng}?geoit=json`;

    const promise = fetch(url);

    // 4.

    promise.then(_successRetrieveData).catch(_handleError);
}

// 2.

const _successRetrieveData = function (response) {

    _getData(response).then(data => _showLocation(data));
}

const _getData = function (response) {

    // 5.

    if (!response.ok) {
        throw new Error(`Error message: ${response}`);
    }

    return response.json();
}

const _handleError = function (error) {
    console.error(`Caught error ${error}`);
}

// 3.

const _showLocation = function (data) {

    const city = data.city;
    const country = data.country;

    console.log(`You are in ${city}, ${country}`);

    // 6.

    showCountryAndNeighboursDataForCountryNameViaPromise(country);

}

// Previous work

const showCountryDataForCountryNameViaPromise = function (country) {

    fetch(`https://restcountries.com/v3.1/name/${country}`).then(_successfullyGotCountryDataViaPromise);
}

// 7.

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

whereAmI(19.037, 72.873);