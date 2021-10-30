'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

// https://restcountries.com/v2/

// https://restcountries.com/v3.1/name/{name}

// Our First AJAX Call: XMLHttpRequest

const dataArrived = function () {

    const data = JSON.parse(this.responseText)[0];

    const countryCardHTML = createCountryCardHTML(data);

    countriesContainer.insertAdjacentHTML('beforeend', countryCardHTML);

    countriesContainer.style.opacity = 1;
}

const createCountryCardHTML = function (countryDataObject) {

    const countryLanguages = countryDataObject.languages;
    const countryCurrencies = countryDataObject.currencies;

    const countryCardHTML = `<article class="country"W>
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

const showCountryData = function (country) {

    const request = new XMLHttpRequest();
    request.open('GET', `https://restcountries.com/v3.1/name/${country}`);

    request.send();

    request.addEventListener('load', dataArrived);
}

showCountryData('usa');
showCountryData('portugal');
showCountryData('uk');