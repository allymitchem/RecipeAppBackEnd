const client = require("./client")

async function createRecipe ({title, servings, prepTime, cookTime, instructions, mealType, cuisine, createdBy, notes }) {

try {
    const {rows: [recipe]} = await client.query(`
    INSERT INTO recipes(title, servings, "prepTime", "cookTime", instructions, "mealType", cuisine, "createdBy", notes)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    `, [title, servings, prepTime, cookTime, instructions, mealType, cuisine, createdBy, notes])
    
} catch (error) {
    console.error();
    
}

}




module.exports = {
   createRecipe 
}