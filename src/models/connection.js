const mysql= require('mysql');

connection= mysql.createConnection({
  host: 'localhost',
  port: '4502',
  user: 'root',
  password: '123456',
  database: 'Tiendas'
});


module.exports= connection;
