const router = require('express').Router();
const parquet = require('@dsnp/parquetjs');
const fs = require('fs');
// const Web3Storage = require('web3.storage');

const ParquetSchema = require('../Schema/parquetSchema')



// function getAccessToken () {
//   return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDZlNjNCNTE5ZGREMThDYjA4NTgxM0I1Y0JCRTZEQWE3ODU3YjJFZTkiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2Nzc1NjczMzQ1NzYsIm5hbWUiOiJTY2hlbWEgVGVzdCJ9.rTSBPglXKf8pwb2qdISq9mFuElLz2YGMB-34YWyOkVc'
// }

// function makeStorageClient () {
//   return new Web3Storage.Web3Storage({ token: getAccessToken() })
// }

// async function getFiles (path) {
//   console.log(`read from ${path}`);
//   const files = await Web3Storage.getFilesFromPath(path);
//   console.log(`read ${files.length} file(s) from ${path}`);
//   return files;
// }
// async function storeFiles (files) {
//     console.log('wntered');
//     const client = makeStorageClient()
//     const cid = await client.put(files)
//     console.log('stored files with cid:', cid)
//     return cid
//   }

// async function retrieve (cid) {
//   const client = makeStorageClient()
//   const res = await client.get(cid)
//   console.log(`Got a response! [${res.status}] ${res.statusText}`)
//   if (!res.ok) {
//     throw new Error(`failed to get ${cid}`)
//   }
//   const files = await res.files()
//   for (const file1 of files) {
//     console.log(`${file1.pins} -- ${file1.path} -- ${file1.size}`)
//   }
//   // request succeeded! do something with the response object here...
// }

router.get('/', async (req,res) => {

        // create new ParquetWriter that writes to 'fruits.parquet`
    let writer = await parquet.ParquetWriter.openFile(ParquetSchema, './files/broadcast.parquet');


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

    // let pq_file = fs.readFileSync("./fruits.parquet");

    // const file1 = await getFiles('./files/fruits.parquet')
    // console.log(file1)
    // storeFiles(file1);

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

router.get('/cid/:value', async (req,res) => {
  console.log(req.params.value)
  let resp = await retrieve(req.params.value)
  res.send('Got Resp')
});

module.exports = router;



// https://github.com/LibertyDSNP/parquetjs/#browser-with-bundler

