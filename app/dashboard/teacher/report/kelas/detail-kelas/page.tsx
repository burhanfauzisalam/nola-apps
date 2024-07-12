"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";

const ClassDetailContent = () => {
  const searchParams = useSearchParams();
  const subject = searchParams.get("subject");
  const teacher = searchParams.get("teacher");
  const schoolYear = searchParams.get("schoolYear");

  const [data, setData]: any = useState(null);
  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_EX}/subject?subject=${subject}&teacher=${teacher}&schoolYear=${schoolYear}`
      );
      setData(res.data);
    };
    getData();
  }, []);
  // console.log(data);
  return (
    <div className="container mt-5">
      <h1>Class Detail</h1>
      <p>
        <strong>Subject:</strong> {data?.subject}
      </p>
      <p>
        <strong>Teacher:</strong> {data?.teacher}
      </p>
      <p>
        <strong>School Year:</strong> {data?.schoolYear}
      </p>
      {/* Add more details or components to handle class details */}
    </div>
  );
};

const ClassDetailPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ClassDetailContent />
    </Suspense>
  );
};

export default ClassDetailPage;
