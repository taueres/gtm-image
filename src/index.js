const { port } = require('../config.json');
const express = require('express');
const app = express();

const { buildCache } = require('./cache');
const cache = buildCache();

app.get('/gtm', async (req, res) => {
    try {
        const data = await cache();
        res.header('Content-Type', 'image/png');
        res.send(data);

        const { heapTotal } = process.memoryUsage();
        console.log(`Request handled. Memory usage ${Math.round(heapTotal / 1024 / 1024 * 100) / 100} MB`);
    } catch (e) {
        console.log(e);
        res.status(500);
        res.send('An error occurred');
    }
});

app.disable('x-powered-by');
app.listen(port, () => console.log(`App listening on port ${port}!`));
