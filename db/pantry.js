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
/* adding ingredients to pantry, quantity is optional */
async function addIngredientToPantry({ingredientId, pantryId, quantity}){
    try {
        const {rows:[pantryItem]} = await client.query(`
        INSERT INTO pantry("ingredientId", "pantryId", quantity)
        VALUES ($1, $2, $3)
        RETURNING *
        ;`, [ingredientId, pantryId, quantity])
        return pantryItem
    } catch(error){
        console.error(error)
    }
}

/* removing ingredients from the pantry */
// async function deleteIngredientFromPantry(pantryIngredientId){
//     try {
//         const {rows: [deletedIngredient]} = await client.query(`
//         DELETE FROM pantry
//         `)

//     }
// }
    


module.exports= {
createPantry,
addIngredientToPantry}