const express = require('express')
const app = express()
const fetch = require("node-fetch");
const path = require('path')
const cors = require('cors')

app.use(cors())

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname + '/index.html'))
})

app.use(express.static(path.join(__dirname)))

app.get('/main.js', (req, res) => {
	res.sendFile(path.join(__dirname + '/main.js'))
})

app.get('/api/:city', async (req, res) => {
	const { city } = req.params
	try {
		const apiResponse = await fetch(`http://api.weatherapi.com/v1/current.json?key=11f43f4b48064aaf95835752253005&q=${city}&aqi=no`)
		const data = await apiResponse.json()
		res.json(data)
	}
	catch (err) {
		res.status(500).send('Error fetching weather data')
	}
})

app.get('/forecast/:city', async (req, res) => {
	const { city } = req.params
	try {
		const apiResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?q=${city}&days=5&key=11f43f4b48064aaf95835752253005`)
		const data = await apiResponse.json()
		res.json(data)
	}
	catch (err) {
		res.status(500).send('Error fetching weather data')
	}
})

const PORT = process.env.PORT || 2121
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})