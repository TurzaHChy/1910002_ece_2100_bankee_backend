
const mysql = require("mysql");

var DbCon = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "bankee_database"
});

DbCon.connect(function(err) {
    if (err) throw err;

});

module.exports=DbCon;