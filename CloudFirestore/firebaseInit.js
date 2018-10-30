// firebaseInit.js 
const firebase = require('firebase');
require('firebase/firestore');
const firebaseConfig = require('./firebaseConfig');

const firebaseApp = firebase.initializeApp(firebaseConfig);

const firestore = firebaseApp.firestore();
const settings = {
  timestampsInSnapshots: true
};
firestore.settings(settings);

module.exports = firestore;