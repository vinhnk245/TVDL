var express = require("express");
var router = express.Router();
router.get("/",async function (req, res) {

  res.send("Xuân Hùng ĐZ");
});

module.exports = router;