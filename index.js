const express = require('express');
const axios = require('axios');
const { google } = require('googleapis');

const app = express();
app.use(express.json());

app.post('/webhook', async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).send('Missing "message" field.');
  }

  try {
    // Echo the message or forward it
    console.log(`Received: ${message}`);
    res.status(200).send(`Echo: ${message}`);
  } catch (error) {
    console.error('Webhook error:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Quill Assistant Engine listening on port ${PORT}`);
});
