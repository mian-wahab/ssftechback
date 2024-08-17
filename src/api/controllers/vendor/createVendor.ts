import { ApiResponse } from "@/shared";
import { Request, Response } from "express";
import _ from "lodash";

import { addVendor } from "@/services/vendor/vendor";

export const createVendor = async (req: Request, res: Response) => {
    const user = req.body;
    const fullName = user.firstName+" "+user.lastName;
    const addNewVendor = await addVendor(user?.userName,user?.email,fullName);
    if (!addNewVendor) {
        return ApiResponse(false, "Failed to add new Vendor", null, 400, res);
    }
    return ApiResponse(true, "New Vendor Added Successfully", addNewVendor, 201, res);
};