const admin = require('firebase-admin');
const twilio = require('./twilio');
const twilioNumber = require('./sensitive').TWILIO_NUMBER;

// https://us-central1-rn-otp.cloudfunctions.net/requestOTP
module.exports = (req, res) => {
  const { phone } = req.body;
  if (!phone) {
    return res.status(422).send({ error: 'Must provide phone number.'});
  }
  const userPhone = String(phone).replace(/[^\d]/g, '');
  // This is another async request
  // getUser returns as a promise.
  admin.auth().getUser(userPhone)
    .then(user => {
      const code = Math.floor((Math.random() * 8999 + 1000));
      // Twilio is async however it will not return a promise.
      // Must handle with a callback.
      twilio.messages.create({
        body: `Your code is: ${code}.`,
        to: userPhone,
        from: twilioNumber,
      }, (err) => {
        if (err) return res.status(422).send({ error: err });
        // Created a new collection called: users.
        // Once again this is async code but I will be
        // updating the database.
        admin.database().ref(`users/${userPhone}`)
          .update({ code: code, codeValid: true }, () => {
            res.send({ success: true });
          });
      })
    }).catch(err => res.status(422).send({ error: err }));
}