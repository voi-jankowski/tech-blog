const router = require("express").Router();

// Logout route
router.get("/", async (req, res) => {
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
