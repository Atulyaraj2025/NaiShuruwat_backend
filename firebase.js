// firebase.js
const admin = require('firebase-admin');
const serviceAccount = require('./naishuruwat-e71bc-firebase-adminsdk-fbsvc-dbbce1bbb6.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "naishuruwat-e71bc.firebasestorage.app" // ✅ your Firebase bucket
});

const bucket = admin.storage().bucket();
module.exports = bucket;
