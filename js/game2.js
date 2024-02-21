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
  //console.log("TypeRandom="+sessionStorage.getItem("EmpNumber_HR"));
  //console.log("TypeRandom="+sessionStorage.getItem("TypeRandom_HR"));
  gcheck = 0;
  dbReward.where('EmpNumber','==',sessionStorage.getItem("EmpNumber_HR"))
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      gcheck = 1;
      EidRandom2 = doc.id;
      console.log("Found : "+gcheck+" --- "+ doc.data().TypeName+" --- "+ doc.data().giftname );
      document.getElementById('loading').style.display='none';
      document.getElementById('ShowWheel1').style.display='block';
      str += '<center>';
      if(doc.data().TypeName=="Moblie" || doc.data().TypeName=="Gold" || doc.data().TypeName=="Motorcycle") {
        str += '<div style="margin:10px auto 10px auto;"><img src="./img/'+ doc.data().TypeRandom +'.png"" style="width:95%;"/></div>';
        str += '<div class="boxtext" style="margin:20px auto;">ขอแสดงความยินดีกับ<br><b>คุณ'+ doc.data().EmpName +'</b><br>คุณได้รับรางวัล<br><b>'+ doc.data().TypeName +'</b><br><br>ทรัพยากรบุคคล จะทำการตรวจสอบความถูกต้อง และจะติดต่อผู้โชคดีที่ได้รับรางวัล ภายใน 8 มีนาคม 2567<br><div style="font-size:11px;">Date : '+ doc.data().DateRegister +'</div></div>';
      } else {
        str += '<div style="margin:50px auto 10px auto;"><img src="./img/gift-99.png" style="width:220px;"/></div>';
        str += '<div class="boxtext" style="margin-top:10px;"><b>เสียใจด้วยน้า</b><br>คุณไม่ได้รับโชคชั้นที่ 2 จากเรา<div style="font-size:11px;">Date : '+ doc.data().DateRegister +'</div></div>';
      }
      str += '</center>';
      $("#DisplayGift").html(str);
    });
    if(gcheck==0) {
      if(CountTicket!=0) {
        document.getElementById('loading').style.display='none';
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
function RandomRewards() { 
  clearTimeout(timerId);
  document.getElementById('RandomNow').style.display='none';
  document.getElementById('id02').style.display='block';
  var i = 0;
  Eidewards = "";
  dbReward.where('TypeRandom','==',sessionStorage.getItem("TypeRandom_HR"))
  .where('LineID','==','')
  .get().then((snapshot)=> {
    snapshot.forEach(doc=>{
      ArrRewards.push([doc.id, doc.data().TypeRandom, doc.data().TypeName ]);
    });
    console.log("จำนวนที่สุ่ม = "+ArrRewards.length);
    NewRewards = random_item(ArrRewards);
    Eid = NewRewards[0];
    SaveReward();
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
  });  
}


function ReCheckUser() { 
  dbStaff.where('EmpNumber','==',sessionStorage.getItem("EmpNumber_HR"))
  .limit(1)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=>{
      document.getElementById('id04').style.display='block';
    });
    GetCodeRandom(NewRewards[0], NewRewards[1], NewRewards[2]);
  });  
}


function SaveReward() {
  NewDate();
  var TimeStampDate = Math.round(Date.now() / 1000);
  var str = "";
  var str0 = "";

  dbReward.doc(Eid).update({
    LineID : sessionStorage.getItem("LineID"),
    LineName : sessionStorage.getItem("LineName"),
    LinePicture : sessionStorage.getItem("LinePicture"),
    EmpNumber : sessionStorage.getItem("EmpNumber_HR"),
    EmpName : sessionStorage.getItem("EmpName_HR"),
    RefID : sessionStorage.getItem("StaffRefID"),
    DateRegister : dateString,
    TimeStamp : TimeStampDate
  });

  dbStaff.doc(sessionStorage.getItem("StaffRefID")).update({
    Check2 : 1,
    RefID : Eid,
    Reward2 : NewRewards[2],
    DateReward2 : dateString
  });

  dbLogRandom.add({
    Game : "Game2",
    LineID : sessionStorage.getItem("LineID"),
    LineName : sessionStorage.getItem("LineName"),
    LinePicture : sessionStorage.getItem("LinePicture"),
    EmpNumber : sessionStorage.getItem("EmpNumber_HR"),
    EmpName : sessionStorage.getItem("EmpName_HR"),
    TypeRandom : sessionStorage.getItem("TypeRandom_HR"),
    Reward1 : "",
    Reward1Check : "",
    Reward2 : NewRewards[2],
    Reward2Check : NewRewards[1],
    RefID : sessionStorage.getItem("StaffRefID"),
    DateConsend : dateString,
    TimeStamp : TimeStampDate
  });

  console.log("xGroupGift="+NewRewards[2]+"==="+NewRewards[1]);
  if(NewRewards[2]=='ไม่ได้รางวัล' || NewRewards[2]==0) {
    str += '<div style="margin:50px auto 0px auto;"><img src="./img/gift-99.png" style="width:220px;"/></div>';
    str += '<center><div class="boxtext"><b>เสียใจด้วย<br>คุณไม่ได้รับโชคชั้นที่ 2 จากเรา</b><br><div style="font-size:11px; margin-top:4px;">'+ dateString +'</div></div></center>';        
    str0 += '<div class="btn-1" style="margin-top:25px; margin-bottom: 15px;">ผลการสุ่มเลือกผู้รับโชค</div>';
    str0 += '<div style="margin:20px auto 0px auto;"><img src="./img/gift-99.png" style="width:260px;"/></div>';
    str0 += '<center><div class="boxtext"><b>คุณไม่ได้รับรางวัล</b><br>'+ dateString +'</div></center>';
  } else if(NewRewards[2]=='โทรศัพท์มือถือ' || NewRewards[2]=='สร้อยคอทองคำหนัก 1 บาท' || NewRewards[2]=='จักรยานยนต์ Honda') {
  //} else {
    //str += '<div style="margin:30px auto 0px auto;"><img src="./img/gift-99.png" style="width:260px;"/></div>';
    str += '<div style="margin:10px auto 12px auto;"><center><img src="./img/'+ NewRewards[1] +'.png" style="position: relative; width:95%;right: 0%;"></center></div>';
    str += '<div class="boxtext" style="margin:20px auto;">ขอแสดงความยินดีกับ<br><b>คุณ'+ sessionStorage.getItem("EmpName_HR") +'</b><br>คุณได้สิทธิ์ลุ้นรางวัล<br><b>'+ NewRewards[2] +'</b><br><br>ทรัพยากรบุคคล จะทำการตรวจสอบความถูกต้อง และประกาศรายชื่อผู้โชคดีที่ได้รับรางวัล ภายใน 8 มีนาคม 2567<br><div style="font-size:11px;">Date : '+ dateString +'</div></div>';
    //str += '<center><div class="boxtext">ยินดีด้วย ... คุณได้รับรางวัล<br><b>'+  NewRewards[2] +'</b><br>ทรัพยากรบุคคล จะทำการตรวจสอบความถูกต้อง และจะติดต่อผู้โชคดีที่ได้รับรางวัลใหญ่ 3 รางวัล ภายใน 8 มีนาคม 2567<br><div style="font-size:11px; margin-top:4px;">'+ dateString +'</div></div></center>';
    str0 += '<div class="btn-1" style="margin-top:25px; margin-bottom: 15px;">ผลการหมุนรางวัล</div>';
    str0 += '<div style="margin:20px auto -10px auto;"><img src="./img/gift-99.gif" style="width:260px;"/></div>';
    str0 += '<center><div class="boxtext"><b>ยินดีด้วยคุณได้รับสิทธิ์ลุ้นรางวัล</b><br>กดปิดหน้าต่างเพื่อดูรางวัลของคุณ<br>'+ dateString +'</div></center>';

  } else {
    str += '<div style="margin:50px auto 0px auto;"><img src="./img/gift-99.png" style="width:220px;"/></div>';
    str += '<center><div class="boxtext"><b>เสียใจด้วย<br>คุณไม่ได้รับโชคชั้นที่ 2 จากเรา</b><br><div style="font-size:11px; margin-top:4px;">'+ dateString +'</div></div></center>';        
    str0 += '<div class="btn-1" style="margin-top:25px; margin-bottom: 15px;">ผลการสุ่มเลือกผู้รับโชค</div>';
    str0 += '<div style="margin:20px auto 0px auto;"><img src="./img/gift-99.png" style="width:260px;"/></div>';
    str0 += '<center><div class="boxtext"><b>คุณไม่ได้รับรางวัล</b><br>'+ dateString +'</div></center>';

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


function OpenReload() {
  location.href = "game.html";
}


function GotoHome() {
  location.href = "home.html";
}


function CloseAll() {
  document.getElementById('id02').style.display='none';
  document.getElementById('id03').style.display='none';
  document.getElementById('id04').style.display='none';
}


