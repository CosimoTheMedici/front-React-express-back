const db = require('./db');
const helper = require('../helper');
const config = require('../config');


async function getMultiple(page = 1){
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT id, name, released_year, githut_rank, pypl_rank, tiobe_rank 
    FROM programming_languages LIMIT ${offset},${config.listPerPage}`
    );
    const data = helper.emptyOrRows(rows);
    const meta = {page};

    return {
        data,
        meta
    }
}

async function create(programmingLanguage){
    const result = await db.query(
        `INSERT INTO programming_languages(name, released_year, githut_rank, pypl_rank, tiobe_rank)
         VALUES ("${programmingLanguage.name}","${programmingLanguage.released_year}","${programmingLanguage.githut_rank}","${programmingLanguage.pypl_rank}","${programmingLanguage.tiobe_rank}")`
    );
    
    
    let message = 'Error in creating programming language';
    if(result.affectedRows !== 0){
        message = 'Programming language created successfully';
    }if(result.affectedRows === 0){
        message = 'Programming language was not created';
    }
    const va = programmingLanguage.name;
    return {message};
}
async function update(id,data){
    const result = await db.query(
        `UPDATE programming_languages SET name="${data.name}", released_year=${data.released_year}, githut_rank=${data.githut_rank}, pypl_rank=${data.pypl_rank}, tiobe_rank=${data.tiobe_rank} WHERE id=${id}`);
        
    let message = 'Error in updating prog lang'
    if(result.affectedRows){
        message = 'Programming language updated successfully';
    }
    return {message};

}

// "result": {
//     "fieldCount": 0,
//     "affectedRows": 1,
//     "insertId": 48,
//     "info": "",
//     "serverStatus": 2,
//     "warningStatus": 0
// }


async function remove(id){
    const result = await db.query(
        `DELETE FROM programming_languages where id=${id}`
    );
    let message = 'Error in deleting programming language';

    if(result.affectedRows){
        message = 'programming language deleted successfully';
    }
    return {message}
}
module.exports = {
    getMultiple,
    create,
    update,
    remove,
};