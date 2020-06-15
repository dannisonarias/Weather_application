import weather from './weather.js'

const display = () => {
    const kelvin = 273

    const domElements = {
        location: document.querySelector('.location'),
        temperature: document.querySelector('.temperature'),
        conditions: document.querySelector('.conditions'),
        gif: document.querySelector('.gif'),
        submitButton: document.querySelector('.submitButton'),
        locationInput: document.querySelector('.location-input'),
        locationOutput: document.querySelector('.weather-output-wrapper'),
        loading: document.querySelector('.fa-spinner'),
        error: document.querySelector('.error')

    }

    const setListeners = () => {
        domElements.submitButton.addEventListener('click', weather.loader, false)
    }

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
        return weatherObj
    }

    const kelvinToCelsius = (temp) => {
        temp = Math.round(temp - kelvin)
        return temp
    }

    const updateDom = (weatherPromise) => {
        weatherPromise.then((val) => {
            domElements.error.classList.add('hidden')
            let weatherObj = formatWeather(val)
            domElements.location.innerHTML = weatherObj.name;
            domElements.temperature.innerHTML = `Temperature: ${(weatherObj.temp)}°`;
            domElements.conditions.innerHTML = `Conditions: ${weatherObj.weather}`;
            stopLoading();
            showWeather();
        }).catch(() => {
            hideWeather();
            domElements.error.classList.remove('hidden')
        }
        )
    }

    const hideWeather = () => {
        domElements.locationOutput.classList.add('hidden')
    }
    
    const stopLoading = () => {
        domElements.loading.classList.add('hidden')
    }

    const showWeather = () => {
        domElements.locationOutput.classList.remove('hidden')
    }

    return { updateDom, setListeners, domElements };
}

const displayUI = display();

export default displayUI