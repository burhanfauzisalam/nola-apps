"use client";

import SmallResponsiveCard from "@/app/components/CardAssessment";
import React from "react";

const AssessmentPage = () => {
  return (
    <div className="row">
      <div className="col-12 col-md-6 col-lg-6 col-xl-6">
        <SmallResponsiveCard
          data={{
            title: "Upload",
            link: "/dashboard/teacher/assessment/upload-seb-file",
          }}
        />
      </div>
      <div className="col-12 col-md-6 col-lg-6 col-xl-6">
        <SmallResponsiveCard
          data={{
            title: "SEB Files",
            link: "/dashboard/teacher/assessment/seb-files",
          }}
        />
      </div>
    </div>
  );
};

export default AssessmentPage;
