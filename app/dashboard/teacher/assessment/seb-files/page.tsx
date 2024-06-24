"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoMdOpen } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoMdCopy } from "react-icons/io";
import Cookies from "js-cookie";

const FileTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const session: any = Cookies.get("token");
  const sessionParse = JSON.parse(session ? session : null);
  const token = sessionParse?.token;

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(`https://api.nola.sch.id/api/seb`, {
          headers: { token: token },
        });
        setData(res.data.reverse());
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      }
    };
    getData();
  }, []);

  const handleCopyClick = (url: any) => {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        alert("Text copied to clipboard!");
      })
      .catch((err) => {
        console.error("Could not copy text: ", err);
      });
  };

  const handleDelete = async (urlFileName: any) => {
    if (!urlFileName) {
      alert("No file to delete");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("filename", urlFileName);

      const res = await axios.post(
        "https://seb.nola.sch.id/delete.php",
        formData
      );

      if (res.data.status === "success") {
        setResponseMessage("File deleted successfully.");
        await axios.delete(
          `https://api.nola.sch.id/api/seb?url=${urlFileName}`,
          { headers: { token } }
        );
        setData((prevData) =>
          prevData.filter((item: any) => item.url !== urlFileName)
        );
      } else {
        setResponseMessage(`Error: ${res.data.message}`);
      }
    } catch (error) {
      console.error("Error deleting file:", error);
      setResponseMessage("Error deleting file.");
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = (url: any) => {
    window.location.href = url;
  };

  return (
    data.length > 0 && (
      <div className="container mx-auto px-4 py-5">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
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
              {data.map((item: any) => (
                <tr
                  key={item._id}
                  className="even:bg-gray-100 hover:bg-gray-200"
                >
                  <td className="px-4 py-2 border">{item.filename}</td>
                  <td className="px-4 py-2 border">{item.grade.join(", ")}</td>
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
                      <button
                        className="btn btn-success"
                        onClick={() => handleCopyClick(item.url)}
                        disabled={loading}
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Copy URL"
                      >
                        <IoMdCopy />
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(item.url)}
                        disabled={loading}
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Delete file"
                      >
                        <RiDeleteBin6Line />
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
    )
  );
};

export default FileTable;
