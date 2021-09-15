const service = require("./theaters.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")


async function list (req, res) {
    const theaters = await service.list();
    const movies = await service.moviesByTheaterList()
    theaters.forEach((theater) => {
        theater.movies = movies.filter((movie)=> movie.theater_id === theater.theater_id)
    })
    res.json({data: theaters})
}

module.exports = {
    list: asyncErrorBoundary(list)
}