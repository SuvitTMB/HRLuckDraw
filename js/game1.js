var dateString = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear()+543;
today = dd + '/' + mm + '/' + yyyy;
var iRank = 0;
var EidRandom1 = "";
//var CheckRank = [ 19, 10, 42, 36, 14, 29 ];
var CheckRank = [];
var randItems = [
"1,000 บาท",
"3,000 บาท",
"4,000 บาท",
"5,000 บาท",
];
//console.log(randItems);
//Connect_DB();

var selectedItem = randItems.length - 1;
var randSpeed = 0;
var targetItem = -1;
var $randItems =[];
var randStat = [];
var r = new Random(Random.engines.mt19937().autoSeed());
function nextRand() {
  $randItems[selectedItem].removeClass('selected');
  selectedItem = r.integer(0, $randItems.length - 1);
  $randItems[selectedItem].addClass('selected');
  if (speed > 2) {
     if (Math.random() < ((21 - speed) * 0.05))
        speed--;
    setTimeout(nextRand, 1000.0/speed);
  }
  else {
$randItems[selectedItem].removeClass('selected');
selectedItem = CheckRank[iRank];
console.log("End="+selectedItem);
if(selectedItem>=0 && selectedItem<4) {
  UpdateData();
}
$randItems[selectedItem].addClass('selectedEND');
iRank++;
    randStat[selectedItem]++;
    $("#randResult").text($randItems[selectedItem].text());
    $("#randResult-modal").modal();
    document.getElementById('OpenClick').style.display='none';
    document.getElementById('OpenGoHome').style.display='block';
    $('#startRand').prop('disabled', false);
  }
}


function startRand () {
  speed = 12;
  $('#startRand').prop('disabled', true);
  nextRand();
}


function removeSelectedItem() {
  $randItems.splice(selectedItem, 1);
  selectedItem = 0;
  $('#randResult-modal').modal('hide');
}


$(document).ready(function() {
  if(sessionStorage.getItem("EmpNumber_HR")==null) { location.href = "index.html"; }
  Connect_DB();
  CheckData();
  dbRSOCMember = firebase.firestore().collection("RSOC_Member");
  var $randItemContainer = $('.rand-item-container'),
      $btn = $('#startRand');
  randItems.forEach(function (randItem) {
    var $randItem = $('<div/>',{
      'class': 'col-sm-2 col-xs-4 rand-item'
    }).append($('<span/>').text(randItem));
    $randItemContainer.append($randItem);
    $randItems.push($randItem);  
    randStat.push(0);
  });  
  $btn.on('click tap', startRand);
  $("#randResult-close").on('click tap', removeSelectedItem);
  $("#randResult-next").on('click tap', function() {
    removeSelectedItem();
    startRand();
  });
});


var average = function(a) {
  var r = {mean: 0, variance: 0, deviation: 0}, t = a.length;
  for(var m, s = 0, l = t; l--; s += a[l]);
  for(m = r.mean = s / t, l = t, s = 0; l--; s += Math.pow(a[l] - m, 2));
  
  r.deviation = Math.sqrt(r.variance = s / t);
  return r;
}


var xCheck1 = 0;
var xReward1 = "";
var xTypeReward = "";
var EidEmpNumber = "";

function CheckData() {
  var i = 0
  var str = "";
  var str1 = "";
  dbStaff.where('EmpNumber','==',sessionStorage.getItem("EmpNumber_HR"))
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      EidRandom1 = doc.id;
      xTypeReward = doc.data().TypeReward;
      if(doc.data().TypeReward=="3,000") {
        i = 1;
      } else if(doc.data().TypeReward=="4,000") { 
        i = 2;
      } else if(doc.data().TypeReward=="5,000") { 
        i = 3;
      } else {
        i = 0;
      }
      CheckRank = [i];
      EmpNumber = doc.id;
      xCheck1 = doc.data().Check1;
      str1 += '<div><img src="'+ sessionStorage.getItem("LinePicture") +'" class="add-profile"></div>';
      str1 += '<div class="NameLine" style="color:#fff;">'+ doc.data().EmpName +'</div>';
      $("#MyProfile").html(str1);  
      str += '<div style="margin-top:30px; color:#fff; font-size:13px;">ผลการสุ่มรางวัลของคุณ<br><br>คุณได้รับรางวัลเงินสด<br><b>'+ doc.data().Reward1 +' บาท</b></div>';
      $("#MyRewards").html(str);  
    });
    document.getElementById('loading').style.display='none';
    if(xCheck1==0) {
      document.getElementById('CheckGame').style.display='block';
    } else {
      document.getElementById('CheckEndGame').style.display='block';
    }
  });
}


function UpdateData() {
  NewDate();
  var TimeStampDate = Math.round(Date.now() / 1000);
  var xtext = "";
  if(randItems[CheckRank]==0) {
    xtext = "1,000";
  } else {
    xtext = randItems[CheckRank];
  }
  dbStaff.doc(EidRandom1).update({
    Check1 : 1,
    Reward1 : xtext,
    DateReward1 : dateString
  });

  dbLogRandom.add({
    Game : "Game1",
    LineID : sessionStorage.getItem("LineID"),
    LineName : sessionStorage.getItem("LineName"),
    LinePicture : sessionStorage.getItem("LinePicture"),
    EmpNumber : sessionStorage.getItem("EmpNumber_HR"),
    EmpName : sessionStorage.getItem("EmpName_HR"),
    TypeRandom : sessionStorage.getItem("TypeRandom_HR"),
    Reward1 : xtext,
    Reward1Check : xTypeReward,
    Reward2 : "",
    Reward2Check : "",
    RefID : EidRandom1,
    DateConsend : dateString,
    TimeStamp : TimeStampDate
  });
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
