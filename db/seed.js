const client = require('./client');
const {createPantry,addIngredientToPantry} = require('./');

async function dropTables(){
    try{
        console.log("Dropping All Tables...")

        await client.query(`
        DROP TABLE IF EXISTS users;
        DROP TABLE IF EXISTS recipes;
        DROP TABLE IF EXISTS pantry;
        DROP TABLE IF EXISTS ingredients;
        `)
        console.log("Finished Dropping All Tables...");
    } catch(error){
        throw error
    }
}

async function createTables(){
    try{
        console.log("Starting To Build Tables...")

        await client.query(`
        CREATE TABLE ingredients(
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            quantity VARCHAR(255) NOT NULL,
            unit VARCHAR(255)
            
        );

        CREATE TABLE pantry(
            id SERIAL PRIMARY KEY,
            
            "ingredientId" INTEGER references ingredients(id),
            quantity INTEGER
        );
        
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(255) NOT NULL,
            password VARCHAR(300) NOT NULL,
            email VARCHAR(255) NOT NULL
            );

        CREATE TABLE recipes (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            servings VARCHAR(255),
            "prepTime" VARCHAR (255),
            "cookTime" VARCHAR(255),
            instructions TEXT,
            "mealType" VARCHAR(255),
            cuisine VARCHAR(255),
            "createdBy" INTEGER REFERENCES users(id)
        );
            `)
            //"recipeId" INTEGER references recipes(id) **for ingredients table
            //"userId" VARCHAR(255) references users(id) ** for pantry table
        console.log("Finished building tables!")
    } catch(error){
        console.log("Error building tables!")
        throw error
    }
}

    async function rebuildDB(){
        try{
            await dropTables()
            await createTables()
        } catch(error){
            console.error(error)
            throw error
        }
    }

    rebuildDB()