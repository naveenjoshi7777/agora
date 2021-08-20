const agoraController = require("../controller/agoratoken");
const router = require("express").Router();

router.post("/", agoraController.create);

module.exports = router;
