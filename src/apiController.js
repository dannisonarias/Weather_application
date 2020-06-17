const key = '0cb32602c971eeb40dcaeffd18a02caf';

const main = () => {
  const getWeather = async (city) => {
    const base = 'https://api.openweathermap.org/data/2.5/weather';
    let response = await fetch(`${base}?q=${city}&APPID=${key}`, { mode: 'cors' });
    response = await response.json();
    return response;
  };
  return { getWeather };
};

const weather = main();
export default weather;