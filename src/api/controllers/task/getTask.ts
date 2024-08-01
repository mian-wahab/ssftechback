import { ApiResponse } from "@/shared";
import { Request, Response } from "express";
import { getAll } from "@/services/user/user";
import { getAllTasks, getAllPaginatedTasks, findTaskById, filterTasks } from "@/services/task/task";
import { AuthenticatedRequest } from "@/middlewares/types";
import { JWTEncryptedData } from "../authentication/types";
import { TaskFilter } from "@/services/task/types";

export const GetAll = async (req: AuthenticatedRequest, res: Response) => {
    const fields = await getAllTasks(req?.user as JWTEncryptedData);
    return ApiResponse(true, "Tasks Fetched Successfully", fields, 200, res);
};

export const GetAllPaginatedTasks = async (req: AuthenticatedRequest, res: Response) => {
    const fields = await getAllPaginatedTasks(req?.user as JWTEncryptedData, Number(req?.query?.page), Number(req?.query?.limit));
    return ApiResponse(true, "Tasks Fetched Successfully", fields, 200, res);
}

export const GetById = async (req: Request, res: Response) => {
    const id = req?.params?.id as string;
    const task = await findTaskById(id);
    return ApiResponse(true, "Task Fetched Successfully", task, 200, res);
}

export const GetFilteredTasks = async (req: AuthenticatedRequest, res: Response) => {
    const { status, dueDate, keyword, page = 1, limit = 10 } = req?.query;
    const filter = {
        status,
        dueDate,
        keyword
    } as TaskFilter;
    const fields = await filterTasks(req?.user as JWTEncryptedData, Number(page), Number(limit), filter);
    return ApiResponse(true, "Tasks Fetched Successfully", fields, 200, res);
}