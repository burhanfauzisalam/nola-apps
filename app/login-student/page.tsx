import React from "react";
import LoginPage from "../components/LoginPage";

const StudentLoginPage = () => {
  const pageFor = "students";
  const url = process.env.NEXT_PUBLIC_API_LOGIN_STUDENT;
  return <LoginPage data={{ url, pageFor }} />;
};

export default StudentLoginPage;
