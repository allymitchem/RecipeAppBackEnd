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

async function createIngredient(name){
    try{
        const {rows: [ingredient]} = await client.query(`
        INSERT INTO ingredients(name)
        VALUES ($1)
        RETURNING *;
        `, [name])
        return ingredient
    }catch(error){
        console.error(error)
    }
}

async function addIngredientToRecipe(recipes){
    const recipesToReturn = [...recipes]
    const binds = recipes.map((_, index) => `$${index + 1}`).join(", ")
    /* the overall result is a string of comma-separated placeholders, where each placeholder corresponds to an element in the recipes array. This string can be used as a parameter in a SQL query to substitute a list of values for the placeholders. */
    const recipeIds = recipes.map((recipe)=> recipe.id)
    if (!recipeIds?.length) return []

    try{
        const {rows: ingredients} = await client.query(`
        SELECT ingredients.*, recipe_ingredients."recipeId", recipe_ingredients."ingredientId", recipe_ingredients.amount, recipe_ingredients."measurementId" , recipe_ingredients.id AS "recipeIngredientsId" 
        FROM ingredients
        JOIN recipe_ingredients ON recipe_ingredients."ingredientId" = ingredients.id
        WHERE recipe_ingredients."recipeId" IN (${binds});

        `, recipeIds)

        for (const recipe of recipesToReturn){
            const ingredientsToAdd = ingredients.filter(
                (ingredient) => ingredient.recipeId === recipe.id
            )
            recipe.ingredients = ingredientsToAdd
        }
        /* By the end of the loop, each recipe in the recipesToReturn array will have a new property called ingredients, which contains an array of all the ingredients that belong to that recipe. This allows the recipe and its associated ingredients to be accessed together as a single object. */
        return recipesToReturn
    
    } catch(error){
        console.error(error)
    }
}

module.exports = {
getAllIngredients,
getIngredientById,
getIngredientByName,
createIngredient,
addIngredientToRecipe
}