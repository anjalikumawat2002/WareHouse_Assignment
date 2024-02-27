const {router: sheetData} = require('./Routers/sheetData');
const {router: addData} = require('./Routers/addRow');
const path = require('path');
const express = require('express')
require("dotenv").config();
const cors = require('cors')

const app = express();

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());




app.use('/api/getSheetData', sheetData);
app.use('/api/addRow', addData);


app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/dist', 'index.html'));
});

app.listen(5000, ()=>{
    console.log('server started')
})

