import  express  from "express";
import { login, register } from "../controllers/authController";
import { asyncHandler } from "../utils/asyncHandler";

export const router =  express.Router()

router.post('/register',asyncHandler(register))
router.post('/login',asyncHandler(login))