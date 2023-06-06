const router = require("express").Router();

const { User, Post, Comment } = require("../models");

const withAuth = require("../utils/auth");

// GET all posts for homepage
router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
          include: [{ model: User, attributes: ["username"] }],
        },
      ],
    });

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));

    // If there is status=failed  query parameter, then render the homepage with an error message
    if (req.url.includes("status=failed")) {
      const errorMessage = "Your comment was not submitted. Please try again.";
      res.render("home", {
        posts,
        errorMessage,
        loggedIn: req.session.loggedIn,
      });
      return;
    }

    // Pass serialized data and session flag into template
    res.render("home", {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET one post
router.get("/post/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ["username"],
            },
          ],
        },
      ],
    });

    if (!postData) {
      res.status(404).json({ message: "No post found with this id!" });
      return;
    }

    // Serialize the data
    const post = postData.get({ plain: true });

    // Pass serialized data and session flag into template
    res.render("single-post", {
      post,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
