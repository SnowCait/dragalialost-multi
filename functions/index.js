'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const messaging = admin.messaging();

exports.createRoom = functions.https.onRequest((req, res) => {
  const topic = 'test-topic-1';
  const payload = {
    notification: {
      title: 'TITLE',
      body: 'BODY'
    },
    topic: topic
  };
  
  messaging.send(payload)
  .then((response) => {
    console.log('Success to send message.', response);
  })
  .catch((error) => {
    console.error('Failed to send message.', error);
  });
  
  return res.status(200).send();
});

exports.subscribeQuest = functions.https.onRequest((req, res) => {
  const registrationToken = '';
  const topic = 'test-topic-1';
  
  messaging.subscribeToTopic(registrationToken, topic)
    .then((response) => {
      console.log('Successfully subscribed to topic.', response);
    })
    .catch((error) => {
      console.error('Error subscribing to topic.', error);
    });
  
  return res.status(200).send();
});

exports.unsubscribeQuest = functions.https.onRequest((req, res) => {
  const registrationToken = '';
  const topic = 'test-topic-1';
  
  messaging.unsubscribeFromTopic(registrationToken, topic)
    .then((response) => {
      console.log('Successfully unsubscribed from topic.', response);
    })
    .catch((error) => {
      console.error('Error unsubscribing from topic.', error);
    });
  
    return res.status(200).send();
});
