const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

let counters = {};

function loadCounters() {
    if (fs.existsSync('counters.json')) {
        const data = fs.readFileSync('counters.json');
        counters = JSON.parse(data);
    } else {
        counters = { '/': 0, '/about': 0 };
    }
}


function saveCounters() {
    fs.writeFileSync('counters.json', JSON.stringify(counters));
}


loadCounters();

app.get('/', (req, res) => {
    counters['/']++;
    saveCounters();
    res.send(`Главная страница. Количество просмотров: ${counters['/']}`);
});

app.get('/about', (req, res) => {
    counters['/about']++;
    saveCounters();
    res.send(`Страница "О нас". Количество просмотров: ${counters['/about']}`);
});

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});