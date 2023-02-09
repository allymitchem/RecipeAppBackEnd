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
    `, [userId])
    return favorites
    }catch (error){
        console.error(error)
    }
}

module.exports = {
    getFavorites
}
