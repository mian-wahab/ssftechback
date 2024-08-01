import { ApiResponse } from "@/shared";
import { Request, Response } from "express";
import { deleteTask } from "@/services/task/task";

export const Delete = async (req: Request, res: Response) => {
    const id = req?.params?.id as string;
    const DeletedTask = await deleteTask(id);
    return ApiResponse(true, "User Deleted Successfully", DeletedTask, 201, res);
 };