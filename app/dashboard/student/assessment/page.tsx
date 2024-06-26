"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoMdOpen } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoMdCopy } from "react-icons/io";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const StudentAssessmentPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const session: any = Cookies.get("token");
  const sessionParse = JSON.parse(session ? session : null);
  const token = sessionParse?.token;
  const { push } = useRouter();

  const [user, setUser]: any = useState();

  useEffect(() => {
    const getData = async () => {
      try {
        const getUSer = await axios.get(
          `${process.env.NEXT_PUBLIC_API_EX}/student`,
          { headers: { token } }
        );
        setUser(getUSer.data);
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_EX}/seb`, {
          headers: { token: token },
        });
        const rawData = res.data.reverse();
        const filteredDataByGrade = rawData
          ? rawData.filter((item: any) =>
              item.grade.includes(getUSer.data.grade)
            )
          : rawData;

        setData(filteredDataByGrade);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      }
    };
    getData();
  }, [token]);

  const handleOpen = (url: string) => {
    window.location.href = url;
  };

  const handleSearchChange = (event: any) => {
    setSearchQuery(event.target.value);
  };

  const filteredData = data.filter((item: any) =>
    item.filename.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="container mx-auto px-4 pt-5">
        <button
          className="btn btn-secondary"
          onClick={() =>
            push(
              "https://drive.usercontent.google.com/download?id=1Qsdw39kF6-2c7BS4J7K60Nn-YmXs1lwf&export=download&authuser=0&confirm=t&uuid=2f7209f0-5fdb-4a28-b939-06842437167f&at=APZUnTUuQ0l5hSa9vX-K8RYwe4aN:1719286445453"
            )
          }
        >
          Download SEB for Windows OS
        </button>
        <button
          className="btn btn-secondary ml-2"
          onClick={() =>
            push(
              "https://drive.usercontent.google.com/download?id=1mr15WtAWNfN-DT5ZcLfcmKJM6JESaJxj&export=download&authuser=0&confirm=t&uuid=67adcd72-ede4-49af-a1ee-0a2fe4a77256&at=APZUnTXtzLrlEBw_GNe3uNQzmb5o:1719286572400"
            )
          }
        >
          Download SEB for Mac OS
        </button>
      </div>

      <div className="container mx-auto px-4 pt-4">
        <input
          type="text"
          className="form-input mt-1 block form-control"
          placeholder="&#x1F50D; Search by filename..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      {filteredData.length > 0 && (
        <div className="container mx-auto px-4 pb-5 pt-2">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-100">
              <thead>
                <tr>
                  <th className="px-4 py-2 border">Filename</th>
                  <th className="px-4 py-2 border">Grade</th>
                  <th className="px-4 py-2 border">Subject</th>
                  <th className="px-4 py-2 border">Assessment</th>
                  <th className="px-4 py-2 border">Teacher</th>
                  <th className="px-4 py-2 border">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item: any) => (
                  <tr
                    key={item._id}
                    className="even:bg-gray-100 hover:bg-gray-200"
                  >
                    <td className="px-4 py-2 border">{item.filename}</td>
                    <td className="px-4 py-2 border">
                      {item.grade.join(", ")}
                    </td>
                    <td className="px-4 py-2 border">{item.subject}</td>
                    <td className="px-4 py-2 border">{item.assessment}</td>
                    <td className="px-4 py-2 border">{item.teacher}</td>
                    <td className="px-4 py-2 border">
                      <div className="flex space-x-2">
                        <button
                          className="btn btn-primary"
                          onClick={() => handleOpen(item.url)}
                          data-toggle="tooltip"
                          data-placement="top"
                          title="Open"
                        >
                          <IoMdOpen />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {responseMessage && (
              <p className="mt-4 text-center text-red-600">{responseMessage}</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default StudentAssessmentPage;
