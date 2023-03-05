import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const connpPool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
}).promise();

export default connpPool;

// const stencil = await getStencil("1-2");
// console.log(stencil);