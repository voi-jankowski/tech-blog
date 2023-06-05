const router = require("express").Router();

const { User, Post, Comment } = require("../models");

const withAuth = require("../utils/auth");

// Get all the posts of the user for the main dashboard page
router.get("/", withAuth, async (req, res) => {
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

    // If there is status=failed  query parameter, then render the dashboard template with an error message
    if (req.url.includes("status=failed")) {
      const errorMessage = "Something went wrong. Please try again.";
      res.render("dashboard", {
        errorMessage,
        loggedIn: req.session.loggedIn,
      });
      return;
    }

    // If there are no posts, then render the dashboard template without posts
    if (!postData) {
      res.render("dashboard", {
        loggedIn: req.session.loggedIn,
      });
      return;
    }

    // Serialize the data
    const userPosts = postData.map((post) => post.get({ plain: true }));
    console.log("userPosts:");
    userPosts.forEach((post) => console.log(post));
    // Pass serialized data and session flag into template
    res.render("dashboard", {
      userPosts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new post route
router.get("/new", withAuth, async (req, res) => {
  try {
    // If there is status=failed  query parameter, then render the new post template with an error message
    if (req.url.includes("status=failed")) {
      const errorMessage = "Something went wrong. Please try again.";
      res.render("new-post", {
        errorMessage,
        loggedIn: req.session.loggedIn,
      });
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
router.get("/edit/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);

    // Serialize the data
    const post = postData.get({ plain: true });
    // console.log("post:");
    // console.log(post);

    // If there is status=failed  query parameter, then render the edit post template with an error message
    if (req.url.includes("status=failed")) {
      const errorMessage = "Something went wrong. Please try again.";
      res.render("edit-post", {
        post,
        errorMessage,
        loggedIn: req.session.loggedIn,
      });
      return;
    }

    res.render("edit-post", {
      post,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Change your password route
router.get("/change-password", withAuth, async (req, res) => {
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
