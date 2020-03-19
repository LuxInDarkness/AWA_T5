const mysql = require("mysql");
const connection = mysql.createConnection({
    host: '18.217.14.101',
    user:'awa_user',
    password:'Abc12345',
    database:'awa'
});

connection.connect(err => {
    if (err) console.log("No fue posible conectar con el servidor")
    else console.log("Conexión existosa.");
});

module.exports = connection;