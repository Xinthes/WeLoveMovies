const router = require("express").Router({mergeParams: true});
const controller = require("./theaters.controller");
const cors = require("cors")
const methodNotAllowed = require("../errors/methodNotAllowed")

router.use(cors())

router
    .route("/")
    .get(controller.list)
    .all(methodNotAllowed)

module.exports = router;