// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCC5ZS8f79byC6bS7bRienwYsMdyqCfADg",
    authDomain: "trainwreck-a200f.firebaseapp.com",
    databaseURL: "https://trainwreck-a200f.firebaseio.com",
    projectId: "trainwreck-a200f",
    storageBucket: "trainwreck-a200f.appspot.com",
    messagingSenderId: "636745272608",
    appId: "1:636745272608:web:d2298501f2feba91"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();

  $("#add-wreck-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var Wreck = $("#Wreck-name-input").val().trim();
    var Destination = $("#Destination-input").val().trim();
    var Time = moment($("#Time-input").val().trim(), "hmm").format("HH:mm");
    var Frequency = moment($("#Frequency-input").val().trim(), "hmm").format("HH:mm");
  
    // Creates local "temporary" object for holding wreck data
    var newWreck = {
      wreck: Wreck,
      destination: Destination,
      time: Time,
      frequency: Frequency
    };
  
    // Uploads wreck data to the database
    database.ref().push(newWreck);
  
    // Logs everything to console
    console.log(newWreck.wreck);
    dconsole.log(newWreck.destination);
    console.log(newWreck.time);
    console.log(newWreck.frequency);
  
    alert("Wreck successfully added");
  
    // Clears all of the text-boxes
    $("#Wreck-name-input").val("");
    $("#Destination-input").val("");
    $("#Time-input").val("");
    $("#Frequency-input").val("");
  });
  
  // 3. Create Firebase event for adding wreck to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var Wreck = childSnapshot.val().wreck;
    var Destination = childSnapshot.val().destination;
    var Time = childSnapshot.val().time;
    var Frequency = childSnapshot.val().frequency;
  
    // Wreck Info
    console.log(Wreck);
    console.log(Destination);
    console.log(Time);
    console.log(Frequency);
  
    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(Wreck),
      $("<td>").text(Destination),
      $("<td>").text(Time),
      $("<td>").text(Frequency),
    );
  
    // Append the new row to the table
    $("#Wreck-table > tbody").append(newRow);
  });

  