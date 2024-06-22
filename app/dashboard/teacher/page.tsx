"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import FileUploadForm from "@/app/components/UploadSebFile";
import SmallResponsiveCard from "@/app/components/CardAssessment";

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
      <div className="row">
        <div className="col-12 col-md-6 col-lg-6 col-xl-6">
          <SmallResponsiveCard
            data={{
              title: "Upload",
              link: "/dashboard/teacher/upload-seb-file",
            }}
          />
        </div>
        <div className="col-12 col-md-6 col-lg-6 col-xl-6">
          <SmallResponsiveCard
            data={{ title: "SEB Files", link: "/dashboard/teacher/seb-files" }}
          />
        </div>
      </div>
      <FileUploadForm />
    </>
  );
};

export default TeacherPage;
