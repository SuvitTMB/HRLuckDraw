var EidProfile = "";
//var CheckFound = 0;
//var CheckFoundData = 0;
//var EidEmpNumber = "";

$(document).ready(function () {
  if(sessionStorage.getItem("EmpNumber_HR")==null) { location.href = "index.html"; }

  console.log(sessionStorage.getItem("EmpNumber_HR"))
  console.log(sessionStorage.getItem("EmpName_HR"))
  console.log(sessionStorage.getItem("TypeRandom_HR"))
  console.log(sessionStorage.getItem("StaffRefID"))

  Connect_DB();
  CheckData();
});


function CheckData() {
  var str = "";
  var str1 = "";
  dbStaff.where('EmpNumber','==',sessionStorage.getItem("EmpNumber_HR"))
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      EidProfile = doc.id;
      //str += '<div><img src="'+ doc.data().LinePicture +'" class="add-profile"></div>';
      //str += '<div class="NameLine">'+ doc.data().LineName+'</div>';
      str1 += '<div><img src="'+ sessionStorage.getItem("LinePicture") +'" class="add-profile"></div>';
      str1 += '<div class="NameLine" style="color:#fff;">'+ doc.data().EmpName +'</div>';
      $("#MyProfile").html(str1);  
      if(doc.data().Check1!=0 && doc.data().Reward1!="") {
        str += '<div class="btn-menu">';
        str += '<div style="width:40%; float: left;text-align:center;"><img src="./img/icons-giftbox.png" style="width:100px;"></div>';
        //str += '<div style="width:40%; float: left;text-align:center;"><img src="./img/Seamasi-07.png" style="width:110px;padding-top:5px;"></div>';
        str += '<div style="width:60%; float: left; padding:5px auto;">';
        str += '<div style="height: 50px;padding-top:8px;">กิจกรรมลุ้นโชค ชั้นที่ 1<br>คุณได้รับเงินสดมูลค่า</div>';
        str += '<div style="height: 20px; font-size: 22px; font-weight: 600; color:#ffff00;">'+ doc.data().Reward1+'</div>';
        str += '<div></div></div></div><div class="clr"></div>';      
      } else {
        str += '<div class="btn-menu">';
          str += '<div style="width:40%; float: left;text-align:center;"><img src="./img/icons-giftbox.png" style="width:100px;"></div>';
        //str += '<div style="width:40%; float: left;text-align:center;"><img src="./img/Seamasi-07.png" style="width:110px;padding-top:5px;"></div>';
        str += '<div style="width:60%; float: left; padding:5px auto;" onclick="Random1()">';
        str += '<div style="height: 55px;padding-top:3px;">กิจกรรมลุ้นโชค ชั้นที่ 1<br><font color="#ffff00">ลุ้นรับเงินสดมูลค่า<br>1,000 - 5,000 บาท</font></div>';
        str += '<div style="height: 30px;"><div class="btn btn-primary btn-lg" id="btn-random1" style="background:#28a745;border: solid #fff 2px;">คลิกลุ้นโชคครั้งที่ 1</div></div>';
        str += '</div></div><div class="clr"></div>';      
      }
        //if(doc.data().Check2!=0 && doc.data().Reward2!="") {
      if(doc.data().Check2!=0) {
        str += '<div class="btn-menu">';
        str += '<div style="width:40%; float: left;text-align:center;"><img src="./img/Seamasi-07.png" style="width:110px;padding-top:5px;"></div>';
        //str += '<div style="width:40%; float: left;text-align:center;"><img src="./img/icons-giftbox.png" style="width:100px;"></div>';
        str += '<div style="width:60%; float: left; padding:5px auto;">';
        if(doc.data().Reward2=="คุณไม่ได้รางวัล") {
          str += '<div style="height: 50px;padding-top:8px;">กิจกรรมลุ้นโชค ชั้นที่ 2<br>ผลการลุ้นรางวัลของคุณ</div>';
          str += '<div style="height: 20px; font-size: 15px; font-weight: 600; color:#ffff00;line-height: 1.1;">'+ doc.data().Reward2 +'</div>';
          str += '<div></div></div></div><div class="clr"></div>';
        } else {
          str += '<div style="height: 50px;padding-top:8px;">กิจกรรมลุ้นโชค ชั้นที่ 2<br>ยินดีด้วยคุณได้รับ</div>';
          str += '<div style="height: 20px; font-size: 15px; font-weight: 600; color:#ffff00;line-height: 1.1;">'+ doc.data().Reward2 +'</div>';
          str += '<div></div></div></div><div class="clr"></div>';
        }
      } else {
        str += '<div class="btn-menu">';
        str += '<div style="width:40%; float: left;text-align:center;"><img src="./img/Seamasi-07.png" style="width:110px;padding-top:5px;"></div>';
        //str += '<div style="width:40%; float: left;text-align:center;"><img src="./img/icons-giftbox.png" style="width:100px;"></div>';
        str += '<div style="width:60%; float: left; padding:5px auto;" onclick="Random2()">';
        str += '<div style="height: 55px;padding-top:3px;">กิจกรรมลุ้นโชค ชั้นที่ 2<br><font color="#ffff00">ลุ้นรับของรางวัลใหญ่<br>3 รางวัล</font></div>';
        str += '<div style="height: 30px;"><div class="btn btn-primary btn-lg" id="btn-random1" style="background:#28a745;border: solid #fff 2px;">คลิกลุ้นโชคครั้งที่ 2</div></div></div></div><div class="clr"></div>';
      }
    });
    $("#MyRewards").html(str);  

  });
}


function Random1() {
  location.href = "game1.html";
}
function Random2() {
  location.href = "game2.html";
}


function CloseAll() {
  document.getElementById('id01').style.display='none';
}
