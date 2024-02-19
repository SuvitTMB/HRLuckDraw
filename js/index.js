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
        //CheckRegister = doc.data().DateRegister;
        //CheckLineID = doc.data().LineID;
        //sessionStorage.setItem("EmpNumber_HR", doc.data().EmpNumber);
        document.getElementById('loading').style.display='none';
        if(doc.data().Confirm==1) {
          sessionStorage.setItem("EmpNumber_HR", doc.data().EmpNumber);
          sessionStorage.setItem("EmpName_HR", doc.data().EmpName);
          sessionStorage.setItem("TypeRandom_HR", doc.data().TypeRandom);
          sessionStorage.setItem("DateConsend", doc.data().DateConsend);

          document.getElementById('DoneRegister').style.display='block';
        } else {
          //sessionStorage.setItem("EmpNumber_HR", doc.data().EmpNumber);
          //sessionStorage.setItem("EmpName_HR", doc.data().EmpName);
          //sessionStorage.setItem("TypeRandom_HR", doc.data().TypeRandom);
          document.getElementById('DoneRegister').style.display='block';
          //CheckProfile();
          //document.getElementById('DoneRegister').style.display='block';

          //alert("คุณยังไม่ได้");
          //document.getElementById('DoneRegister').style.display='block';


          //EditConsend();


          //CheckProfile();
          //document.getElementById('NotRegister').style.display='block';
        }
        //sessionStorage.setItem("EmpName_Moon2023", doc.data().empName);
        //sessionStorage.setItem("EmpRefID", doc.id);
        //sessionStorage.setItem("EmpPhone", doc.data().empPhone);
        //sessionStorage.setItem("EmpAddress", doc.data().empAddress);
        //dbProfile.doc(sessionStorage.getItem("EmpRefID")).update({
        //  linename : sessionStorage.getItem("LineName"),
        //  empPicture : sessionStorage.getItem("LinePicture")
        //});
        //document.getElementById('loading').style.display='none';
        //document.getElementById('OldSurvey').style.display='block';
        //CheckRewards();
      //} else if(doc.data().statusconfirm==2) {
      //CheckRewards();
      //document.getElementById('loading').style.display='none';
      //document.getElementById('OldSurvey').style.display='block';
    });
    if(CheckFoundData==0) {
        document.getElementById('loading').style.display='none';
        document.getElementById('NotRegister').style.display='block';
    }
    //if(CheckFoundData==0) {
    //  document.getElementById('loading').style.display='none';
    //  document.getElementById('NoService').style.display='none';
    //  document.getElementById('NewMember').style.display='block';
      //location.href = "https://liff.line.me/1655966947-KxrAqdyp"; 
    //}
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
        //str += '<div class="NameLine">'+ sessionStorage.getItem("LineName")+'</div>';
        str += '<div style="font-weight:600; color:#0056ff; font-size:14px;margin-top:12px;">'+ doc.data().EmpName +'</div>';
        str += '<div class="btn-t33" style="margin-top:20px;">บันทึกข้อตกลงการเข้าร่วมกิจกรรม<br><b>อั่งเปาโชคสองชั้น กับ ทีทีบี</b></div>';
        str += '<div style="font-size:13px; text-align:left;margin-top:15px;">โครงการพิเศษเพื่อมอบรางวัลให้แก่พนักงาน Outsource ที่ถือเป็นเพื่อนร่วมทางชาวทีทีบี ผู้ให้การสนับสนุนทำงาน ทำให้พนักงานทีทีบี Make REAL Change สามารถทำงานเพื่อสร้าง Financial Well-being หรือ ชีวิตทางการเงินที่ดีขึ้นให้กับลูกค้าและคนไทยทั้งประเทศ</div>';
        str += '<div class="section-title"><center><div style="text-align: left;margin-top:20px;width:100%;max-width: 500px;">';
        str += '<div style="width:100%; float: left;font-size: 13px; color:#000;line-height: 1.3;">';
          str += '<div style="font-size:13px;><b><u>คุณสมบัติผู้เข้าร่วมโครงการ</u></b></div>';
          str += '<div style="font-size:13px;><ul><li>พนักงาน Outsource ที่มีอายุงานครบ 1 ปีบริบูรณ์ขึ้นไป ณ วันที่ 31 ธันวาคม 2566 (เข้างานก่อนหรือในวันที่ 1 มกราคม 2566)</li><li>มีสถานะเป็นพนักงาน Outsource ของทีทีบี ณ วันที่มอบรางวัล</li></ul></div>';
          str += '<div style="font-size:13px;><b><u>อั่งเปาโชคสองชั้น</u></b></div>';
          str += '<div style="font-size:13px;"><ul><li>โชคชั้นที่ 1  ลุ้นรับเงินสดมูลค่า 1,000 - 5,000 บาท</li><li>โชคชั้นที่ 2  ลุ้นรับของรางวัลใหญ่ 3 รางวัล<br>+ รางวัลที่ 1 จักรยานยนต์ Honda Scoopy Max Club12 จำนวน 1 รางวัล<br>+ รางวัลที่ 2 ทองคำหนัก 1 บาท จำนวน 1 รางวัล<br>+ รางวัลที่ 3   โทรศัพท์มือถือ จำนวน 1 รางวัล</li></ul></div>';
        str += '</div>';

        str += '<div style="width:100%; float: left;font-size: 13px; color:#000;line-height: 1.3;"><b><u>อั่งเปาโชคสองชั้น</u></b><br>ผู้เข้าร่วมกิจกรรมสามารถทำการเลือก "คลิกสุ่มรับโชค" ระบบจะทำการสุ่มเลือกของรางวัล ซึ่งจะมีทั้งผู้ที่ได้รับรางวัล และไม่ได้รับรางวัล<br><br>';
        str += '<u><b>การสุ่มเลือก</b></u><br>ขึ้นอยู่กับการสุ่มเลือกรางวัลจากระบบ<br><br><b><u>ระยะเวลาการร่วมกิจกรรม</u></b><br>ตั้งแต่วันนี้ ถึง วันที่ 18 กุมภาพันธ์ 2567 หรือ<br>จนกว่าฉลากในการสุ่มเลือกจะหมด';
        str += '<br><br><b><u>ของรางวัลสำหรับการสุ่มเลือก</u></b><br>- บัตรกำนัล The Pizza มูลค่า 100 บาท จำนวน 20 รางวัล<br>- บัตรกำนัล Lotus มูลค่า 100 บาท จำนวน 20 รางวัล<br>';
        str += '- บัตรกำนัล Starbuck มูลค่า 200 บาท จำนวน 10 รางวัล</div></div></center></div>';
        str += '<div class="row-font clr"><div class="header-font">ยืนยันการทำรายการของคุณ<br>(ทำเครื่องหมายที่ปุ่ม Checkbox)</div>';
        str += '<div class="input-group"><input type="checkbox" id="txtEmpAccept" onclick="CheckButtomClick()"/>';
        str += '<label for="txtEmpAccept"><ul style="font-size: 13px; text-align:left;">';
        str += '<li>ผู้ขออนุญาตใช้ LINE Retail Society จะต้องเป็นพนักงานของ  ttb ภายใต้สังกัด CRBO เท่านั้น</li>';
        str += '<li>ผู้ขออนุญาตใช้งานจะต้องไม่เผยแพร่ข้อมูลข่าวสารนี้ต่อบุคคลภายนอก ttb โดยเด็ดขาด</li>';
        str += '<li>ผู้ดูแลระบบ สามารถทำการยกเลิกการใช้งานได้โดยไม่มีเงื่อนไข</li></ul></label></div></div>';
        str += '<div id="SubmitApp" class="btn btn-primary btn-lg disabledbutton" onclick="ConfirmRegister()" style="margin-top:10px;background:#28a745; border:2px solid #fff; font-size:13px; margin-right:5px;">ยืนยันลงทะเบียน</div>';
        str += '<div id="overlay" class="btn btn-primary btn-lg" onclick="CloseAll()" style="margin-top:10px; background:#6c757d; border:2px solid #fff; font-size:13px;">ยกเลิกรายการ</div>';
        $("#MyEmpNumber").html(str);  
      } else {
        str += '<div style="margin-top:35px;"><img src="'+ sessionStorage.getItem("LinePicture") +'" class="add-profile"></div>';
        str += '<div class="NameLine">'+ sessionStorage.getItem("LineName")+'</div>';
        str += '<div style="margin-top:20px; font-size:13px; padding:20px 25px; max-width:350px; width:95%; background:#ff0000; color:#fff; border-radius: 10px;">';
        str += '<div><img src="./img/icons-warning.png" style="width:80px;"></div>';
        str += '<div style="margin-top:12px;">เราตรวจสอบแล้วพบว่า<br>รหัสผ่านนี้มีผู้นำมาเปิดใช้งานแล้ว<br>กรุณากรอกรหัสใหม่อีกครั้ง</div>';
        str += '<div id="overlay" class="btn-t22" onclick="CloseAll()" style="margin-top:1จpx; background:#6c757d; border:2px solid #fff; font-size:13px;>ปิดหน้าต่างนี้</div>';
        $("#MyEmpNumber").html(str);  
      }
      //xEmpType = doc.data().EmpType;
      //CheckRegister = doc.data().DateRegister;
      //CheckLineID = doc.data().LineID;
      //alert(CheckRegister);

      //alert("พบข้อมูลของคุณแล้ว ทำการยืนยันสิทธิ์");
      //$("#MyEmpNumber").html(str);  

      //sessionStorage.setItem("EmpNumber", doc.data().EmpNumber);
      //sessionStorage.setItem("EmpName", doc.data().EmpName);
      //sessionStorage.setItem("EmpGroup", doc.data().EmpBranch);
      //sessionStorage.setItem("TimeRegister", doc.data().TimeRegister);
      //sessionStorage.setItem("EmpMember", 1);
      //sessionStorage.setItem("EmpSize", doc.data().EmpSize);
    });
    if(CheckFountEmpNumber==0) {
      str += '<div style="margin-top:35px;"><img src="'+ sessionStorage.getItem("LinePicture") +'" class="add-profile"></div>';
      str += '<div class="NameLine">'+ sessionStorage.getItem("LineName")+'</div>';
      str += '<div style="margin-top:20px; font-size:13px; padding:20px 25px; max-width:350px; width:95%; background:#ff0000; color:#fff; border-radius: 10px;">';
      str += '<div><img src="./img/icons-warning.png" style="width:80px;"></div>';
      str += '<div style="margin-top:12px;">เราไม่พบรหัสผ่าน<br>สำหรับการเข้าร่วมกิจกรรมของคุณ<br>กรุณากรอกรหัสใหม่อีกครั้ง</div>';
      str += '<div id="overlay" class="btn-t22" onclick="CloseAll()" style="margin-top:18px; width:120px; background:#d0dfef; border:1px solid #fff;">ปิดหน้าต่างนี้</div>';
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
    str += '<div style="margin-top:20px; font-size:13px; padding:20px 15px; max-width:350px; width:95%; background:#0056ff; color:#fff; border-radius: 10px;">';
    str += '<div style="margin-top:15px;"><img src="'+ sessionStorage.getItem("LinePicture") +'" class="add-profile"></div>';
    str += '<div class="NameLine">'+ sessionStorage.getItem("EmpName_HR")+'</div>';
    //str += '<div><img src="./img/icons-confirm.png" style="width:80px;"></div>';
    str += '<div style="margin-top:20px;text-align:left; "><b>ทีทีบี</b> ขอขอบคุณเพื่อนร่วมทาง ที่ช่วยสนับสนุนการทำงานให้เราสามารถ <b>Make REAL Change</b> เพื่อสร้างการมีชีวิตทางการเงินที่ดีให้กับลูกค้าและคนไทยทั้งประเทศเป็นกรณีพิเศษ<br><br><font color="#ffff00"><b>คุณ'+ sessionStorage.getItem("EmpName_HR")+'</b> ได้รับสิทธิจับฉลากอั่งเปาโชค 2 ชั้น อย่างละ 1 สิทธิ ระหว่างวันที่ 23 ก.พ. 67 เวลา 9:00 น. 26 ก.พ. 2567 เวลา 12.00 น. เท่านั้น</font><br><br>ธนาคารสงวนสิทธิ์ในการกำหนด เปลี่ยนแปลง หรือยกเลิกหลักเกณฑ์ใด ๆ ตามความเหมาะสม และการตัดสินใจของธนาคารถือเป็นที่สุด</div>';
    str += '<div id="loading2" style="display:block;"><img src="./img/loading1.gif" style="width:50px;margin-top:10px;"></div>';
    str += '<div id="overlay" class="btn btn-primary btn-lg" onclick="GotoHome()" style="margin-top:20px; width:200px; font-size: 13px; background:#28a745; border:2px solid #fff;display:none;">รับทราบ ---> ไปลุ้นโชคกัน</div>';
    $("#MyEmpNumber").html(str);  
    document.getElementById('id01').style.display='block';
    //alert("User Confirm Register = "+xtxtEmpAccept);
  }
}

function UpdateData() {
  //alert("Line 244");
  //console.log("EidEmpNumber="+EidEmpNumber);
  dbStaff.doc(EidEmpNumber).update({
    LineID : sessionStorage.getItem("LineID"),
    LineName : sessionStorage.getItem("LineName"),
    LinePicture : sessionStorage.getItem("LinePicture"),
    Confirm : 1,
    DateConsend : dateString
  });
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
    var xCheck = 8;
    var edValue = document.getElementById("txtEmpNumber");
    var s = edValue.value;

    var lblValue = document.getElementById("lblValue");
    //lblValue.innerText = "ต้องคีย์อีก : "+s+" --- "+s.length;
    if(s.length>=8) {
      lblValue.innerText = "";
      document.getElementById('KeyRegister').style.display='block';
    } else {
      lblValue.innerText = "ต้องคีย์อีก : "+(xCheck-s.length)+ " ตัวอักษร";
      document.getElementById('KeyRegister').style.display='none';
    }

    //var s = $("#edValue").val();
    //$("#lblValue").text(s);    
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

function ClickBox() {
  document.getElementById('id01').style.display='block';
}
*/
function CloseAll() {
  var str = "";
  $("#MyEmpNumber").html(str);  
  document.getElementById("MyEmpNumber").value = "";
  document.getElementById("txtEmpNumber").value = "";
  document.getElementById('KeyRegister').style.display='none';
  document.getElementById('id01').style.display='none';
}
