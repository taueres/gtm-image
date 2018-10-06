const { influx } = require('../src/influx');
const {
    influx: { dbName, measurement },
} = require('../config.json');
const { readSizes } = require('../src/sizeReader');

const execDatabaseCheck = async () => {
    const names = await influx.getDatabaseNames();
    if (!names.includes(dbName)) {
        return influx.createDatabase(dbName);
    }
};

const databaseChecking = execDatabaseCheck();

exports.loadFixtures = async () => {
    await databaseChecking;

    const sizes = await readSizes();
    if (sizes.gzip !== 0 || sizes.plain !== 0) {
        console.log('Fixtures already loaded, skipping...');
        return;
    }

    console.log('Loading fixtures...');
    return influx.writePoints([
        {
            measurement,
            tags: { type: 'plain' },
            fields: { size: 315278 },
        },
        {
            measurement,
            tags: { type: 'gzip' },
            fields: { size: 51894 },
        }
    ], {
        database: dbName,
        precision: 's',
    });
};
