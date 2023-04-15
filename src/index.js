import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('input#search-box');
const listEl = document.querySelector('.country-list');
const infoEl = document.querySelector('.country-info');

inputEl.addEventListener('input', debounce(countrySearch, DEBOUNCE_DELAY));

function countrySearch(event) {
  const inputContent = event.target.value.trim();
  if (inputContent === '') {
    listEl.innerHTML = '';
    infoEl.innerHTML = '';
    return;
  } else {
    return fetchCountries(inputContent)
      .then(countries => createCountries(countries))
      .catch(error => {
        console.log(error);
        Notify.failure('Oops, there is no country with that name');
      });
  }
}

function createCountries(countries) {
  if (countries.length > 10) {
    listEl.innerHTML = '';
    infoEl.innerHTML = '';
    return Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  }
  if (countries.length > 1) {
    const markup = countries
      .map(({ name, flags }) => {
        return `<li><img src ="${flags.svg}" width = "50" /> ${name.official}</li>`;
      })
      .join('');

    listEl.innerHTML = markup;
    infoEl.innerHTML = '';
  }

  if (countries.length === 1) {
    const makrupObj = countries
      .map(({ name, flags, capital, population, languages }) => {
        return `<li> <img src ="${flags.svg}" width = "70" /> ${
          name.official
        } </li>
        <p> Capital: <span> ${capital} </span> </p>
        <p> Population: <span> ${population} </span> </p>
        <p> Languages: <span> ${Object.values(languages)} </span> </p>
        `;
      })
      .join('');
    listEl.innerHTML = '';
    infoEl.innerHTML = makrupObj;
  }
}
