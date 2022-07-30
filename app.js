import express from "express";
import {router as adminRouter} from "./routes/adminRoutes.js"
import {router as homeRouter} from "./routes/homeRoutes.js"



const app = express();

app.use(express.json()) //body parser

app.use('/', homeRouter)
app.use('/api/admin', adminRouter)


export default app;