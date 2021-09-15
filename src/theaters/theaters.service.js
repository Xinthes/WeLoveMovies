const knex= require("../db/connection")

const moviesByTheaterList = () => {
    return knex("movies_theaters as mt")
    .join("movies as m", "m.movie_id", "mt.movie_id")
    .select("*") 
}


const list = () => {
    return knex('theaters').select("*")
}

module.exports = {
    list,
    moviesByTheaterList
}