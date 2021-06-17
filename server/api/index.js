const router = require("express").Router();
module.exports = router;

router.use("/users", require("./users"));
router.use("/bikes", require("./bikes"));
router.use("/userCart", require("./userCart"));

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
