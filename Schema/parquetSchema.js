
const parquet = require('@dsnp/parquetjs');

// declare a schema for the `fruits` table
// let schema = new parquet.ParquetSchema({
//     name: { type: 'UTF8' },
//     quantity: { type: 'INT64' },
//     price: { type: 'DOUBLE' },
//     date: { type: 'TIMESTAMP_MILLIS' },
//     in_stock: { type: 'BOOLEAN' }
// });
let schema = new parquet.ParquetSchema({
      announcementType:{
      type: 'INT32',
      compression: "GZIP",
      bloom_filter: false,
    },
    contentHash:{
        type: "BYTE_ARRAY",
      compression: "GZIP",
      bloom_filter: true,
    },
    fromId:{
        type: 'UINT_64',
      compression: "GZIP",
      bloom_filter: true,
    },
    url:{
        type: "UTF8",
      compression: "GZIP",
      bloom_filter: false,
    },
});

module.exports = schema;

