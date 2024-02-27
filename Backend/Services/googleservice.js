const { google } = require('googleapis')
const sheets = google.sheets('v4');
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets']

async function getAuthToken() {
  const auth = new google.auth.GoogleAuth({
    scopes: SCOPES
  });
  const authToken = await auth.getClient();
  return authToken;
}
async function getSpreadSheet({spreadsheetId, auth}) {
    const res = await sheets.spreadsheets.get({
      spreadsheetId,
      auth,
    });
    return res;
  }
  
  async function getSpreadSheetValues({spreadsheetId, auth, sheetName}) {
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId,
      auth,
      range: sheetName
    });
    return res;
  }

  async function addRowIntoSheet({spreadsheetId, auth, sheetName, values}){
    
    const res = await sheets.spreadsheets.values.append({
      auth,
      range: sheetName,
      spreadsheetId,
      insertDataOption:"INSERT_ROWS",
      valueInputOption: "USER_ENTERED",
      requestBody:{
        majorDimension: 'ROWS',
        values: values
        
      }      
    })
    return res;
  }
  
  
  module.exports = {
    getAuthToken,
    getSpreadSheet,
    getSpreadSheetValues,
    addRowIntoSheet
  }
