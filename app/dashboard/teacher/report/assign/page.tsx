"use client";
import React from "react";
import { useRouter } from "next/navigation";

const AssignData = () => {
  const { push } = useRouter();
  const url = "/dashboard/teacher/report/assign/";
  const paketA = [1, 2, 3, 4, 5, 6];
  const paketB = [7, 8, 9];
  const paketC = [10, 11, 12];
  return (
    <div className="container mx-auto p-4">
      {/* Paket A */}
      <div className="mb-8 text-center">
        <h3 className="text-2xl font-semibold mb-2">Paket A</h3>
        <span className="text-lg">Grade: </span>
        <div className="flex justify-center mt-2">
          {paketA.map((item: any, index: any) => (
            <button
              key={index}
              className="btn px-4 py-2 bg-blue-500 text-white rounded mx-2 hover:bg-blue-600"
              onClick={() => push(`${url}/${item}`)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <hr className="border-gray-300 my-4" />

      {/* Paket B */}
      <div className="mb-8 text-center">
        <h3 className="text-2xl font-semibold mb-2">Paket B</h3>
        <span className="text-lg">Grade: </span>
        <div className="flex justify-center mt-2">
          {paketB.map((item: any, index: any) => (
            <button
              key={index}
              className="btn px-4 py-2 bg-yellow-500 text-white rounded mx-2 hover:bg-yellow-600"
              onClick={() => push(`${url}/${item}`)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <hr className="border-gray-300 my-4" />

      {/* Paket C */}
      <div className="mb-8 text-center">
        <h3 className="text-2xl font-semibold mb-2">Paket C</h3>
        <span className="text-lg">Grade: </span>
        <div className="flex justify-center mt-2">
          {paketC.map((item: any, index: any) => (
            <button
              key={index}
              className="btn px-4 py-2 bg-green-500 text-white rounded mx-2 hover:bg-green-600"
              onClick={() => push(`${url}/${item}`)}
            >
              {item}
            </button>
          ))}
          {/* <button className="btn px-4 py-2 bg-green-500 text-white rounded mx-2 hover:bg-green-600">
            8
          </button>
          <button className="btn px-4 py-2 bg-green-500 text-white rounded mx-2 hover:bg-green-600">
            7
          </button>
          <button className="btn px-4 py-2 bg-green-500 text-white rounded mx-2 hover:bg-green-600">
            9
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default AssignData;
