const client = require("./client")
const {
    createPantry,
    addIngredientToPantry,
    getFavorites,
    addFavorite,
    removeFavorite,
    createUser,
    createRecipe,
    getAllIngredients,
    getIngredientById,
    getIngredientByName,
    createIngredient,
    addIngredientToRecipe,
    getAllUsers,
    updateUser,
    getUserById,
    getUserByUsername,
    deleteUser
} = require("./")

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
            name VARCHAR(255) UNIQUE NOT NULL
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

async function createInitialRecipe() {
    console.log("Starting to create recipes")

    try {
        const spaghetti = await createRecipe({
            title: "Spaghetti",
            servings: "4",
            prepTime: "10 mins",
            cookTime: "25 mins",
            instructions:
                "Brown and drain a pound of hamburger meat or meat of your choice or protein substitute.  While protein is cooking, boil large pot of water, add salt to water to taste.  Once boiling, add pasta. Drain protein once cooked through if needed.  Add favorite jar of sauce to protein.  Simmer until warmed through.  Once pasta is al dente or to your liking, drain.  Mix pasta into sauce and protein mixture or top pasta with protein sauce mixture.  Add any toppings you like, i.e. cheese, nutritional yeast, basil, etc.",
            mealType: "Dinner",
            cuisine: "Italian",
            createdBy: "Kaylan",
            notes: "Lentils and walnuts are a good plant substitute"
        })

        const shortbreadCookies = await createRecipe({
            title: "Raspberry Almond Shortbread Cookies",
            servings: "36",
            prepTime: "30 mins",
            cookTime: "30 mins",
            instructions:
                "For the cookies: Preheat oven to 350°F (180°C). In a mixing bowl whisk together flour and salt, set aside. In the bowl of an electric stand mixer fitted with the paddle attachment, blend together butter and sugar until combined (it will take a minute or two since the butter is cold).Mix in almond extract then add in flour blend until mixture comes together (it will take a bit of mixing since the butter is cold, so be patient, it will seem really dry and crumbly at first).Shape dough into 1-inch balls, about 1 Tbsp each, and place 2-inches apart on ungreased baking sheets. Make a small indentation with thumb or forefinger in each cookie (large enough to fit 1/4 - 1/2 tsp of jam). Fill each with 1/4 - 1/2 tsp jam. Chill in refrigerator 20 minutes (or freezer for 10 minutes). Bake in preheated oven 14 - 18 minutes. Cool several minutes on baking sheet then transfer to a wire rack to cool. For the glaze: Whisk all glaze ingredients together in a small mixing bowl, adding enough water to reach desired consistency. Pour or spoon mixture into a sandwich size resealable bag, cut a small tip from one corner and drizzle over cool cookies. Let set at room temperature then store in an airtight container.",
            mealType: "Dessert",
            cuisine: "",
            createdBy: "Allyson",
            notes: "Recipe adapted from Cooking Classy, Land O Lakes and Allrecipes.com"
        })

        console.log("Finished creating initial recipe!")
    } catch (error) {
        console.error()
    }
}

async function addToUserFavorites() {
    try {
        console.log("Starting to add to favorites...")

        //addFavorite(userId, recipeId)
        await addFavorite(1, 1)
        await addFavorite(1, 2)
        await addFavorite(2, 2)
        console.log(`Added favorite for user...`)
    } catch (error) {
        console.log("Error adding to favorites...")
    }
}

async function removeFromUserFavorites() {
    try {
        console.log("Starting to remove favorite...")

        //removeFavorite(userId, recipeId)
        await removeFavorite(1, 1)

        console.log(`Removed favorite for user...`)
    } catch (error) {
        console.log("Error removing from favorites...")
    }
}

async function getUserFavorites() {
    try {
        console.log("Starting to retrieve user's favorites...")

        //getFavorites(userId)
        const userFavorites = await getFavorites(1)
        console.log(userFavorites, "user's favorite's")
        console.log("Retrieved user's favorites...")
    } catch (error) {
        console.log("Error retrieving user's favorites...")
    }
}

async function rebuildDB() {
    try {
        await dropTables()
        await createTables()
        await createInitialUsers()
        await createInitialRecipe()
        await addToUserFavorites()
        await removeFromUserFavorites()
        await getUserFavorites()
    } catch (error) {
        console.error(error)
        throw error
    }
}

async function testDB() {
    console.log("Starting to test database...")

    const userCreated = await createUser({
        username: "Feyre",
        password: "iloverhys",
        email: "highlady@gmail.com"
    })
    console.log("User Created", userCreated)

    const allUsers = await getAllUsers()
    console.log("All Users", allUsers)

    const userById = await getUserById(1)
    console.log("A user retrieved by Id", userById)

    const updatedUser = await updateUser({ id: 3, email: "highladyofthenightcourt@gmail.com" })
    console.log("Updated User", updatedUser)

    const userByUsername = await getUserByUsername("Kaylan")
    console.log("Retrieved user by username", userByUsername)

    const deletedUser = await deleteUser(3)
    console.log("Deleted a user", deletedUser)

    const newRecipe = await createRecipe({
        title: "Chicken Quesadillas",
        servings: "1",
        prepTime: "5 mins",
        cookTime: "10 mins",
        instructions:
            "Butter a hot skillet.  Place flour tortilla in skillet.  On the side facing up, spread sour cream and sprinkle with cheese.  Add shredded chicken.  Fold in half.  Flip tortilla over until desired brownness and cheese is melted.",
        mealType: "Dinner",
        cuisine: "Mexican",
        createdBy: "Kaylan",
        notes: "Add any other ingredients you like, i.e. salsa, cilantro, jalapenos."
    });
    console.log("Created a new recipe", newRecipe);

    console.log("Finished testing database....")


}

rebuildDB()
    .then(testDB)
    .catch(console.error)
    .finally(() => {
        client.end()
    })
