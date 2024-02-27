const express = require('express');
const {getAuthToken, addRowIntoSheet, } = require("../Services/googleservice");

const router = express.Router();

router.post('/', async (req, res)=>{
    try{
        const values = req.body.dataToAdd
        const response = await addData(values);
        if(response.status === 200)
            res.json({success:'true', message:'data inserted into sheet', resp: response}).status(201);

        else{
            res.json({success:'false', message:'cannot insert the row'}).status(response.status);
        }
        

    }
    catch(e){
        res.json({success:"false", message: e}).status(500)
    }
})

async function addData(values){
    const auth = await getAuthToken();
    const spredSheet = await addRowIntoSheet({

        spreadsheetId: process.env.spred_sheet_id,
        auth: auth,
        sheetName: process.env.SHEET_NAME,
        values: values
    })
    return spredSheet
}

module.exports = {
    router
}