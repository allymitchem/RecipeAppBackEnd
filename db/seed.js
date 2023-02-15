const client = require('./client');
const {createPantry,addIngredientToPantry, getFavorites, addFavorite, removeFavorite, createUser, createRecipe} = require('./');


async function dropTables() {
    try {
        console.log("Dropping All Tables...")

        await client.query(`
        DROP TABLE IF EXISTS favorites;    
        DROP TABLE IF EXISTS recipe_ingredients;
        DROP TABLE IF EXISTS ingredients;
        DROP TABLE IF EXISTS measurements;
        DROP TABLE IF EXISTS recipes;
        DROP TABLE IF EXISTS users;
       
        `)
        // DROP TABLE IF EXISTS pantry;
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

        CREATE TABLE measurements(
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) UNIQUE NOT NULL
        );

        CREATE TABLE ingredients(
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL
        );

        CREATE TABLE recipe_ingredients(
            id SERIAL PRIMARY KEY,
            "recipeId" INTEGER REFERENCES recipes(id),
            "ingredientId" INTEGER REFERENCES ingredients(id),
            amount VARCHAR(255),
            "measurementId" INTEGER REFERENCES measurements(id)
            
        );


       
        CREATE TABLE favorites (
            id SERIAL PRIMARY KEY,
            status BOOLEAN DEFAULT false,
            "userId" INTEGER REFERENCES users(id),
            "recipeId" INTEGER REFERENCES recipes(id)
           
        );
            `)
            // CREATE TABLE pantry(
            //     id SERIAL PRIMARY KEY,
                
            //     "ingredientId" INTEGER references ingredients(id),
            //     quantity INTEGER
            // );
    
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

async function createInitialRecipe () {
    console.log("Starting to create recipes")

    try {
        const spaghetti = await createRecipe({
            title: "Spaghetti",
            servings: "4",
            prepTime: "10 mins",
            cookTime: "25 mins",
            instructions: "Brown and drain a pound of hamburger meat or meat of your choice or protein substitute.  While protein is cooking, boil large pot of water, add salt to water to taste.  Once boiling, add pasta. Drain protein once cooked through if needed.  Add favorite jar of sauce to protein.  Simmer until warmed through.  Once pasta is al dente or to your liking, drain.  Mix pasta into sauce and protein mixture or top pasta with protein sauce mixture.  Add any toppings you like, i.e. cheese, nutritional yeast, basil, etc.",
            mealType: "Dinner",
            cuisine: "Italian",
            createdBy: "Kaylan",
            notes: "Lentils and walnuts are a good plant substitute"
        });

        console.log("Finished creating initial recipe!")
        
    } catch (error) {
        console.error();
        
    }
}

async function rebuildDB() {
    try {
        await dropTables()
        await createTables()
        await createInitialUsers()
        await createInitialRecipe()
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
