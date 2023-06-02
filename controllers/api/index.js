const router = require("express").Router();
const loginApiRoutes = require("./login-api-routes.js");
const userApiRoutes = require("./user-api-routes.js");
const postApiRoutes = require("./post-api-routes.js");
const commentApiRoutes = require("./comment-api-routes.js");

// Set up the routes
router.use("/login", loginApiRoutes);
router.use("/user", userApiRoutes);
router.use("/post", postApiRoutes);
router.use("/comment", commentApiRoutes);

module.exports = router;
