const {Pool} = require('pg');

const config = {
    user: 'fcjndowjakdmtb',
    host: 'ec2-52-44-209-165.compute-1.amazonaws.com',
    password:'1fa7a9689b34990c7dbd1fbce4ffbf50be58b6e75eab9900377c959932b48acc',
    database: 'd7aab95icttg8q',
    port: '5432',
    ssl: {
        rejectUnauthorized: false
    }
};

const pool = new Pool (config);

module.exports = pool;