"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface HomeProps {
  params: any;
}
const AsignByGrade: React.FC<HomeProps> = ({ params }) => {
  const { grade } = params;
  const [data, setData]: any = useState();

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_EX}/students-by-grade?grade=${grade}`
        );
        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [grade]);

  console.log(data);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                No.
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nama
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Opsi
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data?.map((item: any, index: number) => (
              <tr key={item._id} className="hover:bg-gray-100">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {index + 1}.
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {item.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => alert(item._id)}
                  >
                    Assign
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AsignByGrade;
