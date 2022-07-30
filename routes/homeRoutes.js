import express from "express";
import * as homeController from "../controllers/homeController.js"

export const router = express.Router();

router.route("/").get(homeController.welcome);