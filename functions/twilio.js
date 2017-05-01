const twilio = require('twilio');
const accountSid = require('./sensitive').TWILIO_SID;
const authToken = require('./sensitive').TWILIO_TOKEN;

module.exports = new twilio.Twilio(accountSid, authToken);
