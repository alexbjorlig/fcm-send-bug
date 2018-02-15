const admin = require('firebase-admin');

var serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({credential: admin.credential.cert(serviceAccount)});

async function sendMessage(token) {
    try {
        const message = {
            data: {
                title: 'some title',
                body: 'some body',
            },
            token: token
        };
        const response = await admin.messaging().send(message);
        console.log(`Success, delived at ${response}`);
    } catch (err) {
        console.log(err.code);
        console.log(err);
    }
}

/** 
 * Steps to reproduce bug
 * 1) npm i, download key file, and obtain a valid token
 * 2) Send message succesfully, to confirm everything works.
 * 3) Now revoke the token and try to send token again.
 * 4) You now recieve the err.code: "messaging/unknown-error"
 * 5) Is this expected? It is like the error is wrapped, and inside the error there is 
 * the correct 'messaging/invalid-argument' error.
 */
const validToken = 'insert-valid-token';
sendMessage(validToken);
