'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const messaging = admin.messaging();

exports.createRoom = functions.https.onRequest((req, res) => {
  const registrationToken = '';
  const payload = {
    notification: {
      title: 'TITLE',
      body: 'BODY'
    },
    token: registrationToken
  };
  messaging.send(payload)
  .then((response) => {
    console.log('Success to send message.', response);
  })
  .catch((error) => {
    console.error('Failed to send message.', error)
  });
  return res.status(204).send();
});
