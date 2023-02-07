const {query} = require('express');
const client = require('./client');

/* creating a pantry for each user */
async function createPantry(userId){
    try{
        const {rows: [pantry]} = await client.query(`
        INSERT INTO pantry("userId")
        VALUES ($1)
        RETURNING *
        ;`, [userId])
        return pantry
    }catch(error){
        console.error(error)
    }

}


module.exports= {createPantry}