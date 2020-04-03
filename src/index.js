//Imports
require("dotenv").config();
require("./db/mongoose");
const app = require("./app");

//Server listen
async function init() {
  await app.listen(app.get("port"));
  console.log("Server on port ", app.get("port"));
}

init();
