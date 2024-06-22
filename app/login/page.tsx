import React from "react";
import LoginPage from "../components/LoginPage";

const StudentLoginPage = () => {
  const pageFor = "teachers and parents";
  const apiUrl = process.env.NEXT_PUBLIC_API_LOGIN;
  return <LoginPage data={{ apiUrl, pageFor }} />;
};

export default StudentLoginPage;
