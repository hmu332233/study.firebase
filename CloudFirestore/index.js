const db = require('./firebaseInit');

// document 추가 
const setUserWord = async ({ id, content }) => {
  const newUserWord = db.collection('user_words').doc();
  newUserWord.set({ id, content });
}

// document 가져오기
const getUserWords = async () => {
  const userWordDocs = await db.collection('user_words').get();
  userWordDocs.forEach(doc => {
    console.log(doc.id, '=>', doc.data());
  });
}

setUserWord({
  id: '123456',
  content: '방금 씀'
})
getUserWords();