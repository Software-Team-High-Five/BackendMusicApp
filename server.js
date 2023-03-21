//require("dotenv").config();
const express = require("express");
const cors = require("cors");
const history = require('connect-history-api-fallback');
const app = express();

app.use(history());

var corsOptions = {
  origin: "http://localhost:8080",
};
app.use(cors(corsOptions));

// deploy test #4
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
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "course list backend running" });
});

// include the routes

// require("./app/routes/course.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/student.routes")(app);

require("./app/routes/performance.routes")(app);
require("./app/routes/song.routes")(app);

require("./app/routes/composer.routes")(app);
require("./app/routes/event.routes")(app);

require("./app/routes/performance_song.routes")(app);
require("./app/routes/student_instrument.routes")(app);

require("./app/routes/instrument.routes")(app);
require("./app/routes/feedback.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3025;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
