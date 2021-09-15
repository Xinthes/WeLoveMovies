const router = require("express").Router({mergeParams: true});
const methodNotAllowed = require("../errors/methodNotAllowed");
const controller = require("./reviews.controller");
const cors = require("cors")

router.use(cors());

router
    .route("/:reviewId")
    .put(controller.update)
    .delete(controller.destroy)
    .all(methodNotAllowed)

module.exports= router;