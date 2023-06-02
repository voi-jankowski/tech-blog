const routes = require("express").Router();
const { Comment } = require("../../models");

// create a new comment
routes.post("/:id", async (req, res) => {
  try {
    const commentData = await Comment.create({
      comment_text: req.body.comment_text,
      user_id: req.session.user_id,
      post_id: req.params.id,
    });
    res.status(200).json(commentData).redirect(`/post/:${req.params.id}`);
  } catch (err) {
    res.status(400).json(err);
  }
});

// delete a comment
routes.delete("/:id", async (req, res) => {
  try {
    // get the post_id of the comment
    const comment = await Comment.findOne({
      where: {
        id: req.params.id,
      },
    });
    const post_id = comment.post_id;

    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json(commentData).redirect(`/post/:${post_id}`);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = routes;
