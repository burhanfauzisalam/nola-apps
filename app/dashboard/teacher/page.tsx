"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import FileUploadForm from "@/app/components/UploadSebFile";

const TeacherPage = () => {
  const session: any = Cookies.get("token");
  const sessionParse = JSON.parse(session ? session : null);
  const token = sessionParse?.token;
  const [user, setUser]: any = useState();
  useEffect(() => {
    const getUser = async () => {
      try {
        const url: any = process.env.NEXT_PUBLIC_API_TEACHER;
        const res = await axios.get(url, { headers: { token } });
        setUser(res.data);
      } catch (error: any) {
        console.log(error.response.message);
      }
    };
    getUser();
  }, []);
  return (
    <>
      <FileUploadForm />
    </>
  );
};

export default TeacherPage;
