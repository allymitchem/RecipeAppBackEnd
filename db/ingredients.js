const client = require ('./client')

async function getAllIngredients(){
    try {
        const {rows} = await client.query(`
        SELECT *
        FROM ingredients;
        `)
        return rows
    }catch(error){
        console.error(error)
    }
}

async function getIngredientById(id){
    try {
        const {rows: [ingredient]} = await client.query(`
        SELECT *
        FROM ingredients
        WHERE id=$1;
        `,[id])
        return ingredient
    }catch(error){
        console.error(error)
    }
}

async function getIngredientByName(name){
    try{
        const {rows:[ingredient]} = await client.query(`
        SELECT *
        FROM ingredients
        WHERE name = $1;
        `, [name])
        return ingredient
    }catch(error){
        console.error(error)
    }
}



module.exports = {
getAllIngredients,
getIngredientById,
getIngredientByName
}