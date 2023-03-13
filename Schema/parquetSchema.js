const parquet = require('@dsnp/parquetjs');

let broadcast = new parquet.ParquetSchema({
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

module.exports = broadcast;

