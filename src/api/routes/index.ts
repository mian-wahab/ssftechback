import { Router } from "express";
const router = Router();

import auth from './auth';
import user from './user';
import task from './task';
import convertedFile from './convertedFile'

import { Authentication, Authorization } from "@/middlewares";
import { UserRoles } from "../models/user/enum";

router.use('/auth', auth);
router.use('/user', Authentication, Authorization([UserRoles.ADMIN]),  user);
router.use('/task', Authentication, Authorization([UserRoles.ADMIN, UserRoles.USER]),  task);
router.use('/convertedFile', convertedFile)



export default router;