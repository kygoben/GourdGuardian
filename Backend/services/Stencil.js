import connPool from './database.js';

async function findAll(){
    const [rows, ] = await connPool.query("SELECT * FROM stencils LIMIT 10");
    return rows;
}

async function findById(id){
    const [rows, ] = await connPool.query(`
    SELECT *
    FROM stencils, category
    WHERE sid = ?
    and stencils.cid = category.cid`, [id]);
    
    return rows[0];
}

export default {
    findAll,
    findById
};