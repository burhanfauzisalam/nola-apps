import React from "react";
import LoginPage from "../components/LoginPage";

const StudentLoginPage = () => {
  const pageFor = "teachers and parents";
  const url = process.env.NEXT_PUBLIC_API_LOGIN;
  return <LoginPage data={{ url, pageFor }} />;
};

export default StudentLoginPage;
