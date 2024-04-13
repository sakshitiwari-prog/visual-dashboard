const mongoose = require("mongoose");

async function main() {
  try {
    await mongoose.connect("mongodb://localhost:27017/visual-dashboard");
    console.log("Connected to DB")
  } catch {
    console.log("error occured while connecting");
  }
}
main();
