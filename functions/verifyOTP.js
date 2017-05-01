const admin = require('firebase-admin');

// https://us-central1-rn-otp.cloudfunctions.net/verifyOTP
module.exports = (req, res) => {
  const { code, phone } = req.body;
  if (!phone || !code) {
    return res.status(422).send({
      error: 'Phone & code must be provided',
    });
  }
  const userPhone = String(phone).replace(/[^\d]/g, '');
  const receivedCode = parseInt(code);

  admin.auth().getUser(userPhone)
    .then(() => {
      // Get reference of the node in Firebase at this endpoint.
      const ref = admin.database().ref(`users/${userPhone}`);
      // Listening
      ref.on('value', snapshot => {
        // Stop Listening.
        ref.off();
        // Get the user object data.
        const user = snapshot.val();
        // compare generated code in Firebase
        // to the code received from the user
        // also check codeValid is true.
        if (user.code !== receivedCode || !user.codeValid) {
          return res.status(422).send({ error: 'Code not Valid.'});
        }
        // Mark the received code as no longer being valid.
        ref.update({ codeValid: false });
        // Create JWT & hand out to user.
        admin.auth().createCustomToken(userPhone)
          .then(token => res.send({ token: token }))
          .catch(err => res.status(500).send({ error: err }));
      })
    }).catch(err => res.status(422).send({ error: err }));
}