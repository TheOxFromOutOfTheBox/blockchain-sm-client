const express = require('express');
const app = express();
const parquetRoutes = require('./routes/parquetRoutes');

const PORT = process.env.PORT || 4000;

// is used to read the requested data from web in FORM .. middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());   // allows express to use json in body..


app.use("/parquet", parquetRoutes);

// IFFE to start the app
(async () => {

    try{
        
        app.listen(PORT, () => {
            console.log(`Server is active on port ${PORT}..`);
        })
    }
    catch(err) {    
        console.log(err);
    }

})();


app.get('/', (req, res) => {

    res.status(200).send("This is the base url..");
})


// defalut path.. if none above found then this will active
app.all('*', (req,res) => {
  res.status(404).send('<h1> Resourse not found </h1> <p> Probably wrong URL </p>');
});











