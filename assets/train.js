$(document).ready(function() {
// Initialize Firebase
var config = {
    apiKey: "AIzaSyBYa2XCpWgYu1gootpW1J3VxzFO21_-cdA",
    authDomain: "train-sched-2020.firebaseio.com",
    databaseURL: "https://train-sched-2020.firebaseio.com/",
    storageBucket: "train-sched-2020.appspot.com"
  };
  
  firebase.initializeApp(config);
  
  var database = firebase.database();


    

// Add train button
$("#train-btn").on("click", function(event) {
    event.preventDefault();

    // Capture values
    var trainNm = $("#train-nm").val().trim();
    var dest = $("#dst").val().trim();
    var trainTime = $("#train-time").val().trim();
    var frequency = $("#freq").val().trim();

    // Convert time
    var firstTrain = moment(trainTime, "HH:mm A");
    // Current Time
    var now = moment();
    // Dif between times
    var minArr = now.diff(firstTrain, 'minutes');
    // Time apart - remainder
    var lastMin = minArr % frequency;
    // Min until train
    var minAway = frequency - lastMin;
    //Next Arrival
    var nextArr = now.add(minAway, 'minutes');
    // Format Arrival time
    var arrTime = nextArr.format("HH:mm A");


    // New rows
    var newRow = $("<tr>").append(
    $("<td>").text(trainNm),
    $("<td>").text(dest),
    $("<td>").text(frequency),
    $("<td>").text(arrTime),
    $("<td>").text(minAway)
);

$("#train-table > tbody").append(newRow);

    // Holds train data
    var newTrain = {
        name: trainNm,
        destination: dest,
        time: trainTime,
        freq: frequency
        };


    database.ref().push(newTrain);
    console.log(newTrain);

    // Adding train to database
    database.ref().on("chlid_added", function(childSnap) {
    console.log(childSnap.val());

    // Store into variables
    var trainNm = childSnap.val().name;
    var dest = childSnap.val().destination;
    var trainTime = childSnap.val().time;
    var frequency = childSnap.val().frequency;

    console.log(trainNm);
    console.log(dest);
    console.log(trainTime);
    console.log(frequency);


// Clear text-boxes
$("#train-nm").val("");
$("#dst").val("");
$("#train-time").val("");
$("#freq").val("");
});

});

});