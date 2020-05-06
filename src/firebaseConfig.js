import firebase from 'firebase'
import 'firebase/firestore'

// firebase init goes here
const config = {
  apiKey: 'AIzaSyAJli80J9E3AwfD5ao8IyBl1105AxDHt28',
  authDomain: 'codumdal-eacf2.firebaseapp.com',
  databaseURL: 'https://codumdal-eacf2.firebaseio.com',
  projectId: 'codumdal-eacf2',
  storageBucket: 'codumdal-eacf2.appspot.com',
  messagingSenderId: '784645595316'
}

firebase.initializeApp(config)

// firebase utils
const db = firebase.firestore()
const auth = firebase.auth()
const currentUser = auth.currentUser

// date issue fix according to firebase
const settings = {
}
db.settings(settings)

// firebase collections
const usersCollection = db.collection('users')
const recipesCollection = db.collection('recipes')
const categoriesCollection = db.collection('categories')

export {
  db,
  auth,
  currentUser,
  usersCollection,
  recipesCollection,
  categoriesCollection
}
