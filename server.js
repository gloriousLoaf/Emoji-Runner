/* SERVER */
import express from "express";
import Handlebars from "handlebars";
import expressHandlebars from "express-handlebars";
import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access";
import dotenv from "dotenv";
import colors from "colors";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import * as apiRoutes from "./routes/apiRoutes.js";
import * as htmlRoutes from "./routes/htmlRoutes.js";

dotenv.config();

connectDB();

const app = express();

process.env.NODE_ENV === "development";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// routes
app.use("/api/users", userRoutes);
// require("./routes/apiRoutes")(app);
// require("./routes/htmlRoutes")(app);
app.use("/api/apiRoutes", apiRoutes);
app.use("/api/htmlRoutes", htmlRoutes);

// handlebars
app.engine(
  "handlebars",
  expressHandlebars({
    handlebars: allowInsecurePrototypeAccess(Handlebars),
  })
);

app.set("view engine", "handlebars");

// middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("API is running.");
});

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold
  )
);
