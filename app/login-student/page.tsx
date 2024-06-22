import React from "react";
import LoginPage from "../components/LoginPage";

const StudentLoginPage = () => {
  const pageFor = "students";
  const apiUrl = process.env.NEXT_PUBLIC_API_LOGIN_STUDENT;
  return <LoginPage data={{ apiUrl, pageFor }} />;
};

export default StudentLoginPage;
