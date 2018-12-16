'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const messaging = admin.messaging();

const request = require('request');
function requestAsync(options) {
  return new Promise(function (resolve, reject) {
    request(options, function (error, res, body) {
      if (!error && res.statusCode == 200) {
        resolve(body);
      } else {
        reject(error);
      }
    });
  });
}

// できれば admin から取得したい
const serverKey = '';

const { elementsMaster, levelsMaster, questsMaster } = require('../public/assets/master');
const Room = require('../public/room');
const helper = require('../public/helper');
const Twitter = require('twitter');

exports.createRoom = functions.https.onRequest((req, res) => {
  console.log('Requested.', req.url, req.body);
  const topic = req.body.topic;
  const roomId = req.body.roomId;
  const note = req.body.note;
  const createdAt = Date.now();

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
      topic: topic,
      roomId: `${roomId}`,
      note: note,
      createdAt: `${createdAt}`
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

  // Tweet （できれば別の Function にするか async メソッドに切り分けて fire&forget したい）
  const room = new Room(roomId, topic, note, createdAt, questsMaster, levelsMaster, elementsMaster);
  const twitterClient = new Twitter({
    consumer_key: functions.config().twitter.consumer_key,
    consumer_secret: functions.config().twitter.consumer_secret,
    access_token_key: functions.config().twitter.access_token,
    access_token_secret: functions.config().twitter.access_token_secret
  });
  let tweetText = `${room.questName}（${room.levelName}）の募集があるみたいですよ\n${helper.hyphenSeparatedRoomId(room.id)}`;
  if (room.note) {
    tweetText += `\n${room.note}`;
  }
  tweetText += `\nhttps://dragalialost-multi.firebaseapp.com/\n#ドラガリ #ドラガリマルチ`;
  twitterClient.post('statuses/update', { status: tweetText }, function(error, tweet, response) {
    if (error) {
      throw error;
    }
    console.log('tweet', tweet);
    console.log('response', response);
  });
  
  return res.status(200).end();
});

exports.getSubscribingQuests = functions.https.onRequest(async (req, res) => {
  console.log('Requested.', req.url, req.body);
  const userToken = req.body.token;

  // Validation
  if (!userToken) {
    console.error('UserToken:', userToken);
    return res.status(400).end();
  }

  const options = {
    method: 'GET',
    url: `https://iid.googleapis.com/iid/info/${userToken}?details=true`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `key=${serverKey}`
    }
  };
  try {
    const json = await requestAsync(options);
    const result = JSON.parse(json);
    const topics = result.rel ? result.rel.topics : {};
    console.log('Topics:', topics);

    return res.status(200).send(JSON.stringify(topics));
  } catch (err) {
    console.error(err);
    return res.status(500).end();
  }
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
