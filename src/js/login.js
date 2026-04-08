import { loadHeaderFooter } from "./utils.mjs";
import { getParam } from "./utils.mjs";
import { login } from "./auth.mjs"

loadHeaderFooter();

const redirect = getParam("redirect");

document.querySelector("#login_btn").addEventListener("click", function(e) {
    e.preventDefault();
    const form = document.querySelector("#login_form")
    let email = document.querySelector("#email").value
    let password = document.querySelector("#password").value
    login({email , password}, redirect)
}) 


