const express = require('express');
const dotenv = require('dotenv');
const taskRoute =require("./route/route")
const practiseRoute =require("./route/practiseRoute")
const bodyParser = require("body-parser");

dotenv.config();

const app = express();
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Headers, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization");
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH, OPTIONS');
  next()
});
const port = process.env.PORT;
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use("/user",taskRoute)
app.use("/practise",practiseRoute)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});