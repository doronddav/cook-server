const express = require("express");
const recipeRouter = require("./routes/recipeRoutes");
const cors = require("cors");

const server = express();
const port = process.env.PORT || 3000;

server.use(cors());

server.use(express.json());
server.use("/recipes", recipeRouter);
// server.get("/", recipeRouter);

server.listen(port, () => console.log(`server is listening on port ${port}`));

module.exports = server;
