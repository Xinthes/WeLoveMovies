const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./movies.service")

async function movieExists(req,res,next) {
    const movie = await service.read(req.params.movieId)
    if (movie) {
        res.locals.movie = movie;
        return next();
    }
    next({status: 404, message: `Movie cannot be found`})
}

async function read (req, res) {
    res.json({data: res.locals.movie})
}

async function list (req, res) {
    console.log(req.query)
    const isShowing = req.query.is_showing;
    res.json({data: await service.list(isShowing)})
}

async function listTheaters (req, res) {
    const theaters = await service.listTheatersByMovieId()
    const result = theaters.filter((theater) => theater.movie_id === res.locals.movie.movie_id)
    res.json({data: result})
}

async function listReviews (req, res) {
    const reviews = await service.listReviews()
    const critics = await service.listCritics()
    reviews.forEach((review) =>{
        review.critic = critics.find((critic) => critic.critic_id === review.critic_id)
    })
    const result = reviews.filter((review) => review.movie_id === res.locals.movie.movie_id)
    res.json({data: result})
}
module.exports = {
    list: asyncErrorBoundary(list),
    read: [asyncErrorBoundary(movieExists), read],
    listTheaters: [asyncErrorBoundary(movieExists), asyncErrorBoundary(listTheaters)],
    listReviews: [asyncErrorBoundary(movieExists), asyncErrorBoundary(listReviews)]
}