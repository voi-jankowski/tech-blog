const router = require("express").Router();
const apiRoutes = require("./api");
const homeRoutes = require("./home-routes.js");
const dashboardRoutes = require("./dashboard-routes.js");
const loginRoute = require("./login-route.js");
const logoutRoute = require("./logout-route.js");
const signupRoute = require("./signup-route.js");

router.use("/api", apiRoutes);
router.use("/", homeRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/login", loginRoute);
router.use("/logout", logoutRoute);
router.use("/signup", signupRoute);

// If the url is wrong set status to 404 and display the 404 page
router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;
