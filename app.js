import express from "express";
import userRouter from "./routes/user.routes.js"
import taskRouter from "./routes/task.routes.js"
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from 'cors';
export const app = express();

config({
    path: './data/config.env'
})

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: [process.env.FRONTEND_URL],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials:true //send the headers 
}))

//routes
app.use('/api/v1/users',userRouter);
app.use('/api/v1/task',taskRouter);

app.get("/", (req, res) => {
  res.send("Welcome");
});

app.use(errorMiddleware)


