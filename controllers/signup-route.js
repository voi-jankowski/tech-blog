const router = require("express").Router();

// Signup route
router.get("/", async (req, res) => {
  try {
    // If the user is already logged in, redirect the request to the homepage
    if (req.session.loggedIn) {
      res.redirect("/");
      return;
    }

    // If there is status=failed  query parameter, then render the signup template with an error message
    if (req.url.includes("status=failed")) {
      const errorMessage = "Something went wrong. Please try again.";
      res.render("signup", {
        errorMessage,
      });
      return;
    }
    // If there is status=409  query parameter, then render the signup template with an error message
    if (req.url.includes("status=409")) {
      const errorMessage = "User already exists. Please try logging in.";
      res.render("signup", {
        errorMessage,
      });
      return;
    }

    res.render("signup");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
