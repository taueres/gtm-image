const { cacheMs } = require('../config.json');
const { getImage } = require('./imageBuilder');

const hasValidCache = cache => {
    if (cacheMs <= 0) {
        return false;
    }

    if (cache.data === null) {
        return false;
    }

    const { exp } = cache;
    const curTime = Date.now();
    return curTime <= exp;
};

const setValueToCache = (value, cache) => {
    if (cacheMs <= 0) {
        return;
    }

    const curTime = Date.now();
    const exp = curTime + cacheMs;

    cache.data = value;
    cache.exp = exp;
};

exports.buildCache = () => {
    const cache = {
        data: null,
        exp: null
    };

    return async () => {
        if (hasValidCache(cache)) {
            return cache.data;
        }

        const data = await getImage();
        setValueToCache(data, cache);
        return data;
    };
};
