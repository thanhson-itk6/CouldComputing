const Pool = require('pg').Pool;
const pg_conn = new Pool (
    {
        user:'yyjygdqczsiofj',
        password:'a629a70a30444370900eaf89e1ac14ec839a3ad9c0a82f52ce1ac529a2c1831a',
        host:'ec2-44-199-22-207.compute-1.amazonaws.com',
        database:'d6vc7sb1gf2b2',
        port:5432,
        ssl: {
            rejectUnauthorized: false
        },
    });

module.exports = pg_conn;