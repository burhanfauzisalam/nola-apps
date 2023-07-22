import { LoginPage } from "../../pages/LoginPage.js";
import { dashboard } from "../../pages/Dashboard.js";
import { config } from "../config/config.js";

const axios = require("axios");
const CEK_TOKEN = process.env.CEK_TOKEN;

const auth = () => {
  const token = localStorage.getItem("token");
  const conn = config();

  if (!token) {
    return LoginPage();
  } else {
    axios
      .get(CEK_TOKEN, conn.config)
      .then((result) => {
        dashboard();
        // const getData = async (option) => {
        //   switch (option) {
        //     case "1":
        //       const result1 = dashboard();
        //       return result1;
        //     case "2":
        //       const result2 = parents();
        //       return result2;
        //     default:
        //       throw new Error("Opsi tidak valid");
        //   }
        // };
        // const main = async () => {
        //   try {
        //     await getData(localStorage.getItem("onPage"));
        //   } catch (error) {
        //     console.error(error);
        //   }
        // };
        // main();
      })
      .catch((err) => {
        localStorage.clear();
        alert(err.response.data.message);
        LoginPage();
      });
  }
};

export { auth };
