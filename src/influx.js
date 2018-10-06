const {
    influx: { dbName, host, measurement },
} = require('../config.json');
const { InfluxDB, FieldType } = require('influx');

exports.influx = new InfluxDB({
    host: host,
    database: dbName,
    schema: [
        {
            measurement,
            fields: { size: FieldType.INTEGER },
            tags: ['type']
        }
    ]
});
