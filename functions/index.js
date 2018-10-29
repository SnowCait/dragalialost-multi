'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const messaging = admin.messaging();

exports.createRoom = functions.https.onRequest((req, res) => {
  console.log('Requested.', req.url, req.body);
  const topic = req.body.topic;
  const roomId = req.body.roomId;

  // Validation
  if (!topic || !roomId) {
    return res.status(400).end();
  }

  const message = {
    // notification: {
    //   title: topic,
    //   body: roomId
    // },
    data: {
      quest: topic,
      roomId: `${roomId}`,
      element: '0',
      might: '0'
    },
    topic: topic
  };
  
  messaging.send(message)
  .then((response) => {
    console.log('Success to send message.', response);
  })
  .catch((error) => {
    console.error('Failed to send message.', error);
  });
  
  return res.status(200).end();
});

exports.subscribeQuest = functions.https.onRequest((req, res) => {
  console.log('Requested.', req.url, req.body);
  const userToken = req.body.token;
  const topic = req.body.topic;

  // Validation
  if (!userToken || !topic) {
    return res.status(400).end();
  }
  
  messaging.subscribeToTopic(userToken, topic)
    .then((response) => {
      console.log('Successfully subscribed to topic.', response);
    })
    .catch((error) => {
      console.error('Error subscribing to topic.', error);
    });
  
  return res.status(200).end();
});

exports.unsubscribeQuest = functions.https.onRequest((req, res) => {
  console.log('Requested.', req.url, req.body);
  const userToken = req.body.token;
  const topic = req.body.topic;

  // Validation
  if (!userToken || !topic) {
    return res.status(400).end();
  }

  messaging.unsubscribeFromTopic(userToken, topic)
    .then((response) => {
      console.log('Successfully unsubscribed from topic.', response);
    })
    .catch((error) => {
      console.error('Error unsubscribing from topic.', error);
    });
  
    return res.status(200).end();
});
