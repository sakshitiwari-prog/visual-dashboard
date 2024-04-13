const express = require("express");
const app = express();
var cors = require("cors");
const visualRouter = require("./routes/visual-routes");

require("./config/db");
app.use(express.json());
app.use(cors());
app.use("/visual", visualRouter);

app.listen(5000, () => console.log("app started at 5000..."));
