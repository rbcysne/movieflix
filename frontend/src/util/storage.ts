import { LoginResponse } from "types/LoginResponse";

const loginAuthData = "loginAuthData";

export const saveLoginAuthData = (loginObj : LoginResponse) => {
    localStorage.setItem(loginAuthData, JSON.stringify(loginObj));
}

export const getLoginAuthData = () => {
    return JSON.parse(localStorage.getItem(loginAuthData) ?? "{}") as LoginResponse;
}

export const removeLoginAuthData = () => {
    localStorage.removeItem(loginAuthData);
}