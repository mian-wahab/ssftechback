import { ApiResponse } from "@/shared";
import { Request, Response } from "express";
import _ from "lodash";
import { createNewTask } from "@/services/task/task";
import { TaskInput } from "@/services/task/types";

export const AddTask = async (req: Request, res: Response) => {
    const task = req.body as TaskInput;
    const addNewUser = await createNewTask(task);
    return ApiResponse(true, "New Task Added Successfully", addNewUser, 201, res);
};