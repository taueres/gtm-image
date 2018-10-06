const {
    influx: { measurement },
} = require('../config.json');
const { influx } = require('./influx');

const buildQuery = type => `
    SELECT size
    FROM ${measurement}
    WHERE type='${type}'
    ORDER BY time DESC
    LIMIT 1
`;

const querySize = async type => {
    const result = await influx.query(buildQuery(type));
    return result.length === 0
        ? 0
        : result[0].size;
};

exports.readSizes = async () => {
    const [plain, gzip] = await Promise.all([
        querySize('plain'),
        querySize('gzip'),
    ]);

    return {
        plain,
        gzip,
    };
};
