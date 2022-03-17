const {Pool} = require('pg');

const config = {
    user: '',
    host: '',
    password:'',
    database: '',
    port: '5432',
    ssl: {
        rejectUnauthorized: false
    }
};

const pool = new Pool (config);

module.exports = pool;