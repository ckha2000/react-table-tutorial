import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyAdTkTzQVKHKn11kWNOnTY8Gckch3zJQZM",
  authDomain: "job-list-7e877.firebaseapp.com",
  databaseURL: "https://job-list-7e877.firebaseio.com",
  projectId: "job-list-7e877",
  storageBucket: "job-list-7e877.appspot.com",
  messagingSenderId: "843339999287",
  appId: "1:843339999287:web:0a618be9a889500ea077b2",
  measurementId: "G-H58NFTQ9QW"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//firebase.analytics();

export default firebase;

