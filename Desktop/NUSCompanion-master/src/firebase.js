
  // Initialize Firebase
  import Firebase from "firebase";

  var config = {
    apiKey: "AIzaSyC5tpD6N9zJT3V-xHHqAdrBwKuEfE25GKo",
    authDomain: "bt3103-f9af7.firebaseapp.com",
    databaseURL: "https://bt3103-f9af7.firebaseio.com",
    projectId: "bt3103-f9af7",
    storageBucket: "bt3103-f9af7.appspot.com",
    messagingSenderId: "1059333989137"
  };

  //let db = firebase.firestore()
  let app = Firebase.initializeApp(config);
  

  
  //let modsInfo = db.ref("mods_info/data");


export const db = app.database(); 
export const modsInfo = db.ref("mods_info/data")
/* eslint-disable */
console.log(modsInfo);