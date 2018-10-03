const fetch = require('node-fetch');
const config = require('../config.json');

exports.fetchImage = async () => {
    const resp = await fetch(
        config.url,
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
