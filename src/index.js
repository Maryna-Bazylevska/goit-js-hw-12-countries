import './sass/main.scss';
import refs from './js/refs.js';
import API from './js/fetchCountries';
import previewCountry from './templates/preview-country.hbs';
import countryItemTemplate from './templates/countryItemTemplate.hbs';
import debounce from 'lodash.debounce';
import '@pnotify/core/dist/BrightTheme.css';
import { info, error } from '@pnotify/core';
refs.search.addEventListener('input', debounce(onInput, 500));
function onInput(e) {
  const userCountry = e.target.value;
  refs.countriesList.innerHTML = '';
  API.fetchCountries(userCountry)
    .then(renderMarkup)
    .catch(error => {
      const myError = error({
        text: 'Nothing was found for your query!',
        delay: 250,
      }); 
    });
}
function renderMarkup(countries) {
  if (countries.length > 10) {
    error({
      text: 'Too many matches found. Please enter a more specific query!',
      delay: 250,
    });
  }
 
  if (countries.length > 1 && countries.length < 10) {
    refs.countriesList.innerHTML = previewCountry(countries);
  }
  if (countries.length === 1) {
    refs.countriesList.innerHTML = countryItemTemplate(...countries);
  }
}

