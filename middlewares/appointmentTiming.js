import axios from "axios";
import fs from "fs";
import path from "path"

export const checkAppointmentInterval = async (req,res,next)=>{
    const allowedIntervals = ["00","15","30", "45"];
    const {newAppointment} = req.body;
    const appTime = newAppointment.timeSlot.time;

    const minute = appTime.split(':')[1].split(" ")[0]  //Incoming time is of shape 08:30 AM
    if(!allowedIntervals.includes(minute)){
        res.status(400).json({
            message: "Appointment times can only be scheduled evry 15 minutes. Please update the appointment time. Example 08:15 AM is valid but 08:20 AM is not a valid time"
        })
    }else{

        return next();
    }
    

}

export const  checkNumberOfAppointments = async (req,res,next)=>{

    const {doctorUniqueId, newAppointment} = req.body;

    //check date for which appointment needs to be created
    const dateForAppointment = newAppointment.timeSlot.date;

    //get all appointments for the particular doctor and date
  // const apiData =  await axios.get(`http://localhost:1440/api/admin/appointments?dId=${doctorUniqueId}&&dt=${dateForAppointment}`)

  const allSchedule = JSON.parse((await fs.promises.readFile(path.resolve(`${process.env.PATH_TO_JSON}`),'utf-8')).toString()); //move it into a reusable method 
  //find doctor for the given id
  const doctorFound = allSchedule[doctorUniqueId];
 const allAppointmentsForTheDay =[];
  //get all appointments for the doctor for the given date
  const {appointments} = doctorFound;
     for(let appId in appointments){
          
      if(appointments[appId].timeSlot.date === dateForAppointment){
        allAppointmentsForTheDay.push(appointments[appId])
      }

     }
     if(allAppointmentsForTheDay.length===3){
        res.status(400).json({
          message : "APPOINTMENTS are booked out for the time provided"

        })
     }else{

         return next();
     }
   

}