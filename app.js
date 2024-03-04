const express = require('express');
const app = express();
const port = 3000;
const fetch = require('node-fetch');
const dotenv = require('dotenv');
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send(`
        <div style="display: flex; justify-content: center; align-items: center; height: 30vh;">
        <h1 style="font-family: Arial; font-size: 40px;">Today's Weather!</h1>
        </div>
        <div style="display: flex; justify-content: center; align-items: center; height: 30vh;">
            <form action="/weather" method="post" style="font-family: Arial; width: 50%; padding: 10px;">
                <input type="text" name="longitude" placeholder="Longitude" style="display: block; margin: 10px 0;">
                <input type="text" name="latitude" placeholder="Latitude" style="display: block; margin: 10px 0;">
                <button type="submit" style="background-color: blue; color: white; padding: 5px 10px;">Submit</button>
            </form>
        </div>
    `);
})

app.post('/weather', async (req, res) => {
    const { longitude, latitude } = req.body;
    const apiKey = process.env.OPEN_WEATHER_API;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;
    const response = await fetch(url);
    const data = await response.json();
    const weather = `${data.weather[0].description}` + `with a temperature of ${data.main.temp}°F`;
    res.send(`
    <div style="display: flex; justify-content: center; align-items: center; height: 30vh;">
    <h1 style="font-family: Arial; font-size: 40px;">Today's Weather!</h1>
    </div>
    <div style="display: flex; justify-content: center; align-items: center; height: 30vh;">
        <form action="/weather" method="post" style="font-family: Arial; width: 50%; padding: 10px;">
            <input type="text" name="longitude" placeholder="Longitude" style="display: block; margin: 10px 0;">
            <input type="text" name="latitude" placeholder="Latitude" style="display: block; margin: 10px 0;">
            <button type="submit" style="background-color: blue; color: white; padding: 5px 10px;">Submit</button>
        </form>
        <p style="font-family: Arial; font-size: 20px;">${weather}</p> <br> <a href="/" style="font-family: Arial; color: blue;">Go Back</a>
    </div>
`);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});