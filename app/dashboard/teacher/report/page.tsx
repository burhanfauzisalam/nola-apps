"use client";
import SmallResponsiveCard from "@/app/components/CardAssessment";
import React from "react";

const TeacherReportPage = () => {
  const url = "/dashboard/teacher/report";
  return (
    <>
      <div className="row conatiner">
        <div className="col-6 col-md-4">
          <SmallResponsiveCard
            data={{
              title: "Input Nilai",
              link: `${url}/input`,
            }}
          />
        </div>
        <div className="col-6 col-md-4">
          <SmallResponsiveCard
            data={{ title: "Assign Data", link: `${url}/assign` }}
          />
        </div>
        <div className="col-6 col-md-4">
          <SmallResponsiveCard
            data={{ title: "Kelas", link: `${url}/kelas` }}
          />
        </div>
      </div>
    </>
  );
};

export default TeacherReportPage;
