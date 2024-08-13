import { ApiResponse } from "@/shared";
import { Request, Response } from "express";
import _ from "lodash";
import { createUser } from "@/services/user/user";
import { UserRoles } from "@/api/models/user/enum";
import { VendorInput } from "./types";
import { createFtpInBulk } from "@/services/ftp/ftp";

export const AddVendor = async (req: Request, res: Response) => {
    const user = req.body as VendorInput;
    req.body.role = UserRoles.VENDOR;
    const addNewVendor = await createUser(user);
    if(addNewVendor?._id) {
        const ftpData = req?.body?.ftpData;
        await createFtpInBulk(ftpData);
    } else {
        throw new Error('Vendor not created');
    }
    return ApiResponse(true, "New Vendor Added Successfully", addNewVendor, 201, res);
};