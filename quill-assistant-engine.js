require('dotenv').config();
const { GoogleSpreadsheet } = require('google-spreadsheet');

const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);

async function logMessage(message) {
  try {
    await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    });

    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0]; // first sheet
    await sheet.addRow({ Timestamp: new Date().toISOString(), Message: message });

    return { status: 'success', message: 'Message logged to Google Sheet' };
  } catch (err) {
    console.error('Google Sheets Error:', err);
    return { status: 'error', message: err.message };
  }
}

module.exports = { logMessage };
