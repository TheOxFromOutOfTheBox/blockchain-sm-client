
const parquet = require('@dsnp/parquetjs');

// declare a schema for the `fruits` table
let schema = new parquet.ParquetSchema({
    name: { type: 'UTF8' },
    quantity: { type: 'INT64' },
    price: { type: 'DOUBLE' },
    date: { type: 'TIMESTAMP_MILLIS' },
    in_stock: { type: 'BOOLEAN' }
});


module.exports = schema;

