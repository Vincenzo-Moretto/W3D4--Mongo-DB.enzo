import express from "express";
import { register, login, me } from "../controllers/authentication.controller.js";
import authorization from "../middleware/authorization.js";

const authenticationRouter = express.Router();

authenticationRouter.post("/register", register);
authenticationRouter.post("/login", login);
authenticationRouter.get("/me", authorization, me);

export default authenticationRouter;
