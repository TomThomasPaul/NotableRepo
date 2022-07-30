
import fs from "fs";
import path from "path";
import shortid from "shortid";



export const getAllDoctors = async (req,res,next)=>{


    const allSchedule = JSON.parse((await fs.promises.readFile(path.resolve(`${process.env.PATH_TO_JSON}`),'utf-8')).toString()); //move it into a reusable method 
    const allDoctors = []; 
    for(let doctorId in allSchedule){
      const {appointments, ...doctorDetails} = allSchedule[doctorId];
      allDoctors.push(doctorDetails)

    }


    res.status(200).json({
        results : allDoctors.length,
        allDoctors });
}

export const getAppointmentsByDay = async (req,res,next)=>{

    console.log(req.query)
    const {dId, dt} = req.query; //dId is the doctors unique id and dt is the date
    const allSchedule = JSON.parse((await fs.promises.readFile(path.resolve(`${process.env.PATH_TO_JSON}`),'utf-8')).toString()); //move it into a reusable method 
    const allAppointments = [];
    //find doctor for the given id
    const doctorFound = allSchedule[dId];

    //get all appointments for the doctor for the given date
    const {appointments, ...doctorDetails} = doctorFound;
       for(let appId in appointments){
            
        if(appointments[appId].timeSlot.date === dt){
            allAppointments.push(appointments[appId]);
        }

       }

    res.status(200).json({
        results: allAppointments.length,
        doctor : doctorDetails,
        date : dt,
        allAppointments
        });
}






export const addAppointment = async (req,res,next)=>{

    const {doctorUniqueId, newAppointment} = req.body;
    let currentSchedule = JSON.parse((await fs.promises.readFile(path.resolve(`${process.env.PATH_TO_JSON}`),'utf-8')).toString()); //move it into a reusable method 
    
    //find doctor
    const doctor = currentSchedule[doctorUniqueId];
    const newAppId = shortid.generate();

    doctor.appointments[newAppId] = newAppointment;
    newAppointment.appointmentId = newAppId;
 
    await fs.promises.writeFile(`./data/schedule.json`,JSON.stringify(currentSchedule),'utf-8');
 
 
    res.status(201).json({
     message : "Appointment Added",
     newAppointment
    })
 }




//delete appointment from doctors calendar

export const deleteAppointment = async (req,res,next)=>{ //delete an appointment

   
    
    const {docId, appointmentId} = req.params;
    console.log(docId, appointmentId)
        
    let currentSchedule = JSON.parse((await fs.promises.readFile(path.resolve(`${process.env.PATH_TO_JSON}`),'utf-8')).toString()); //move it into a reusable method 
    
     //find doc and appointment to remove
    const appointments = currentSchedule[docId].appointments;
    delete appointments[appointmentId];
    
    
    await fs.promises.writeFile(path.resolve(`${process.env.PATH_TO_JSON}`),JSON.stringify(currentSchedule),'utf-8');
    
    
    
    res.status(204).json({});
    
    }
