import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyD9rkdmmeeWNLeVNqgXDSjlJe7E-eqwLzw",
    authDomain: "devtracker-b3494.firebaseapp.com",
    projectId: "devtracker-b3494",
    storageBucket: "devtracker-b3494.appspot.com",
    messagingSenderId: "1021940158219",
    appId: "1:1021940158219:web:0696494358ec83e56adc0e"
  };

  // init firebase
  firebase.initializeApp(firebaseConfig)

  //init services
  const projectFirestore = firebase.firestore()
  const projectAuth = firebase.auth()
  const projectStorage = firebase.storage()

  // timestamp
  const timestamp = firebase.firestore.Timestamp

  export { projectFirestore, projectAuth, projectStorage, timestamp}