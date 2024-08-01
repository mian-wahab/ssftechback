import { UserRoles } from "@/api/models/user/enum";


export interface Login {
    user: string;
    password: string;
}

export interface JWTEncryptedData {
    id: string;
    userName: string;
    email: string;
    fullName: string;
    role:UserRoles;
}