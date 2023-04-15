const SOURCE_URL = 'https://restcountries.com/v3.1/name';

function fetchCountries(name) {
  fetch(
    `${SOURCE_URL}/${name}?fields=name,capital,population,flags,languages`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

export { fetchCountries };
