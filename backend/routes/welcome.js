const router = require('express').Router();
const auth = require("../controller/auth");

router.route('/').get(auth, (req, res) => {
  res.status(200).send("Welcome 🙌 ");
});

// app.post("/welcome", auth, (req, res) => {
//   res.status(200).send("Welcome 🙌 ");
// });

module.exports = router;