const withAuth = (req, res, next) => {
  // If the user is not logged in, reload the page with query parameter of ?loggedIn=false
  if (!req.session.loggedIn) {
    res.redirect("/?loggedIn=false");
  }
  // If the user is logged in, allow them in
  else {
    next();
  }
};

module.exports = withAuth;
