const admin = require('firebase-admin');
const functions = require('firebase-functions');
const createUser = require('./createUser');
const requestOTP = require('./requestOTP');
const verifyOTP = require('./verifyOTP');

const serviceAccount = require('./service_accounts.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://rn-otp.firebaseio.com"
});

exports.createUser = functions.https.onRequest(createUser);
exports.requestOTP = functions.https.onRequest(requestOTP);
exports.verifyOTP = functions.https.onRequest(verifyOTP);