const db = require('./firebaseInit');

// document 추가 
const newUserWord = db.collection('user_words').doc();
newUserWord.set({
  id: '123',
  content: '테스트'
});