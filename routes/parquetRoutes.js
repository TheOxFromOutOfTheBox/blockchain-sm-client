const router = require('express').Router();
const parquet = require('@dsnp/parquetjs');
const fs = require('fs');

const ParquetSchema = require('../Schema/parquetSchema')


router.get('/', async (req,res) => {

        // create new ParquetWriter that writes to 'fruits.parquet`
    let writer = await parquet.ParquetWriter.openFile(ParquetSchema, './fruits.parquet');


    console.log("Parquet Working");
    // append a few rows to the file
    await writer.appendRow({announcementType: 1, contentHash: 'bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi', fromId: 1, url :'https://ipfs.io'});
    await writer.appendRow({announcementType: 1, contentHash: 'bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi', fromId: 1, url :'https://ipfs.io'});
    await writer.appendRow({announcementType: 1, contentHash: 'bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi', fromId: 1, url :'https://ipfs.io'});
    await writer.appendRow({announcementType: 1, contentHash: 'bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi', fromId: 1, url :'https://ipfs.io'});
    await writer.appendRow({announcementType: 1, contentHash: 'bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi', fromId: 1, url :'https://ipfs.io'});
    await writer.appendRow({announcementType: 1, contentHash: 'bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi', fromId: 1, url :'https://ipfs.io'});

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

