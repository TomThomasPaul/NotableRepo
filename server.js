
import dotenv from "dotenv"
import { loadInitialSchedule } from "./utils/loadSchedule.js";
dotenv.config({path: `./config.env`})
const port = process.env.PORT;

import app from "./app.js";
app.listen(port,  async ()=>{

await loadInitialSchedule();  //load initial schedule data

console.log("listening on port!! ", port)

})
