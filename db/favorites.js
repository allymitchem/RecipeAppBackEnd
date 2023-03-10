const client = require('./client')
/* need to figure out how we want the favorites table to be structured..
all in one table or joined with a table that houses the recipe info */


async function getFavorites(userId){
try {
    const { rows: favorites} = await client.query(`
    SELECT *
    FROM favorites
    WHERE status = true
    AND "userId"=$1
    ;`, [userId])
    return favorites
    }catch (error){
        console.error(error)
    }
}

async function addFavorite(userId, recipeId){
    try{
        const {rows: [favorite]} = await client.query(`
        INSERT INTO favorites ("userId", "recipeId", status)
        VALUES ($1, $2, true)
        RETURNING *
        ;`, [userId, recipeId])
        return favorite
    }catch(error){
        console.error(error)
    }
}

async function removeFavorite(userId, recipeId){
    try{
        const {rows: [favorite]} = await client.query(`
        UPDATE favorites
        SET status = false 
        WHERE "userId" = $1
        AND "recipeId" = $2
        RETURNING *
        ;`, [userId, recipeId])
        return favorite
    }catch(error){
        console.error(error)
    }
}

module.exports = {
    getFavorites,
    addFavorite,
    removeFavorite
}
