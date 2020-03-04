const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = 3001;

app.get('/stats/players', async (req, res) => {
    const url = 'https://api-nba-v1.p.rapidapi.com/players/league/standard';
    const response = await fetch(url, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
            "x-rapidapi-key": "84dae3dde5mshaba0a3c9d4ff874p1e3f80jsn2ef2157b99e2"
        }
    });
    const data = await response.json();
    res.json(data);
});

app.get('/stats/teams', async (req, res) => {
    const url = 'https://api-nba-v1.p.rapidapi.com/teams/league/standard';
    const response = await fetch(url, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
            "x-rapidapi-key": "84dae3dde5mshaba0a3c9d4ff874p1e3f80jsn2ef2157b99e2"
        }
    });
    const data = await response.json();
    res.json(data);
});

app.get('/stats/draft', async (req, res) => {
    const url = 'http://data.nba.net/10s/prod/v1/2019/players.json';
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
});

app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
});

module.exports = app;