const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const taskRoutes =
require("./routes/taskRoutes");


const authRoutes =
require("./routes/authRoutes");

const app = express();

app.use(express.json());

app.use(cors());

app.use(helmet());

app.use(morgan("dev"));

app.use(
 "/api/tasks",
 taskRoutes
);

app.use(
 "/api/auth",
 authRoutes
);

app.use(
 "/api/tasks",
 taskRoutes
);



// Routes

app.use(
 "/api/auth",
 authRoutes
);


// Health Check

app.get("/", (req, res) => {

 res.json({

   success: true,

   message:
     "Smart Task API Running"

 });

});

module.exports = app;
