import { auth } from "./auth";

const logout = () => {
  localStorage.clear();
  auth();
};

export { logout };
