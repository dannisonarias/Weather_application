import weather from './apiController';

let unit;

const display = () => {
  const kelvin = 273;

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
    radios: document.getElementsByName('unit'),
    giphy: document.querySelector('img'),
  };

  const getLocation = () => domElements.locationInput.value;

  const showLoading = () => {
    domElements.loading.classList.remove('hidden');
  };

  const getRadio = () => {
    for (let i = 0, { length } = domElements.radios; i < length; i += 1) {
      if (domElements.radios[i].checked) {
        unit = domElements.radios[i].value;
        break;
      }
    }
  };

  const setListeners = () => {
    domElements.submitButton.addEventListener('click', weather.loader, false);
  };

  const kelvinToCelsius = (temp) => {
    temp = Math.round(temp - kelvin);
    if (unit === '1') {
      return temp;
    }
    const cToFahr = (temp * 9) / 5 + 32;
    return cToFahr;
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
      temp: kelvinToCelsius(val.main.temp),
      flike: val.main.feels_like,
      humidity: val.main.humidity,
      country: val.sys.country,
    };
    return weatherObj;
  };

  const getGiphy = async () => {
    let response = await fetch(`https://api.giphy.com/v1/gifs/search?q=${getLocation()}&limit=1&api_key=DydIn3gdelH5HdAWm7OiDfWcxF6osItx`, { mode: 'cors' });
    response = await response.json();
    return response;
  };

  const showGiphy = () => {
    const giphy = getGiphy();
    giphy.then((response) => {
      console.log(response)
      domElements.giphy.src = response.data[0].images.fixed_height_downsampled.url;
    });
  };

  const updateDom = (weatherPromise) => {
    weatherPromise.then((val) => {
      domElements.error.classList.add('hidden');
      const weatherObj = formatWeather(val);
      domElements.location.innerHTML = weatherObj.name;
      domElements.temperature.innerHTML = `Temperature: ${(weatherObj.temp)}°`;
      domElements.conditions.innerHTML = `Conditions: ${weatherObj.weather}`;
      showGiphy();
      stopLoading();
      showWeather();
    }).catch(() => {
      hideWeather();
      domElements.error.classList.remove('hidden');
    });


  };


  return {
    showLoading, getLocation, updateDom, setListeners, domElements, getRadio,
  };
};

const displayUI = display();

export default displayUI;