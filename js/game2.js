var dateString = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear()+543;
today = dd + '/' + mm + '/' + yyyy;
var cleararray = "";
var randomDegree = 0;
var xGroupGift = 0;
var Eid = "";
var CountTicket = 0;
var timerId = "";
var EidRandom2 = "";

$(document).ready(function () {
  if(sessionStorage.getItem("EmpNumber_HR")==null) { location.href = "index.html"; }
  Connect_DB();
  CheckData();
});


function CheckData() {
  CheckTicket();
  var str = "";
  console.log("TypeRandom="+sessionStorage.getItem("EmpNumber_HR"));
  console.log("TypeRandom="+sessionStorage.getItem("TypeRandom_HR"));
  /*
  var str1 = "";
  str1 += '<div><img src="'+ sessionStorage.getItem("LinePicture") +'" class="add-profile"></div>';
  str1 += '<div class="NameLine" style="color:#fff;">'+ sessionStorage.getItem("EmpName_HR") +'</div>';
  $("#MyProfile").html(str1);  
  console.log(str1);
  */
  gcheck = 0;
  dbReward.where('EmpNumber','==',sessionStorage.getItem("EmpNumber_HR"))
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      gcheck = 1;
      //console.log("Found : "+gcheck+" --- "+ doc.data().TypeName+" --- "+ doc.data().giftname );
      document.getElementById('loading').style.display='none';
      document.getElementById('ShowWheel1').style.display='block';
      str += '<center>';
      if(doc.data().TypeName=="ไม่ได้รางวัล") {
        str += '<div style="margin:50px auto 10px auto;"><img src="./img/gift-99.png" style="width:220px;"/></div>';
        str += '<div class="boxtext" style="margin-top:10px;"><b>เสียใจด้วยน้า</b><br>คุณไม่ได้รับโชคชั้นที่ 2 จากเรา<div style="font-size:11px;">Date : '+ doc.data().DateRegister +'</div></div>';
      } else {
        str += '<div style="margin:50px auto 10px auto;"><img src="./img/'+ doc.data().TypeRandom +'.png"" style="width:200px;"/></div>';
        str += '<div class="boxtext" style="margin-top:30px;">ยินดีด้วยคุณได้รับรางวัล<br><b>'+ doc.data().TypeName +'</b><br>ทรัพยากรบุคคล จะทำการตรวจสอบความถูกต้อง และจะติดต่อผู้โชคดีที่ได้รับรางวัลใหญ่ 3 รางวัล ภายใน 8 มีนาคม 2567<br><div style="font-size:11px;">Date : '+ doc.data().DateRegister +'</div></div>';
      }
      str += '</center>';
      $("#DisplayGift").html(str);
    });
    if(gcheck==0) {
      if(CountTicket!=0) {
        document.getElementById('loading').style.display='none';
        //document.getElementById('id01').style.display='block';
        document.getElementById('StartGame').style.display='block';      
      }
    }
  });
}


var timerId = "";
function CheckRandom() {
  document.getElementById('StartGame').style.display='none';
  document.getElementById('RandomNow').style.display='block';
  timerId = setInterval(RandomRewards, 4000); 
}


var ArrRewards = [];
var NewRewards = "";
//var XCheckRewards = 0;
function RandomRewards() { 
  //alert('Random');
  clearTimeout(timerId);
  document.getElementById('RandomNow').style.display='none';
  document.getElementById('id02').style.display='block';
  //ReCheckUser();
  var i = 0;
  Eidewards = "";
  dbReward.where('TypeRandom','==',sessionStorage.getItem("TypeRandom_HR"))
  .where('LineID','==','')
  .get().then((snapshot)=> {
    snapshot.forEach(doc=>{
      ArrRewards.push([doc.id, doc.data().giftname, doc.data().TypeName ]);
    });
    console.log("จำนวนที่สุ่ม = "+ArrRewards.length);
    NewRewards = random_item(ArrRewards);
    Eid = NewRewards[0];
    //console.log("Random="+NewRewards[1]+" Code="+NewRewards[2]);
    SaveReward();
    //ReCheckUser();
  });  
}


function CheckTicket() { 
  dbReward.where('RefID','==',"")
  .get().then((snapshot)=> {
    snapshot.forEach(doc=>{
      CountTicket++;
    });
    if(CountTicket==0) {
      alert("ขณะนี้ซองอั่งเปาหมดแล้ว\nขอบคุณสำหรับการเข้าร่วมกิจกรรม");
      GotoHome();
    }
    //console.log("ตั๋วเหลืออีก ="+CountTicket);
  });  
}


function ReCheckUser() { 
  //document.getElementById('ShowWheel1').style.display='block';
  dbStaff.where('EmpNumber','==',sessionStorage.getItem("EmpNumber_HR"))
  .limit(1)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=>{
      document.getElementById('id04').style.display='block';
      //OpenReload();
      //alert("คุณได้ทำการสุ่มเลือกไปแล้ว\nไม่สามารถสุ่มได้อีก");
      //location.href = "game.html";
    });
    GetCodeRandom(NewRewards[0], NewRewards[1], NewRewards[2]);
  });  
}


function SaveReward() {
  var str = "";
  var str0 = "";

  NewDate();
  var TimeStampDate = Math.round(Date.now() / 1000);
  dbReward.doc(Eid).update({
    LineID : sessionStorage.getItem("LineID"),
    LineName : sessionStorage.getItem("LineName"),
    LinePicture : sessionStorage.getItem("LinePicture"),
    EmpNumber : sessionStorage.getItem("EmpNumber_HR"),
    EmpName : sessionStorage.getItem("EmpName_HR"),
    RefID : sessionStorage.getItem("StaffRefID"),
    //Phone : sessionStorage.getItem("EmpPhone"),
    //address : sessionStorage.getItem("EmpAddress"),
    //ResultQuiz : NewRewards[2],
    //StatusSend : 1,
    DateRegister : dateString,
    TimeStamp : TimeStampDate
  });

  dbStaff.doc(sessionStorage.getItem("StaffRefID")).update({
    Check2 : 1,
    RefID : Eid,
    Reward2 : NewRewards[2],
    DateReward2 : dateString
  });

//sessionStorage.getItem("StaffRefID")
  //var myTimeout = setTimeout(ShowRewards, 2000);

  //document.getElementById('id02').style.display='block';
  console.log("xGroupGift="+NewRewards[2]+"==="+NewRewards[1]);
  if(NewRewards[2]=='ไม่ได้รางวัล') {
    str += '<div style="margin:50px auto 0px auto;"><img src="./img/gift-99.png" style="width:220px;"/></div>';
    str += '<center><div class="boxtext"><b>เสียใจด้วย<br>คุณไม่ได้รับโชคชั้นที่ 2 จากเรา</b><br><div style="font-size:11px; margin-top:4px;">'+ dateString +'</div></div></center>';        
    str0 += '<div class="btn-1" style="margin-top:25px; margin-bottom: 15px;">ผลการสุ่มเลือกผู้รับโชค</div>';
    str0 += '<div style="margin:20px auto 0px auto;"><img src="./img/gift-99.png" style="width:260px;"/></div>';
    str0 += '<center><div class="boxtext"><b>คุณไม่ได้รับรางวัล</b><br>'+ dateString +'</div></center>';
  } else {
    //str += '<div style="margin:30px auto 0px auto;"><img src="./img/gift-99.png" style="width:260px;"/></div>';
    str += '<div style="margin:50px auto 12px auto;"><center><img src="./img/'+ NewRewards[2] +'.png" style="position: relative; width:220px;right: 0%;"></center></div>';
    str += '<center><div class="boxtext">ยินดีด้วย ... คุณได้รับรางวัล<br><b>'+  NewRewards[2] +'</b><br>ทรัพยากรบุคคล จะทำการตรวจสอบความถูกต้อง และจะติดต่อผู้โชคดีที่ได้รับรางวัลใหญ่ 3 รางวัล ภายใน 8 มีนาคม 2567<br><div style="font-size:11px; margin-top:4px;">'+ dateString +'</div></div></center>';
    str0 += '<div class="btn-1" style="margin-top:25px; margin-bottom: 15px;">ผลการหมุนรางวัล</div>';
    str0 += '<div style="margin:20px auto -10px auto;"><img src="./img/gift-99.gif" style="width:260px;"/></div>';
    str0 += '<center><div class="boxtext"><b>ยินดีด้วย ... คุณได้รับรางวัล</b><br>กดปิดหน้าต่างเพื่อดูรางวัลของคุณ<br>'+ dateString +'</div></center>';
  }
  $("#DisplayGift").html(str);
  //$("#DisplayGiftRewards").html(str0);
  document.getElementById('ShowWheel1').style.display='block';
}


function GetCodeRandom(id,x,y) {
  console.log("Random name gift = "+ y +" ("+ x +") -->"+ id);

}


function random_item(items) {
  return items[Math.floor(Math.random()*items.length)];   
  SaveReward();
}


function Opengift() {
  document.getElementById('id03').style.display='block';
}

/*
function Song1() {
  CloseVDO();
  var vid = document.getElementById("myaudio1");
  vid.autoplay = true;
  vid.load();
  document.getElementById('id01').style.display='none';
}


function CloseVDO() {
  var video1 = document.querySelector("#myaudio1");
  video1.pause();
  video1.currentTime = 0;
}
*/

function OpenReload() {
  location.href = "game.html";
  //document.getElementById('id04').style.display='none';
  //CheckData();
  //location.href = "game.html";
}


function GotoHome() {
  location.href = "home.html";
}
/*
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
*/

function CloseAll() {
  //document.getElementById('id01').style.display='none';
  document.getElementById('id02').style.display='none';
  document.getElementById('id03').style.display='none';
  document.getElementById('id04').style.display='none';
}


