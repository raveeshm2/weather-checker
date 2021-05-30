const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const cors = require('cors')

const app = express();

app.use(cors());

app.use(bodyParser.json());

const API_KEY = '87431974416b6c42655bc37c70014f3d'

app.get('/weather/:city', async (req, res) => {
    const city = req.params.city;
    const result = await (fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`).then(res => res.json()));
    res.send({message: result});
})

app.listen(4000, () => {
    console.log('server listening on port 4000');
})