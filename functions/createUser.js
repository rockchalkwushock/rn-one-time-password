const admin = require('firebase-admin');

// function vs => doesn't matter here
// unless you need binding of 'this'
// context throughout function.

// https://us-central1-rn-otp.cloudfunctions.net/createUser
module.exports = (req, res) => {
  const { phone } = req.body;
  // Verify the user provided a phone
  if (!phone) {
    return res.status(422).send({ error: 'Bad Input' });
  }
  // Format phone-number to remove dashes and parens
  // Don't know if what user provides a string or number type
  // so we coerce to a String to use the replace method.
  // Regex that replaces anything that is not a digit.
  const userPhone = String(phone).replace(/[^\d]/g, '');

  // Create a new user account using that phone number
  // This issues an async req to the firebase database.
  // createUser returns as a promise.
  admin.auth().createUser({ uid: userPhone })
    .then(user => res.send(user))
    .catch(err => res.status(422).send({ error: err }));
  // Respond to the user request, saying the account was made
}

