const pgp = require('pg-promise')();
var connection = {
    host: '35.199.147.43',
    port: 5432,
    database: 'csc847db',
    user: 'postgres',
    password: 'csc847pass'
};
var db = pgp(connection);
module.exports = db;