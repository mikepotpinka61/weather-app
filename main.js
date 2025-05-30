document.querySelector('button').addEventListener('click', () => {
	const city = document.querySelector('input').value;
	getCurrentWeather(city)
	getForecast(city)
})

async function getCurrentWeather(city) {

	try {
		const response = await fetch(`/api/${city}`)
		const data = await response.json()

		console.log(data)

		const current = data.current.temp_f
		document.querySelector('#info').innerText = current + '°F'

		const icon = data.current.condition.icon
		document.querySelector('#icon').src = icon

		const condition = data.current.condition.text
		document.querySelector('#condition').innerHTML = condition
	}
	catch (err) {
		console.error(err)
	}
}

async function getForecast(city) {
  try {
    const response = await fetch(`/forecast/${city}`);
    const data = await response.json();

    const forecastContainer = document.querySelector('#forecast');
    forecastContainer.innerHTML = ''; // Clear previous forecast

    data.forecast.forecastday.forEach(day => {
      const date = day.date;
      const avgTemp = day.day.avgtemp_f;
      const icon = day.day.condition.icon;
      const condition = day.day.condition.text;

      const dayDiv = document.createElement('div');
      dayDiv.classList.add('forecast-day');

      dayDiv.innerHTML = `
        <h4>${date}</h4>
        <img src="${icon}" alt="${condition}">
        <p>${condition}</p>
        <p>Avg Temp: ${avgTemp}°F</p>
      `;

      forecastContainer.appendChild(dayDiv);
    });

  } catch (err) {
    console.error(err);
  }
}
