const router = require("express").Router();
const apiRoutes = require("./api");
const homeRoutes = require("./home-routes.js");
const dashboardRoutes = require("./dashboard-routes.js");
const loginRoutes = require("./login-routes.js");

router.use("/api", apiRoutes);
router.use("/", homeRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/login", loginRoutes);

// If the url is wrong set status to 404 and display the 404 page
router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;
