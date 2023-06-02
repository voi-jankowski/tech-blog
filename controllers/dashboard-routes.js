const router = require("express").Router();

const { User, Post, Comment } = require("../models");
const { route } = require("./home-routes");

// Get all the posts of the user for the main dashboard page
router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    // If there are no posts, then render the dashboard template without posts
    if (!postData) {
      res.render("dashboard", {
        loggedIn: req.session.loggedIn,
      });
      return;
    }

    // Serialize the data
    const posts = postData.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render("dashboard", {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new post route
router.get("/new", async (req, res) => {
  try {
    // If the user is not logged in, redirect the request to another route
    if (!req.session.loggedIn) {
      res.redirect("/login");
      return;
    }
    res.render("new-post", {
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Edit a post route
router.get("/edit/:id", async (req, res) => {
  try {
    // If the user is not logged in, redirect the request to another route
    if (!req.session.loggedIn) {
      res.redirect("/login");
      return;
    }

    const postData = await Post.findByPk(req.params.id);

    if (!postData) {
      res.status(404).json({ message: "No post found with this id!" });
      return;
    }

    // Serialize the data
    const post = postData.get({ plain: true });

    res.render("edit-post", {
      post,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Change your password route
router.get("/change-password", async (req, res) => {
  try {
    // If the user is not logged in, redirect the request to another route
    if (!req.session.loggedIn) {
      res.redirect("/login");
      return;
    }

    res.render("change-password", {
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

module.exports = router;
