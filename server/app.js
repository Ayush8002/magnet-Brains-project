import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./utils/features.js";
import userRoute from "./routes/userRoute.js";
import taskRoute from "./routes/taskRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config({
    path: "./.env",
});

const mongoURI = process.env.MONGO_URI;
const port = process.env.PORT || 3000;

connectDB(mongoURI);

const app = express();

// Using Middlewares Here
app.use(cors());
app.use(express.json());
app.use(cookieParser());


// Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/task", taskRoute);


app.listen(port, () => {
    console.log(`Server is running on port https://localhost/${port}`);
});

