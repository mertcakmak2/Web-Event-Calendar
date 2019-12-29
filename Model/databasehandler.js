
    var db = null;
    var createEvents = function () {
        this.db = window.openDatabase(
            "TakvimDB",
            "1.0",
            "Takvim Database",
            1000000);
        this.db.transaction(
            function (tx) {
                tx.executeSql("create table if not exists EventsTableIki (id INTEGER PRIMARY KEY, notGun VARCHAR(15), notAy VARCHAR(15), notYil VARCHAR(15)  ,notes VARCHAR(50) )",
                    [],
                    function (tx, results) { },
                    function (tx, error) {
                        console.log("Error while creating the table: " + error.message);
                    }
                );
            },
            function (error) {
                console.log("Transaction error: " + error.message);
            },
            function () {
                console.log("Create DB transaction completed successfully");
            }
           
        );
    }


 $(document).on('click', '.tablosil', function () {
    databaseHandler.db.transaction(function (tx) {
        tx.executeSql("DROP TABLE EventsTAble", []);
    });
  }); 