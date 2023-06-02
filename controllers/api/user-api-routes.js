const router = require("express").Router();
const User = require("../../models/user");

// Create a new user
router.post("/", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // check if the user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }
    // create a new user
    const user = await User.create({ username, email, password });

    // Create session variables based on the logged in user
    req.session.user_id = user.id;
    req.session.username = user.username;
    req.session.loggedIn = true;

    req.session.save(() => {
      res.json({
        user: userData,
        message: "You are now signed in as a new user!",
      });
      res.redirect("/dashboard");
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Update a user
router.put("/update", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.update(
      { username, email, password },
      { where: { id: req.session.user_id } }
    );
    res.redirect("/dashboard");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Delete a user
router.delete("/delete", async (req, res) => {
  try {
    const user = await User.destroy({ where: { id: req.session.user_id } });
    req.session.destroy();
    res.redirect("/");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
