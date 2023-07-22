import css from "../style/style.css";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import { auth } from "./logs/auth";

const app = () => {
  auth();
};

app();
