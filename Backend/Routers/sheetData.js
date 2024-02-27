const Router = require('express').Router;
const {getAuthToken, getSpreadSheetValues, } = require("../Services/googleservice");

const router = Router();

router.get('/', async (req, res)=>{
    try{
        const response = await getSheetData();
        res.json(response).status(200);

    }
    catch(e){
        res.json({success:"false", message: e}).status(500)
    }
})

async function getSheetData(){
    
    const Auth = await getAuthToken();
    const spredSheet = await getSpreadSheetValues(
        {spreadsheetId:process.env.spred_sheet_id, 
            auth: Auth, 
            sheetName: process.env.SHEET_NAME});

    return spredSheet.data.values;
}

module.exports = {
    router
}