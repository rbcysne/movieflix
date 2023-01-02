import jwtDecode from 'jwt-decode';
import { Role } from "types/Role";
import { TokenData } from "types/TokenData";
import { getLoginAuthData } from './storage';


export const getTokenData = () : TokenData | undefined => {

    try {
        return jwtDecode(getLoginAuthData().access_token) as TokenData;
    } catch(error) {
        return undefined;
    }

}

export const hasAnyRoles = (roles : Role[]) : boolean => {

    const tokenData = getTokenData();

    if(tokenData !== undefined) {
        return roles.some(role => tokenData.authorities.includes(role));
    }

    return false;
}

export const isAuthenticated = () : boolean => {
    const tokenData = getTokenData();

    return ( (tokenData && (tokenData?.exp * 1000 > Date.now())) ? true : false );

}