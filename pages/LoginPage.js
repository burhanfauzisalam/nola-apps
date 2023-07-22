import { login } from "../services/logs/login";

const LoginPage = () => {
  const LoginForm = `
        <form id="login-form">
        <div class="row">
            <div class="col-12">
                <input type="text" id="username" placeholder="Input your username" required />
            </div>
            <div class="col-12">
                <input type="password" id="password" placeholder="Input your password" required />
            </div>
            <div class="col-12">
                <button type="submit" class="btn btn-info"><i class="bi bi-box-arrow-in-right"></i> Login</button>
            </div>
        </div>
        </form>
    `;
  document.getElementsByTagName("body")[0].innerHTML = LoginForm;
  login();
};

export { LoginPage };
