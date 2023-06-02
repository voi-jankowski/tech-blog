const router = require("express").Router();

// Signup route
router.get("/signup", async (req, res) => {
  try {
    // If the user is already logged in, redirect the request to another route
    if (req.session.loggedIn) {
      res.redirect("/");
      return;
    }
    res.render("signup");
  } catch (err) {
    res.status(500).json(err);
  }
});

// Login route
router.get("/login", async (req, res) => {
  try {
    // If the user is already logged in, redirect the request to another route
    if (req.session.loggedIn) {
      res.redirect("/");
      return;
    }
    res.render("login");
  } catch (err) {
    res.status(500).json(err);
  }
});

// Logout route
router.get("/logout", async (req, res) => {
  // When the user logs out, the session is destroyed
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    // If there is no session, then the user is not logged in, so we end the request
    res.status(404).end();
  }

  // Redirect to homepage
  res.redirect("/");
});

module.exports = router;
