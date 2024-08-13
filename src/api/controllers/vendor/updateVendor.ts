import { ApiResponse } from "@/shared";
import { Request, Response } from "express";
import { updateUser } from "@/services/user/user";
import { UserInput } from "@/services/user/types";
import { UserRoles } from "@/api/models/user/enum";

export const UpdateUser = async (req: Request, res: Response) => {
   const id = req?.params?.id as string;
   const user = req?.body as UserInput;
   req.body.role = UserRoles.VENDOR;
   const updatedUser = await updateUser(id, user)
   return ApiResponse(true, "Vendor Updated Successfully", updatedUser, 201, res);
};