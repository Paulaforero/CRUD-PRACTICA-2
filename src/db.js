const {Pool}= require('pg')
/*const { password } = require('pg/lib/defaults')*/
const {db} = require('./config')
const pool= new Pool({
    user: db.user,
    password:db.password,
    host:db.host,
    port:db.port,
    database:db.database
})

module.exports= pool;