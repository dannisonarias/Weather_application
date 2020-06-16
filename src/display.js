import weather from './apiController';


const display = () => {
  const kelvin = 273;
  let celsius;
  let fahrenheit;
  let temp;
  let city;
  const domElements = {
    location: document.querySelector('.location'),
    temperature: document.querySelector('.temperature'),
    conditions: document.querySelector('.conditions'),
    gif: document.querySelector('.gif'),
    submitButton: document.querySelector('.submitButton'),
    locationInput: document.querySelector('.location-input'),
    locationOutput: document.querySelector('.weather-output-wrapper'),
    loading: document.querySelector('.fa-spinner'),
    error: document.querySelector('.error'),
    radioc: document.querySelector('#celsius'),
    radiof: document.querySelector('#fahrenheit'),
    giphy: document.querySelector('img'),
    country: document.querySelector('.country'),
  };

  const getLocation = () => domElements.locationInput.value;

  const showLoading = () => {
    domElements.loading.classList.remove('hidden');
  };

  const hideWeather = () => {
    domElements.locationOutput.classList.add('hidden');
  };

  const stopLoading = () => {
    domElements.loading.classList.add('hidden');
  };

  const showWeather = () => {
    domElements.locationOutput.classList.remove('hidden');
  };

  const formatWeather = (val) => {
    const weatherObj = {
      weather: val.weather[0].description,
      description: val.weather[0].main,
      name: val.name,
      temp: val.main.temp,
      flike: val.main.feels_like,
      humidity: val.main.humidity,
      country: val.sys.country,
    };
    return weatherObj;
  };

  const getGiphy = async (word) => {
    let response = await fetch(`https://api.giphy.com/v1/gifs/search?q=${word}&limit=1&api_key=DydIn3gdelH5HdAWm7OiDfWcxF6osItx`, { mode: 'cors' });
    response = await response.json();
    return response;
  };

  const showGiphy = (word) => {
    const giphy = getGiphy(word);
    giphy.then((response) => {
      domElements.giphy.src = response.data[0].images.fixed_height_downsampled.url;
    });
  };

  const removeMarginGiphy = () => {
    domElements.giphy.classList.remove('mt-5');
  };

  const celOrFar = (val) => {
    if (val === 'C') {
      domElements.temperature.innerHTML = `Temperature: ${celsius} °`;
    } else {
      domElements.temperature.innerHTML = `Temperature: ${fahrenheit} °`;
    }
  };

  const addRadiosListener = () => {
    domElements.radioc.addEventListener('change', () => {
      if (domElements.radioc.checked) {
        celOrFar('C');
      } else {
        celOrFar('F');
      }
    });
  };

  const updateTemps = () => {
    celsius = Math.round(temp - kelvin);
    fahrenheit = Math.round(((temp - kelvin) * 9) / 5 + 32);
  };

  const updateDom = (weatherPromise) => {
    weatherPromise.then((val) => {
      domElements.error.classList.add('hidden');
      const weatherObj = formatWeather(val);
      temp = weatherObj.temp;
      updateTemps(temp);
      domElements.country.innerHTML = `Country: ${weatherObj.country}`;
      domElements.location.innerHTML = weatherObj.name;
      domElements.temperature.innerHTML = `Temperature: ${(celsius)}°`;
      domElements.conditions.innerHTML = `Conditions: ${weatherObj.weather}`;
      showGiphy(city);
      removeMarginGiphy();
      stopLoading();
      showWeather();
    }).catch(() => {
      hideWeather();
      domElements.error.classList.remove('hidden');
    });
  };

  const setChecked = () => {
    domElements.radioc.checked = true;
    domElements.radiof.checked = false;
  };

  const loader = () => {
    setChecked();
    addRadiosListener();
    showLoading();
    city = getLocation();
    const weatherPromise = weather.getWeather(city);
    updateDom(weatherPromise);
  };

  const setListeners = () => {
    showGiphy('weather');
    domElements.radiof.addEventListener('click', celOrFar, false);
    domElements.submitButton.addEventListener('click', loader, false);
  };

  return {
    showLoading, getLocation, updateDom, setListeners, domElements,
  };
};

const displayUI = display();

export default displayUI;