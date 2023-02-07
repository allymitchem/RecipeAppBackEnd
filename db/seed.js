const client = require('./client');
const {createPantry,addIngredientToPantry} = require('./');

async function dropTables(){
    try{
        console.log("Dropping All Tables...")

        await client.query(`
        DROP TABLE IF EXISTS ingredients;
        DROP TABLE IF EXISTS pantry;
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