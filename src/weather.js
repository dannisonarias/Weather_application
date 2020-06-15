import display from './display.js'
const key = '0cb32602c971eeb40dcaeffd18a02caf';

const main = () => {
    const loader = () => {
        showLoading();
        const city = getLocation();
        const weatherPromise = getWeather(city);
        display.updateDom(weatherPromise)
    }

    const showLoading = () =>{
        display.domElements.loading.classList.remove('hidden')
    }

    const getLocation = () =>{
        return display.domElements.locationInput.value
    }

    const getWeather = async (city, units, action) => {
        const base = 'https://api.openweathermap.org/data/2.5/weather';
        let response = await fetch(`${base}?q=${city}&APPID=${key}`, { mode: 'cors' });
        response = response.json()
        return response
      };

    return {loader}
}

const weather = main();
export default weather