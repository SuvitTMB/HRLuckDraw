
var dateString = "";
var dbStaff = "";

function Connect_DB() {
  var firebaseConfig = {
    apiKey: "AIzaSyCpNfXpcmwpVJHiphpodNG_hXDjedzldYw",
    authDomain: "hrapp-47f38.firebaseapp.com",
    projectId: "hrapp-47f38",
    storageBucket: "hrapp-47f38.appspot.com",
    messagingSenderId: "429911617740",
    appId: "1:429911617740:web:e13b3b82f05811a5791269",
    measurementId: "G-E8EKVCR3YB"
  };
  firebase.initializeApp(firebaseConfig);
  dbStaff = firebase.firestore().collection("OutsourcesStaff");
  dbReward = firebase.firestore().collection("CardRandom");
}


function NewDate() {
  var today = new Date();
  var day = today.getDate() + "";
  var month = (today.getMonth() + 1) + "";
  var year = today.getFullYear() + "";
  var hour = today.getHours() + "";
  var minutes = today.getMinutes() + "";
  var seconds = today.getSeconds() + "";
  var ampm = hour >= 12 ? 'PM' : 'AM';
  day = checkZero(day);
  month = checkZero(month);
  year = checkZero(year);
  hour = checkZero(hour);
  minutes = checkZero(minutes);
  seconds = checkZero(seconds);
  dateString = day + "/" + month + "/" + year + " " + hour + ":" + minutes + ":" + seconds +" "+ ampm;
}


function checkZero(data){
  if(data.length == 1){
    data = "0" + data;
  }
  return data;
}
