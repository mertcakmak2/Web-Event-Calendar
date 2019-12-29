var month;
var year;
var date;
var monthIndis;
$(document).ready(function () {
  var d = new Date();
  console.log("şuan :", d)
  var birthday = new Date(1998, 1, 28)
  var yil = d.getFullYear() - birthday.getFullYear()
  var ay = d.getMonth() - birthday.getMonth();
  var gun = Math.abs(d.getDay() - birthday.getDay());
  alert('Bugüne kadar geçen süre:  ' + yil + ' \n  ' + ay + '  \n  ' + gun + '  ');
  createEvents();
  notView();
})

var Calendar = function (object) {

  this.divId = object.ParentID;
  console.log(object)
  console.log(object.Format)
  this.DaysOfWeek = object.DaysOfWeek;
  this.Months = object.Months;
  var d = new Date();
  this.CurrentMonth = d.getMonth();
  this.CurrentYear = d.getFullYear();

};
// Gelecek aya gitme
Calendar.prototype.nextMonth = function () {
  if (this.CurrentMonth == 11) {
    this.CurrentMonth = 0;
    this.CurrentYear = this.CurrentYear + 1;

  } else {
    this.CurrentMonth = this.CurrentMonth + 1;
  }
  this.showCurrent();
  console.log(this.CurrentMonth)
};
// Önceki aya gitme
Calendar.prototype.previousMonth = function () {
  if (this.CurrentMonth == 0) {
    this.CurrentMonth = 11;
    this.CurrentYear = this.CurrentYear - 1;
  } else {
    this.CurrentMonth = this.CurrentMonth - 1;
  }
  this.showCurrent();
};
// Önceki yıla gitme
Calendar.prototype.previousYear = function () {
  this.CurrentYear = this.CurrentYear - 1;
  this.showCurrent();
}
//Gelecek yıla gitme 
Calendar.prototype.nextYear = function () {
  this.CurrentYear = this.CurrentYear + 1;
  this.showCurrent();
}
//Şuanki yılı ve ayı gönderdik.
Calendar.prototype.showCurrent = function () {
  this.Calendar(this.CurrentYear, this.CurrentMonth);
};
// Yıl ay formatında göster
Calendar.prototype.Calendar = function (y, m) {
  typeof (y) == 'number' ? this.CurrentYear = y : null;
  typeof (y) == 'number' ? this.CurrentMonth = m : null;

  var firstDayOfCurrentMonth = new Date(y, m, 1).getDay();
  var lastDateOfCurrentMonth = new Date(y, m + 1, 0).getDate();
  // Önceki ayın son günleri.
  var lastDateOfLastMonth = m == 0 ? new Date(y - 1, 11, 0).getDate() : new Date(y, m, 0).getDate();
  // Ayı ve yılı yazdır.
  var monthandyearhtml = '<span id="monthandyearspan">' + this.Months[m] + ' ' + y + '</span>';

  month = this.Months[m];
  year = y;
  monthIndis = m;

  var html = '<table>';
  html += '<tr>';
  for (var i = 0; i < 7; i++) {
    html += '<th class="daysheader">' + this.DaysOfWeek[i] + '</th>';
  }

  html += '</tr>';

  var p = dm = firstDayOfCurrentMonth == 0 ? -5 : 2;
  console.log(dm);
  var cellvalue;

  for (var d, i = 0, sutun = 0; sutun < 6; sutun++) {
    html += '<tr>';
    for (var j = 0; j < 7; j++) {
      var trh = new Date();
      d = i + dm - firstDayOfCurrentMonth;
      // Aydan önce gelen günlerimiz
      if (d < 1) {
        cellvalue = lastDateOfLastMonth - firstDayOfCurrentMonth + p++;
        html += '<td id="prevmonthdates">' + (cellvalue) + '</td>';
        // Aydan sonra gelen günlerimiz
      } else if (d > lastDateOfCurrentMonth) {
        html += '<td id="nextmonthdates">' + (p++) + '</td>';
        // Şuanki ayımızın günleri
      }
      else {
        date = d;

        if (d === trh.getDate() && this.CurrentMonth === trh.getMonth() && year === trh.getFullYear()) {
          html += '<td id="currentmonthdates' + d + '" style = "background-color:red"><input type="button" class="btn" onclick="openForm(' + d + ')" /> <b>' + d + '</b> </td>';
        }
        else {
          html += '<td id="currentmonthdates' + d + '"><input type="button" class="btn" onclick="openForm(' + d + ')"  />' + d + '</td>';
        }
        p = 1;
      }
      if (i % 7 == 6 && d >= lastDateOfCurrentMonth) {
        sutun = 10; // daha satır yok.
      }
      i++;

      etkinlikGun(d, this.CurrentMonth, year);
    }
    html += '</tr>';
  }
  html += '</table>';
  document.getElementById("monthandyear").innerHTML = monthandyearhtml;
  document.getElementById(this.divId).innerHTML = html;
};

window.onload = function () {

  var cln = new Calendar({
    ParentID: "divcalendartable",

    DaysOfWeek: [
      'PZT',
      'SALI',
      'ÇRŞ',
      'PRŞ',
      'CUMA',
      'CMT',
      'PZR'
    ],

    Months: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'],

    Format: 'dd/mm/yyyy'
  });

  cln.showCurrent();

  getId('btnPrev').onclick = function () {
    cln.previousMonth();
  };
  getId('btnPrevYr').onclick = function () {
    cln.previousYear();
  };
  getId('btnNext').onclick = function () {
    cln.nextMonth();
  };
  getId('btnNextYr').onclick = function () {
    cln.nextYear();
  };
  console.log(cln);
}

function getId(id) {
  return document.getElementById(id);
}

function openForm(index) {
  document.getElementById("myForm").style.display = "block";
  date = index;
  console.log(date);
  document.getElementById("notesHead").textContent = index + " " + month;
  notView();
}

function noteAdd() {
  var formNote = $("#note").val();
  this.date = date;
  var ay = monthIndis;
  var yil = year;

  notes.addNote(date, ay, yil, formNote).then(function (fulfilled) {
    $("#note").val("");
    console.log("eklendi :" + this.date + ", " + formNote)
    notView();
    console.log(fulfilled);
  })
    .catch(function (error) {
      alert("Not girilmedi.")
      console.log(error.message);
    })
}

function noteDelete(index) {
  $("#currentmonthdates" + index).removeClass("degisen");
  notes.deleteNote(index).then(function (fulfilled) {
    notView();
    console.log(fulfilled);
    console.log('Kayıt silindi.');
  })
}

var etkinlikGun = function (d, m) {
  /* console.log(d,m);
  console.log(monthIndis); */
  var gun = d;
  var ay = m;
  renklendir(gun, ay).then(function (fulfilled) {
    jQuery.each(fulfilled.rows, function (index, value) {
      if (fulfilled.rows.length > 0) {
        $("#currentmonthdates" + gun).addClass("degisen");
      }
    });
  })
}

var notView = function () {
  var ay = monthIndis;
  var gun = date;
  etkinlikGun(gun, ay);
  notGoruntule(gun, ay).then(function (fulfilled) {
    console.log("Kayıtlar listeleniyor:")
    console.log(fulfilled.rows);
    console.log(fulfilled.rows.length)
    $("#tablonot").empty();
    jQuery.each(fulfilled.rows, function (index, value) {
      if (fulfilled.rows.length > 0)
        $("#tablonot").append(
          "<tr>" +
          "<td><ul><li>" + value.notes + " <button type='button' onclick='noteDelete(" + value.notGun + ")' data-index='" + value.id + "' class='urunsil btn btn-light' >Sil</button></li></ul></td>" +
          "</tr>");
    });
  })
    .catch(function (error) {
      alert(error.message);
    })
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}




