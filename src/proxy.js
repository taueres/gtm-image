const fetch = require('node-fetch');
const config = require('../config.json');

exports.fetchImage = async () => {
    const now = Date.now();
    const initialTime = 1533679200000; // 08/08/2018

    const url = config.url
        .replace('{{FROM}}', initialTime)
        .replace('{{TO}}', now);

    const resp = await fetch(
        url,
        {
            headers: {
                'Authorization': 'Bearer ' + config.token
            }
        }
    );

    if (!resp.ok) {
        throw new Error('Proxy HTTP request returned status code ' + resp.status);
    }

    return await resp.buffer();
};
