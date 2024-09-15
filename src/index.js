const express = require("express");
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");
const routes = require("./routes");
const cor = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cor());
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
routes(app);

mongoose
  .connect(`${process.env.MONGO_DB}`)
  .then(() => {
    console.log("connected to mongoDB success ");
  })
  .catch((err) => {
    console.log("connected to mongoDB failed ", err);
  });

app.listen(port, () => {
  console.log(`Server is running on port:` + port);
});
