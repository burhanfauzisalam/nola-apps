"use client"; // pages/index.js
import { useEffect, useState } from "react";
import MyChart from "../../components/chart";
import axios from "axios";
import EditableTable from "@/app/components/EditTable";

interface HomeProps {
  params: any;
}
const HomePage: React.FC<HomeProps> = ({ params }) => {
  const { id } = params;
  const [data, setData] = useState();
  const [error, setError] = useState();

  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       const res = await axios.get(
  //         `${process.env.NEXT_PUBLIC_API_EX}/report-card/transform?id=667d068900fd73be75c8467f&sid=${id}`
  //       );
  //       setData(res.data);
  //     } catch (error: any) {
  //       setError(error.response.data.message);
  //     }
  //   };
  //   getData();
  // }, []);
  // console.log(data);
  return (
    <>
      {/* {error ? (
        <h1>{error}</h1>
      ) : (
        <div style={{ height: "250px", width: "250px" }}>
          <h1>Chart Example</h1>
          <MyChart data={data} />
        </div>
      )} */}
      <EditableTable id={id} />
    </>
  );
};

export default HomePage;
