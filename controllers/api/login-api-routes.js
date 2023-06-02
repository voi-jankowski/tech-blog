const router = require("express").Router();
var bcrypt = require("bcryptjs");
const { User } = require("../../models/user");

// Login route
router.post("/", async (req, res) => {
  try {
    // Find the user who matches the posted e-mail address
    const userData = await User.findOne({ where: { email: req.body.email } });
    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }
    // Verify the posted password with the password store in the database
    const validPassword = await bcrypt.compare(
      req.body.password,
      userData.password
    );
    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }
    // Create session variables based on the logged in user
    req.session.user_id = user.id;
    req.session.username = user.username;
    req.session.loggedIn = true;

    req.session.save(() => {
      res.json({ user: userData, message: "You are now logged in!" });
      res.redirect("/dashboard");
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
