var notes = {

  addNote: function (date, ay, yil, formNote) {
    return eklePromise = new Promise(
      function (resolve, reject) {
        if (date && formNote) {
          db.transaction(function (tx) {
            tx.executeSql("INSERT INTO EventsTableIki (notGun, notAy, notYil, notes) VALUES(?,?,?,?) ", [date, ay, yil, formNote], function (islem, sonuc) {
              resolve("Resolve :"+date + " " + formNote);
              console.log(sonuc);
            }, function (islem, hata) {
              console.log("Hata: ", hata);
            });
          });
        }
        else {
          var reason = new Error("Eksik bilgi");
          reject(reason); // reject
        }
      }
    );
  },

  deleteNote: function(index){
    return silNote = new Promise(
      function (resolve, reject) {
          db.transaction(function (tx) {
              tx.executeSql('DELETE FROM EventsTableIki WHERE notGun = ?', [index], function (islem, sonuc) {
                  resolve(index);
                  console.log(sonuc);
              }, function (islem, hata) {
                  console.log("Hata: ", hata);
              });
          });

      });
  }

}

function notGoruntule(date,ay) {
  return notgor = new Promise(function (resolve, reject) {
      db.transaction(function (tx) {
          tx.executeSql('SELECT * FROM EventsTableIki WHERE notGun=? AND notAy=?', [date, ay], function (islem, sonuc) {
              resolve(sonuc);
          }, function (islem, hata) {
              var reason = new Error("eksik işlem");
              reject(reason); // reject
          });
      });
  })
} 


function renklendir(gun, ay){
  return eventGor = new Promise(function (resolve, reject) {
    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM EventsTableIki WHERE notGun=? AND notAy=?', [gun, ay], function (islem, sonuc) {
            resolve(sonuc);
        }, function (islem, hata) {
            var reason = new Error("eksik işlem");
            reject(reason); // reject
        });
    });
})
}