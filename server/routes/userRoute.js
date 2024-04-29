import express from "express";
import { createUser, login, getMyProfile,logout } from "../controllers/user.js";
import { registerValidator, loginValidator } from "../lib/validators.js";
import { isAuthenticated } from "../middleware/auth.js";

const app = express.Router();

app.post("/createUser", registerValidator(), createUser);
app.post("/login", loginValidator(), login);

// After here user must be logged in to access the routes
app.use(isAuthenticated);
app.get("/me", getMyProfile);
app.get("/logout", logout);


export default app;