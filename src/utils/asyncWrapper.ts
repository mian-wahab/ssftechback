import { NextFunction, Request, Response } from "express";
import { ApiResponse } from "@/shared";

export const AsyncWrapper = (fn: any) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await fn(req, res);
        return result; 
    } catch (error) {
        const { message, statusCode } = error;
        return ApiResponse(false, message, error, statusCode, res);
    }
}
