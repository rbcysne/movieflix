import { Role } from "./Role";

export type TokenData = {
    exp: number,
    user_name: string,
    authorities: Role[],
}