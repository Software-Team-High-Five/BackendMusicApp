//require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const mailer = require('./app/utils/email.util');
// const users = require("./app/utils/user.util");


var corsOptions = {
  origin: "http://localhost:8080",
};
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// -sync the database

const db = require("./app/models");

db.sequelize
  .sync()
  .then(() => {
    console.log("Synced db.");
    mailer.eventsEmail();

  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "course list backend running" });
});

// include the routes
require("./app/routes/user.routes")(app);
require("./app/routes/student.routes")(app);
require("./app/routes/performance.routes")(app);
require("./app/routes/song.routes")(app);
require("./app/routes/composer.routes")(app);
require("./app/routes/event.routes")(app);
require("./app/routes/performance_song.routes")(app);
require("./app/routes/user_instrument.routes")(app);
require("./app/routes/instrument.routes")(app);
require("./app/routes/feedback.routes")(app);
require("./app/routes/role.routes")(app);
require("./app/routes/availability.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3025;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


//mailer.feedbackEmail('jackson.tate@eagles.oc.edu', {id: 500, date: '2023/01/01'});
// mailer.testEmail();