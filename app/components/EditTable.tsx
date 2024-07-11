// app/page.js

"use client"; // Menandai sebagai Client Component

import axios from "axios";
import { useState, useEffect } from "react";

interface editProps {
  id: any;
}

const EditableTable: React.FC<editProps> = ({ id }) => {
  const [data, setData] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const requestData = {
    studentID: id,
    schoolYear: "2024/2025",
    subject: "game",
  };
  // Fetch data from the server
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_EX}/report-card/data`,
          requestData
        );
        console.log(res.data);
        setData(res.data.data.rubrics);
      } catch (error) {
        alert(error);
      }
    };
    getData();
  }, [requestData]);

  // Handle edit
  const handleEdit = (index: number) => {
    setIsEditing(index);
  };

  // Handle save
  const handleSave = async (index: number) => {
    const updatedData = [...data];
    const dataUpdate = updatedData[index];

    // console.log(updatedData);
    // console.log(dataUpdate);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_EX}/report-card/input-value`,
        { ...requestData, updatedData }
      );
      setData(updatedData);
      setIsEditing(null);
      // console.log(dataUpdate);
      // console.log(res.data);
    } catch (error: any) {
      console.log(error.response.data);
    }
    // Simpan perubahan ke server
    // const response = await fetch("/api/data", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(updatedData[index]),
    // });

    // if (response.ok) {
    //   // Update state jika berhasil

    // } else {
    //   alert("Failed to save data");
    // }
  };

  // Handle change in input
  const handleChange = (
    rowIndex: number,
    key: string,
    value: any,
    arrayIndex?: number
  ) => {
    const updatedData: any = [...data];
    if (arrayIndex !== undefined) {
      // Mengubah nilai dalam array semester1 atau semester2
      updatedData[rowIndex][key][arrayIndex] = value;
    } else {
      // Mengubah nilai untuk item
      updatedData[rowIndex][key] = value;
    }
    setData(updatedData);
  };

  return (
    <div className="container">
      <h1>Editable Tables</h1>

      <h2 className="pt-5">Semester 1</h2>
      <table className="min-w-full bg-white border-collapse">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-center">
              Item
            </th>
            <th className="border border-gray-300 px-4 py-2 text-center">
              Semester 1
            </th>
            <th className="border border-gray-300 px-4 py-2 text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.map((row: any, rowIndex: number) => (
            <tr key={row._id}>
              <td className="border border-gray-300 px-4 py-2">{row.item}</td>
              <td className="border border-gray-300 px-4 py-2">
                {row.semester1.map((sem1Value: any, sem1Index: number) => (
                  <input
                    key={sem1Index}
                    type="number"
                    value={sem1Value}
                    onChange={(e) =>
                      handleChange(
                        rowIndex,
                        "semester1",
                        e.target.value,
                        sem1Index
                      )
                    }
                    disabled={isEditing !== rowIndex}
                    style={{ width: "40px", marginRight: "5px" }}
                  />
                ))}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {isEditing === rowIndex ? (
                  <button onClick={() => handleSave(rowIndex)}>Save</button>
                ) : (
                  <button onClick={() => handleEdit(rowIndex)}>Edit</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2 className="pt-5">Semester 2</h2>
      <table className="min-w-full bg-white border-collapse">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-center">
              Item
            </th>
            <th className="border border-gray-300 px-4 py-2 text-center">
              Semester 2
            </th>
            <th className="border border-gray-300 px-4 py-2 text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((row: any, rowIndex: number) => (
            <tr key={row._id}>
              <td className="border border-gray-300 px-4 py-2">{row.item}</td>
              <td className="border border-gray-300 px-4 py-2">
                {row.semester2.map((sem2Value: any, sem2Index: number) => (
                  <input
                    key={sem2Index}
                    type="number"
                    value={sem2Value}
                    onChange={(e) =>
                      handleChange(
                        rowIndex,
                        "semester2",
                        e.target.value,
                        sem2Index
                      )
                    }
                    disabled={isEditing !== rowIndex}
                    style={{ width: "40px", marginRight: "5px" }}
                  />
                ))}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {isEditing === rowIndex ? (
                  <button onClick={() => handleSave(rowIndex)}>Save</button>
                ) : (
                  <button onClick={() => handleEdit(rowIndex)}>Edit</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EditableTable;
