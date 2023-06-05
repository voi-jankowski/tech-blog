const router = require("express").Router();
var bcrypt = require("bcryptjs");
const User = require("../../models/user");

// Login route
router.post("/", async (req, res) => {
  try {
    console.log("req.body:");
    console.log(req.body);
    // Find the user who matches the posted username
    const userData = await User.findOne({
      where: { username: req.body.username },
    });

    const user = userData.get({ plain: true });
    console.log("user:");
    console.log(user);
    // If there is no matching user, return an error
    if (!user) {
      res.status(400).json("Incorrect username or password, please try again.");
      return;
    }

    // Verify the posted password with the password stored in the database
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      res.status(400).json("Incorrect username or password, please try again.");
      return;
    }
    // Create session variables based on the logged in user
    req.session.user_id = user.id;
    req.session.username = user.username;
    req.session.loggedIn = true;

    req.session.save(() => {
      res.status(200).redirect("/dashboard");
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
