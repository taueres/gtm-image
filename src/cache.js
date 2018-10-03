const { fetchImage } = require('./proxy');

const hasValidCache = cache => {
    if (cache.data === null) {
        return false;
    }

    const { exp } = cache;
    const curTime = Date.now();
    return curTime <= exp;
};

const setValueToCache = (value, cache) => {
    const curTime = Date.now();
    const exp = curTime + 24 * 60 * 60 * 1000; // 24 hours

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

        const data = await fetchImage();
        setValueToCache(data, cache);
        return data;
    };
};
