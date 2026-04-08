import { loginRequest } from "./externalServices.mjs";
import { alertMessage, getLocalStorage, setLocalStorage } from "./utils.mjs";
import { jwtDecode } from "jwt-decode";

const tokenKey = "so_token";
export async function login(creds, redirect = "/") {
    try {
        const token = await loginRequest(creds);
        setLocalStorage(tokenKey, token);

        window.location = redirect;
    } catch (err) {
        alertMessage(err.message.message);
    }
}

export function checkLogin() {
    const token = getLocalStorage(tokenKey)
    if (isTokenValid(token)) {
        return token
    }
    
    localStorage.removeItem(tokenKey)
    let path = window.location.pathname
    window.location = "/login/index.html?redirect=" + path
}

function isTokenValid(token) {
    if (token) {
        const decoded = jwtDecode(token)

        var now = new Date()

        if (decoded.exp * 1000 < now.getTime()) {
            console.log("expired login")
            return false
        }
        return true
    }
    return false
}

