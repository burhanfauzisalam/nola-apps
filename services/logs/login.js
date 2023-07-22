import { auth } from "./auth.js";

const axios = require("axios");
const GET_TOKEN = process.env.GET_TOKEN;

function login() {
  const form = document.getElementById("login-form");

  // Add a submit event listener to the form
  form.addEventListener("submit", function (event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Perform any validation or additional operations here
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const dataLogin = {
      username: username,
      password: password,
    };
    axios
      .post(GET_TOKEN, dataLogin)
      .then((response) => {
        const generateToken = response.data.token;
        // const admLogin = response.data.data;
        localStorage.setItem("token", generateToken);
        localStorage.setItem("admLogin", JSON.stringify(response.data.data));
        localStorage.setItem("onPage", 1);

        auth();
      })
      .catch((err) => {
        console.log(err.response.data.message);
        alert(err.response.data.message);
      });
  });
}

export { login };
