import express from "express";
import * as adminController from "../controllers/adminController.js"
import {checkAppointmentInterval, checkNumberOfAppointments} from "../middlewares/appointmentTiming.js"

export const router = express.Router();


router.route("/doctors")
.get(adminController.getAllDoctors)

router.route("/appointments")
.get(adminController.getAppointmentsByDay)
.post(checkAppointmentInterval, checkNumberOfAppointments, adminController.addAppointment)

router.route("/appointments/:docId/:appointmentId")
.delete(adminController.deleteAppointment)

