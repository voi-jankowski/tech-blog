const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const routes = require("./controllers");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const sequelize = require("./config/connection");

const app = express();
const PORT = process.env.PORT || 3001;

// set up sessions and connect to our Sequelize database
const sess = {
  secret: "Super secret secret",
  // set cookie to expire in 15 minutes
  cookie: {
    maxAge: 900000,
    secure: false,
    httpOnly: true,
    sameSite: "strict",
  },
  resave: false,
  saveUninitialized: true,

  store: new SequelizeStore({
    db: sequelize,
  }),
};

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

app.use(session(sess));

// Inform Express.js on which template engine to use
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// turn on routes
app.use(routes);

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log(`Now listening on http://localhost:${PORT}`)
  );
});
