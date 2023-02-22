const router = require('express').Router();
const parquet = require('@dsnp/parquetjs');
const fs = require('fs');

const ParquetSchema = require('../Schema/parquetSchema')


router.get('/', async (req,res) => {

        // create new ParquetWriter that writes to 'fruits.parquet`
    let writer = await parquet.ParquetWriter.openFile(ParquetSchema, './fruits.parquet');

    // append a few rows to the file
    await writer.appendRow({name: 'apples', quantity: 10, price: 2.5, date: new Date(), in_stock: true});
    await writer.appendRow({name: 'oranges', quantity: 10, price: 2.5, date: new Date(), in_stock: true});

    // await writer.appendRow({name: 'Banana', quantity: 24, price: 3.5, date: new Date(), in_stock: false});

    // close file to commit and save in disk
    await writer.close();

    res.send("parquet append successful."); 
});



router.get('/read', async (req,res) => {

    // create new ParquetReader that reads from 'fruits.parquet`
    let reader = await parquet.ParquetReader.openFile('./fruits.parquet');

    // const file = fs.readFileSync('./fruits.parquet');
    // let reader = await parquet.ParquetReader.openBuffer(file);


    // create a new cursor
    let cursor = reader.getCursor();

    // read all records from the file and print them
    let record = null;
    while (record = await cursor.next()) {
        console.log(record);
    }


    // must close 
    await reader.close();

    res.send("parquet read successful.");
});



module.exports = router;



// https://github.com/LibertyDSNP/parquetjs/#browser-with-bundler

