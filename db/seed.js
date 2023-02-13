const client = require('./client');
const {createPantry,addIngredientToPantry, getFavorites, addFavorite, removeFavorite, createUser} = require('./');


async function dropTables() {
    try {
        console.log("Dropping All Tables...")

        await client.query(`
        DROP TABLE IF EXISTS favorites;
        DROP TABLE IF EXISTS recipes;
        DROP TABLE IF EXISTS pantry;
        DROP TABLE IF EXISTS users;
        DROP TABLE IF EXISTS ingredients;
        DROP TABLE IF EXISTS users;
        `)
        console.log("Finished Dropping All Tables...")
    } catch (error) {
        throw error
    }
}

async function createTables() {
    try {
        console.log("Starting To Build Tables...")

        await client.query(`
       

       
        
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(300) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL
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
            "createdBy" VARCHAR(255) REFERENCES users(username),
            notes TEXT
        );

        CREATE TABLE ingredients(
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            quantity VARCHAR(255) NOT NULL,
            unit VARCHAR(255),
            "recipeId" INTEGER references recipes(id)
        );

        CREATE TABLE pantry(
            id SERIAL PRIMARY KEY,
            
            "ingredientId" INTEGER references ingredients(id),
            quantity INTEGER
        );

        CREATE TABLE favorites (
            id SERIAL PRIMARY KEY,
            status BOOLEAN DEFAULT false,
            "userId" INTEGER REFERENCES users(id),
            "recipeId" INTEGER REFERENCES recipes(id)
           
        );
            `)
        //"recipeId" INTEGER references recipes(id) **for ingredients table
        //"userId" VARCHAR(255) references users(id) ** for pantry table
        console.log("Finished building tables!")
    } catch (error) {
        console.log("Error building tables!")
        throw error
    }
}

async function createInitialUsers() {
    console.log("Starting To Create Initial Users")
    try {
        const Kaylan = await createUser({
            username: "Kaylan",
            password: "me123",
            email: "kaylan@gmail.com"
        })
        const Allyson = await createUser({
            username: "Allyson",
            password: "allyson",
            email: "allyson@gmail.com"
        })
        console.log("Finished creating initial user!")
    } catch (error) {
        console.error()
    }
}

async function rebuildDB() {
    try {
        await dropTables()
        await createTables()
        await createInitialUsers()
    } catch (error) {
        console.error(error)
        throw error
    }
}

async function testDB() {}

rebuildDB()
    .then(testDB)
    .catch(console.error)
    .finally(() => {
        client.end()
    })
