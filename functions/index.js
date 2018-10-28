'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const messaging = admin.messaging();

exports.createRoom = functions.https.onRequest((req, res) => {
  const topic = req.body.topic;
  const roomId = req.body.roomId;
  const message = {
    // notification: {
    //   title: topic,
    //   body: roomId
    // },
    data: {
      quest: topic,
      roomId: `${roomId}`,
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
  const userToken = req.body.token;
  const topic = req.body.topic;
  
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
  const userToken = req.body.token;
  const topic = req.body.topic;
  
  messaging.unsubscribeFromTopic(userToken, topic)
    .then((response) => {
      console.log('Successfully unsubscribed from topic.', response);
    })
    .catch((error) => {
      console.error('Error unsubscribing from topic.', error);
    });
  
    return res.status(200).end();
});
