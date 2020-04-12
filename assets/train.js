// Initialize Firebase
var config = {
    apiKey: "AIzaSyBYa2XCpWgYu1gootpW1J3VxzFO21_-cdA",
    authDomain: "train-sched-2020.firebaseio.com",
    databaseURL: "https://train-sched-2020.firebaseio.com/",
    storageBucket: "train-sched-2020.appspot.com"
  };
  
  firebase.initializeApp(config);
  
  var database = firebase.database();