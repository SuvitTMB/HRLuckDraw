var dateString = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear()+543;
today = dd + '/' + mm + '/' + yyyy;
var CheckFound = 0;
var CheckFoundData = 0;
var NewEmpNumber = "";
var EidEmpNumber = "";

$(document).ready(function () {
/*
  sessionStorage.clear(); 
  var str = "";
  var sLineID = "Ua6b6bf745bd9bfd01a180de1a05c23b3";
  var sLineName = "Website";
  var sLinePicture = "https://profile.line-scdn.net/0hoLlg-mNNMGNRHiaTpMdPNG1bPg4mMDYrKX8qVnIYOgYpe3QwbCp2AXVKaVN_fnMzOC16V3NMagF8";
  sessionStorage.setItem("LineID", sLineID);
  sessionStorage.setItem("LineName", sLineName);
  sessionStorage.setItem("LinePicture", sLinePicture);
  str += '<div><img src="'+ sessionStorage.getItem("LinePicture") +'" class="add-profile"></div>';
  str += '<div class="NameLine">'+ sessionStorage.getItem("LineName")+'</div>';
  $("#MyProfile").html(str);  
  Connect_DB();
  CheckData();
*/
 
  main();
});


async function main() {
  await liff.init({ liffId: "1657509542-bvDgKQpe" });
  document.getElementById("isLoggedIn").append(liff.isLoggedIn());
  if(liff.isLoggedIn()) {
    getUserProfile();
  } else {
    liff.login();
  }
}


async function getUserProfile() {
  var str = "";
  const profile = await liff.getProfile();
  sessionStorage.setItem("LineID", profile.userId);
  sessionStorage.setItem("LineName", profile.displayName);
  sessionStorage.setItem("LinePicture", profile.pictureUrl);
  str += '<div><img src="'+ sessionStorage.getItem("LinePicture") +'" class="add-profile"></div>';
  str += '<div class="NameLine">'+ sessionStorage.getItem("LineName")+'</div>';
  $("#MyProfile").html(str);  
  Connect_DB();
  CheckData();
}


function openWindow() {
  liff.openWindow({
    url: "https://line.me",
    external: true     
  })
}


function CheckData() {
  dbStaff.where('LineID','==',sessionStorage.getItem("LineID"))
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
        CheckFoundData = 1;
        EidProfile = doc.id;
        sessionStorage.setItem("StaffRefID", doc.id);
        document.getElementById('loading').style.display='none';
        if(doc.data().Confirm==1) {
          sessionStorage.setItem("EmpNumber_HR", doc.data().EmpNumber);
          sessionStorage.setItem("EmpName_HR", doc.data().EmpName);
          sessionStorage.setItem("TypeRandom_HR", doc.data().TypeRandom);
          sessionStorage.setItem("DateConsend", doc.data().DateConsend);
          document.getElementById('DoneRegister').style.display='block';
          AddLogCheckin(1);
          timerId = setInterval(GotoLogin, 4000); 
        } else {
          document.getElementById('DoneRegister').style.display='block';
        }
    });
    if(CheckFoundData==0) {
        document.getElementById('loading').style.display='none';
        document.getElementById('NotRegister').style.display='block';
    }
  });
}


function CheckProfile() {
  var str = "";
  var CheckRegister = "";
  var CheckLineID = "";
  var CheckFountEmpNumber = 0;
  NewEmpNumber = "";
  txtEmpNumber = document.getElementById("txtEmpNumber").value;
  NewEmpNumber = "ttb"+txtEmpNumber.slice(2, 11);
  dbStaff.where('EmpNumber','==',NewEmpNumber)
  .limit(1)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      CheckFountEmpNumber = 1;
      EidEmpNumber = doc.id;
      if(doc.data().LineID=="") {
        sessionStorage.setItem("EmpName_HR", doc.data().EmpName);
        sessionStorage.setItem("TypeRandom_HR", doc.data().TypeRandom);
        sessionStorage.setItem("StaffRefID", doc.id);
        str += '<div style="margin-top:35px;"><img src="'+ sessionStorage.getItem("LinePicture") +'" class="add-profile"></div>';
        str += '<div style="font-weight:600; color:#ffff00; font-size:14px;margin-top:12px;">'+ doc.data().EmpName +'</div>';
        str += '<div class="btn-t33" style="margin-top:20px;">บันทึกข้อตกลงการเข้าร่วมกิจกรรม<br><b>อั่งเปาโชคสองชั้น กับ ทีทีบี</b></div>';
        str += '<div style="font-size:13px; text-align:left;margin-top:15px;"><b><u>เกี่ยวกับโครงการอั่งเปาโชคสองชั้น กับ ทีทีบี</u></b><br>โครงการพิเศษเพื่อมองรางวัลให้แก่พนักงานสัญญาจ้างภายนอก ซึ่งถือเป็นเพื่อนร่วมทางของพวกเราชาวทีทีบี ที่ช่วยสนับสนุนให้พวกเราทำงานได้อย่างราบรื่นและประสบความสำเร็จ</div>';
        str += '<div style="text-align:left; font-size:13px;">';
        str += '<div style="font-size:13px; margin-top:20px;"><b><u>คุณสมบัติผู้เข้าร่วมโครงการ</u></b><br><ul><li>พนักงานสัญญาจ้างภายนอก ที่มีอายุงานครบ 1 ปีต่อเนื่องขึ้นไป ณ วันที่ 31 ธันวาคม 2566  (เข้างานก่อนหรือในวันที่ 1 มกราคม 2566)</li><li>มีสถานะเป็น พนักงานสัญญาจ้างภายนอก ของทีทีบี ณ วันที่มอบรางวัล</li></ul></div>';
        str += '<div style="font-size:13px;"><br><b><u>วัตถุประสงค์โครงการ</u></b><br>โครงการ อั่งเปาโชค 2 ชั้นจากทีทีบีจัดทำขึ้น เพื่อให้สิทธิแก่ พนักงานสัญญาจ้างภายนอก ของทีทีบี ได้ร่วมในการสุ่มรับรางวัล ตามหลักเกณฑ์และเงื่อนไขที่ธนาคารกำหนด</div>';
        str += '<div style="font-size:13px;><br><br><b><u>อั่งเปาโชคสองชั้น</u></b></div>';
        str += '<div style="font-size:13px;"><ul><li><u>โชคชั้นที่ 1</u> ลุ้นรับเงินสดมูลค่า 1,000 - 5,000 บาท</li><li><u>โชคชั้นที่ 2</u> ลุ้นรับของรางวัลใหญ่ 3 รางวัล<br>+ รางวัลที่ 1 จักรยานยนต์ Honda Scoopy Max Club12 จำนวน 1 รางวัล<br>+ รางวัลที่ 2 ทองคำหนัก 1 บาท จำนวน 1 รางวัล<br>+ รางวัลที่ 3   โทรศัพท์มือถือ จำนวน 1 รางวัล</li></ul></div>';
        str += '<div style="width:100%; float: left;font-size: 13px; color:#fff;line-height: 1.3;"><br><b><u>อั่งเปาโชคสองชั้น</u></b><br>ผู้เข้าร่วมกิจกรรมสามารถทำการเลือก "คลิกสุ่มรับโชค" ระบบจะทำการสุ่มเลือกของรางวัล ซึ่งจะมีทั้งผู้ที่ได้รับรางวัล และไม่ได้รับรางวัล<br><br>';
        str += '<br><u><b>การสุ่มเลือก</b></u><br>ขึ้นอยู่กับการสุ่มเลือกรางวัลจากระบบ';
        str += '<br><br><b><u>ระยะเวลาการร่วมกิจกรรม</u></b><br>ระหว่างวันที่ 23 ก.พ. 67 เวลา 9:00 น. 26 ก.พ. 2567 เวลา 17.00 น. เท่านั้น';
        str += '<br><br><b><u>การมอบรางวัล</u></b><ul style="margin-left:-20px;"><li>สำหรับโชคชั้นที่ 1  ท่านจะได้รับ<u>รางวัลเงินสด</u> เข้าบัญชีที่ท่านรับเงินเดือน ในวันที่ 29 กุมภาพันธ์ 2567 (จ่าย 1 รอบ)</li><li>สำหรับโชคชั้นที่ 2 ทรัพยากรบุคคลจะติดต่อผู้โชคดีที่ได้<u>รับรางวัลใหญ่ 3 รางวัล</u> ภายใน 8 มีนาคม 2567</li></ul>';
        str += '<div class="row-font clr"><div class="header-font" style="color:#ffff00;">ยืนยันการทำรายการของคุณ<br>(ทำเครื่องหมายที่ปุ่ม Checkbox)</div>';
        str += '<div class="input-group"><input type="checkbox" id="txtEmpAccept" onclick="CheckButtomClick()"/>';
        str += '<label for="txtEmpAccept"><ul style="font-size: 13px; text-align:left;">';
        str += '<li>ข้าพเจ้ารับทราบและตกลงยินยอมให้ธนาคารเก็บรวบรวม ใช้ หรือเปิดเผยข้อมูลส่วนบุคคลของข้าพเจ้าที่ได้ให้ไว้ เพื่อดำเนินการตามวัตถุประสงค์ของโครงการ อั่งเปาโชค 2 ชั้นจากทีทีบี และยอมรับหลักเกณฑ์ที่ธนาคารกำหนดไว้ทั้งหมด</li>';
        str += '<li>ผู้มีคุณสมบัติเข้าร่วมโครงการใช้สิทธิ์ได้ 1 ครั้ง โดยใช้ข้อมูลของตนเองเท่านั้น ธนาคารสงวนสิทธิ์ในการยกเลิกรางวัลหากพบการปฏิบัติไม่เป็นไปตามที่กำหนด</li><li>ธนาคารสงวนสิทธิ์ในการกำหนด เปลี่ยนแปลง หรือยกเลิกหลักเกณฑ์ใด ๆ ตามความเหมาะสม และการตัดสินใจของธนาคารถือเป็นที่สุด</li></ul>';
        str += '<div id="SubmitApp" class="btn btn-primary btn-lg disabledbutton" onclick="ConfirmRegister()" style="margin-left:20px;margin-top:25px;background:#28a745; border:2px solid #fff; font-size:13px; margin-right:5px;">ยืนยันลงทะเบียน</div>';
        str += '<div id="overlay" class="btn btn-primary btn-lg" onclick="CloseAll()" style="margin-top:25px; background:#6c757d; border:2px solid #fff; font-size:13px;">ยกเลิกรายการ</div>';
        str += '</div>';
        $("#MyEmpNumber").html(str);  
      } else {
        str += '<div style="margin-top:35px;"><img src="'+ sessionStorage.getItem("LinePicture") +'" class="add-profile"></div>';
        str += '<div class="NameLine" style="color:#ffff00;">'+ sessionStorage.getItem("LineName")+'</div>';
        str += '<div style="margin-top:20px; font-size:13px; padding:20px 10px; max-width:350px; width:100%; max-width:350px; width:95%; background:#f68b1f; color:#fff; border-radius: 10px;">';
        str += '<div><img src="./img/icons-warning.png" style="width:80px;"></div>';
        str += '<div style="margin-top:12px;">เราตรวจสอบแล้วพบว่า<br>รหัสผ่านนี้มีผู้นำมาเปิดใช้งานแล้ว<br>กรุณากรอกรหัสใหม่อีกครั้ง</div>';
        str += '<div id="overlay" class="btn btn-primary btn-lg" onclick="CloseAll()" style="margin-top:15px; background: #6c82ac; border:2px solid #fff; font-size:13px; padding:10px 40px; font-weight: 600;">ลงทะเบียนใหม่อีกครั้ง</div>';
        $("#MyEmpNumber").html(str);  
      }
    });
    if(CheckFountEmpNumber==0) {
      str += '<div style="margin-top:35px;"><img src="'+ sessionStorage.getItem("LinePicture") +'" class="add-profile"></div>';
      str += '<div class="NameLine">'+ sessionStorage.getItem("LineName")+'</div>';
      str += '<div style="margin-top:20px; font-size:13px; padding:20px 25px; max-width:350px; width:95%; background:#ff0000; color:#fff; border-radius: 10px;">';
      str += '<div><img src="./img/icons-warning.png" style="width:80px;"></div>';
      str += '<div style="margin-top:12px;">เราไม่พบรหัสผ่าน<br>สำหรับการเข้าร่วมกิจกรรมของคุณ<br>กรุณากรอกรหัสใหม่อีกครั้ง</div>';
      str += '<div id="overlay" class="btn btn-primary btn-lg" onclick="CloseAll()" style="margin-top:15px; background: #6c82ac; border:2px solid #fff; font-size:13px; padding:10px 40px; font-weight: 600;">ลงทะเบียนใหม่อีกครั้ง</div>';
      $("#MyEmpNumber").html(str);  
    }
    document.getElementById('loading1').style.display='none';
  });
  document.getElementById('id01').style.display='block';
}


function ConfirmRegister() {
  var str = "";
  //document.getElementById("txtEmpAccept").value;
  var xtxtEmpAccept = $('#txtEmpAccept').is(':checked')
  if(xtxtEmpAccept == true) { 
    UpdateData();
/*  Save data */
    //alert("NewEmpNumber="+NewEmpNumber);
    sessionStorage.setItem("EmpNumber_HR", NewEmpNumber);
    //sessionStorage.setItem("EmpNumber", profile.displayName);
    //str += '<div style="margin-top:35px;"><img src="'+ sessionStorage.getItem("LinePicture") +'" class="add-profile"></div>';
    //str += '<div class="NameLine">'+ sessionStorage.getItem("LineName")+'</div>';
    str += '<div style="margin-top:20px; font-size:13px; padding:20px 5px; max-width:350px; width:100%; background:#0056ff; color:#fff; border-radius: 10px;">';
    str += '<div style="margin-top:15px;"><img src="'+ sessionStorage.getItem("LinePicture") +'" class="add-profile"></div>';
    str += '<div class="NameLine" style="color:#ffff00;">'+ sessionStorage.getItem("EmpName_HR")+'</div>';
    //str += '<div><img src="./img/icons-confirm.png" style="width:80px;"></div>';
    str += '<div style="margin-top:20px;text-align:left;"><font color="#ffff00"><b>คุณ'+ sessionStorage.getItem("EmpName_HR")+'</b> ได้รับสิทธิจับฉลากอั่งเปาโชค 2 ชั้น อย่างละ 1 สิทธิ ระหว่างวันที่ 23 ก.พ. 67 เวลา 9:00 น. 26 ก.พ. 2567 เวลา 17.00 น. เท่านั้น</font><br><br>ธนาคารสงวนสิทธิ์ในการกำหนด เปลี่ยนแปลง หรือยกเลิกหลักเกณฑ์ใด ๆ ตามความเหมาะสม และการตัดสินใจของธนาคารถือเป็นที่สุด</div>';
    str += '<div id="loading2" style="display:block;"><img src="./img/loading1.gif" style="width:50px;margin-top:10px;"></div>';
    str += '<div id="overlay" class="btn btn-primary btn-lg" onclick="GotoHome()" style="margin-top:20px; width:200px; font-size: 13px; background:#28a745; border:2px solid #fff;display:none;">รับทราบ ---> ไปลุ้นโชคกัน</div>';
    $("#MyEmpNumber").html(str);  
    document.getElementById('id01').style.display='block';
    //alert("User Confirm Register = "+xtxtEmpAccept);
  }
}

function UpdateData() {
  NewDate();
  dbStaff.doc(EidEmpNumber).update({
    LineID : sessionStorage.getItem("LineID"),
    LineName : sessionStorage.getItem("LineName"),
    LinePicture : sessionStorage.getItem("LinePicture"),
    Confirm : 1,
    DateConsend : dateString
  });
  AddLogCheckin(0);
  timerId = setInterval(GotoLogin, 4000); 
}



function GotoHome() {
  location.href = "home.html";
}


function GotoLogin() {
  clearTimeout(timerId);
  document.getElementById('loading2').style.display='none';
  document.getElementById('overlay').style.display='block';
}



function CheckButtomClick() {
  if($('#txtEmpAccept').is(':checked')) {
    $('#SubmitApp').removeClass('disabledbutton');
  } else {
    var element = document.getElementById("SubmitApp");
    element.classList.add("disabledbutton");
  }
}


function edValueKeyPress()
{
    var xCheck = 13;
    var edValue = document.getElementById("txtEmpNumber");
    var s = edValue.value;
    var lblValue = document.getElementById("lblValue");
    //lblValue.innerText = "ต้องคีย์อีก : "+s+" --- "+s.length;
    if(s.length>=13) {
      lblValue.innerText = "";
      document.getElementById('KeyRegister').style.display='block';
    } else {
      lblValue.innerText = "ต้องคีย์อีก : "+(xCheck-s.length)+ " ตัวอักษร";
      document.getElementById('KeyRegister').style.display='none';
    }
}


var gcheck = 0;
function CheckRewards() {
  //console.log(sessionStorage.getItem("EmpID_Moon2023"));
  dbGiftRewards.where('EmpID','==',sessionStorage.getItem("EmpID_Moon2023"))
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      gcheck = 1;
      document.getElementById('loading').style.display='none';
      document.getElementById('OldSurvey').style.display='none';
      document.getElementById('ShowRewards').style.display='block';
    });
    if(gcheck==0) {
      document.getElementById('loading').style.display='none';
      document.getElementById('OldSurvey').style.display='block';
      document.getElementById('ShowRewards').style.display='none';
    }
  });
}


function AddLogCheckin(x) {
  NewDate();
  var TimeStampDate = Math.round(Date.now() / 1000);
  if(x==1) {
    dbLogCheckin.add({
      LineID : sessionStorage.getItem("LineID"),
      LineName : sessionStorage.getItem("LineName"),
      LinePicture : sessionStorage.getItem("LinePicture"),
      StatusUser : "Old",
      RefID : sessionStorage.getItem("StaffRefID"),
      EmpIDCard : document.getElementById("txtEmpNumber").value,
      EmpNumber : sessionStorage.getItem("EmpNumber_HR"),
      EmpName : sessionStorage.getItem("EmpName_HR"),
      TypeRandom : sessionStorage.getItem("TypeRandom_HR"),
      DateConsend : dateString,
      TimeStamp : TimeStampDate
    });
  } else {
    dbLogCheckin.add({
      LineID : sessionStorage.getItem("LineID"),
      LineName : sessionStorage.getItem("LineName"),
      LinePicture : sessionStorage.getItem("LinePicture"),
      StatusUser : "New",
      RefID : "",
      EmpIDCard : document.getElementById("txtEmpNumber").value,
      EmpNumber : sessionStorage.getItem("EmpNumber_HR"),
      EmpName : sessionStorage.getItem("EmpName_HR"),
      TypeRandom : sessionStorage.getItem("TypeRandom_HR"),
      DateConsend : dateString,
      TimeStamp : TimeStampDate
    });
  }
}



function ClickAddLog() {
  NewDate();
  var TimeStampDate = Math.round(Date.now() / 1000);
  dbLogCheckin.add({
    LineID : sessionStorage.getItem("LineID"),
    LineName : sessionStorage.getItem("LineName"),
    LinePicture : sessionStorage.getItem("LinePicture"),
    StatusUser : "Old",
    RefID : sessionStorage.getItem("StaffRefID"),
    EmpIDCard : document.getElementById("txtEmpNumber").value,
    EmpNumber : sessionStorage.getItem("EmpNumber_HR"),
    EmpName : sessionStorage.getItem("EmpName_HR"),
    TypeRandom : sessionStorage.getItem("TypeRandom_HR"),
    DateConsend : dateString,
    TimeStamp : TimeStampDate
  });
  GotoHome();
}


function CloseAll() {
  var str = "";
  $("#MyEmpNumber").html(str);  
  document.getElementById("MyEmpNumber").value = "";
  document.getElementById("txtEmpNumber").value = "";
  document.getElementById('KeyRegister').style.display='none';
  document.getElementById('id01').style.display='none';
}
