const express = require("express");
const recipes = require("./data/recipes");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const recipeRoutes = require("./routes/recipeRoutes");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");

const app = express();
dotenv.config();
connectDB();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running..");
});

//app.get("/api/recipes", (req, res) => {
//  res.json(recipes);
//});

app.use("/api/users", userRoutes);
app.use("/api/recipes", recipeRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server launched on PORT ${PORT}`));
