import { ApiResponse } from "@/shared";
import { Request, Response } from "express";
import _ from "lodash";

import { getAllVendor as getAll } from "@/services/vendor/vendor";

export const getAllVendor = async (req: Request, res: Response) => {
   const allVendor = await getAll();
    if (!allVendor) {
        return ApiResponse(false, "Failed", null, 400, res);
    }
    return ApiResponse(true, "All Vendor GET Successfully", allVendor, 201, res);
};