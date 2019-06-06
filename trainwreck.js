//Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBpRYzub5lleOlpINaZZElesVRYK5l80KA",
    authDomain: "bootcamp-624ae.firebaseapp.com",
    databaseURL: "https://bootcamp-624ae.firebaseio.com",
    projectId: "bootcamp-624ae",
    storageBucket: "bootcamp-624ae.appspot.com",
    messagingSenderId: "89632336051",
    appId: "1:89632336051:web:5c87f8dabeba288c"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();

  $("#add-wreck-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var wreckName = $("#Wreck-name-input").val().trim();
    var wreckRole = $("#Destination-input").val().trim();
    var wreckStart = moment($("#Time-input").val().trim(), "MM/DD/YYYY").format("X");
    var wreckRate = $("#Frequency-input").val().trim();
  
    // Creates local "temporary" object for holding wreck data
    var newWreck = {
      wreck: empWreck,
      destination: empDestination,
      time: empTime,
      frequency: empFrequency
    };
  
    // Uploads wreck data to the database
    database.ref().push(newWreck);
  
    // Logs everything to console
    console.log(newWreck.wreck);
    console.log(newWreck.destination);
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
    var empWreck = childSnapshot.val().wreck;
    var empDestination = childSnapshot.val().destination;
    var empTime = childSnapshot.val().time;
    var empFrequency = childSnapshot.val().frequency;
  
    // Wreck Info
    console.log(empWreck);
    console.log(empDestination);
    console.log(empTime);
    console.log(empFrequency);
  
    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(empWreck),
      $("<td>").text(empDestination),
      $("<td>").text(empTime),
      $("<td>").text(empFrequency),
    );
  
    // Append the new row to the table
    $("#Wreck-table > tbody").append(newRow);
  });

  