# RN-One-Time-Password

Follows the 2nd Application built in Stephen Grider's [React-Native: Advanced Concepts](https://www.udemy.com/react-native-advanced/learn/v4/overview).

## :fire: Firebase :fire:

[Create and Deploy Your First Cloud Functions](https://firebase.google.com/docs/functions/write-firebase-functions)

> _NOTE_ :rotating_light:
>
> _To make calls to 3rd Party API's you **MUST** have a paid account with Firebase._

Installing the `firebase-tools` CLI:

```bash
npm i -g firebase-tools
# or
yarn global add firebase-tools

# Then...
firebase login
```

How to deploy using the CLI:

```bash
firebase deploy --project <name>
```

`exports.<name>` will be the **name** of the cloud function & the name of the **endpoint** for that function.

Example:

```javascript
exports.helloWorld = functions.https.onRequest((req, res) => {
  res.send("Hello from Firebase!");
});
// Firebase dashboard
// Function: helloWorld
// helloWorld GCF Endpoint:
// https://us-central1-rn-otp.cloudfunctions.net/helloWorld
```

> _Make sure that you add the generated private keys to your `.gitignore`. This file should **NEVER** be made public!!!_

One downside to `firebase` is that if there are any errors in your function firebase will not catch this...best to use a linter to catch as much as you can.

## :calling: Twilio :incoming_envelope:

> _NOTE:_ :rotating_light:
>
> _If you are operating on the trial membership you **MUST** use the telephone number you provided to Twilio when testing that all 3 GCF's work._

[Twilio Error Docs](https://www.twilio.com/docs/api/errors)

FYI: Must pass phone number that matches Twilio accepted formats:

> **Error - 21211**
>
> Invalid 'To' Phone Number
>
> You attempted to initiate an outbound phone call, but the 'To' phone number you supplied was not a valid phone number. Twilio accepts phone numbers in E164 format (i.e. "+1 format"), or 10-digit US and Canadian numbers with any combination of non-digit separators.

## API ENDPOINTS

METHOD | INFO | STATUS | ENDPOINT
---------|----------|---------|-----
 POST | create a user in Firebase | Active | `/createUser`
 POST | request a one-time-password | Active | `/requestOTP`
 POST | verify the one-time-password | Active | `/verifyOTP`