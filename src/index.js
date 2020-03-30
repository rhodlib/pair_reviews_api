//Imports
require("dotenv").config();
require("./db/mongoose");
const app = require("./app");


//Server listen
async function init(){
    await app.listen(4000);
    console.log("Server on port 3000")
}


init();