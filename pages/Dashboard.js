import { logout } from "../services/logs/logout";

const dashboard = () => {
  const body = document.querySelector("body");
  body.innerHTML = "";
  const createMain = document.createElement("main");
  body.appendChild(createMain);
  const main = document.querySelector("main");
  main.innerHTML = `
    <h1>Anda berada di halaman dashboard<i class="bi bi-heart"></i></h1>
    <button id="logout" class="btn btn-danger"><i class="bi bi-box-arrow-in-left"></i> Logout</button>
  `;
  const logoutBtn = document.getElementById("logout");
  logoutBtn.addEventListener("click", logout);
};

export { dashboard };
