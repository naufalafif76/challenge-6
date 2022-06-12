require('dotenv').config()

const cors = require('cors')
const express = require("express");
const morgan = require("morgan");
const router = require("../config/routes");
// const path = require("path");

// const publicDir = path.join(__dirname, "../public");
// const viewsDir = path.join(__dirname, "./views");
const app = express();
console.clear();

/** Install JSON request parser */
app.use(express.json());
app.use(cors())

/** Install request logger */
app.use(morgan("dev"));

/** Install View Engine */
// app.set("views", viewsDir);
// app.set("view engine", "ejs");

/** Set Public Directory */
// app.use(express.static(publicDir));

/** Install Router */
app.use(router);

module.exports = app;
