import fs from "fs";
import ALL_SCHEDULE from "../data/allSchedule.js";
import path from "path";

export const loadInitialSchedule = async ()=>{

//write to json file if file is empty on running server
const scheduleJson = (await fs.promises.readFile(path.resolve(`${process.env.PATH_TO_JSON}`),'utf-8')).toString();
if(!scheduleJson){
    
    
    await fs.promises.writeFile(path.resolve(`${process.env.PATH_TO_JSON}`),JSON.stringify(ALL_SCHEDULE),'utf-8');
}

}