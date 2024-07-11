"use client";

import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

const InputPage = () => {
  const academicYears = ["2023/2024", "2024/2025", "2025/2026"];
  const grades = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const subjects = ["Game Develop", "Robotic Basic"];

  const [selectedAY, setAY] = useState("");
  const [selectedGrade, setGrade] = useState(0);
  const [selectedSubject, setSubject] = useState("");
  const [teacher, setTeacher]: any = useState(null);

  const session: any = Cookies.get("token");
  const sessionParse = JSON.parse(session ? session : null);
  const token = sessionParse?.token;
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_EX}/teacher`,
          { headers: { token } }
        );
        setTeacher(res.data);
      } catch (error: any) {
        console.log(error.response.message);
      }
    };
    getUser();
  }, []);

  const handleAY = (event: any) => {
    setAY(event.target.value);
  };
  const handleGrade = (event: any) => {
    setGrade(event.target.value);
  };
  const handleSubject = (event: any) => {
    setSubject(event.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const data = {
      selectedAY,
      selectedGrade,
      selectedSubject,
      teacher: teacher.name,
    };
    console.log(data);
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-6 text-center">Input Data</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="academicYear"
              className="block text-sm font-medium text-gray-700"
            >
              Tahun Ajaran:
            </label>
            <select
              id="academicYear"
              name="academicYear"
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              onChange={handleAY}
            >
              {[
                { label: "", value: "", disabled: true, selected: true },
                ...academicYears.map((year, index) => ({
                  selected: false,
                  label: year,
                  value: year,
                  disabled: false,
                })),
              ].map((option, index) => (
                <option
                  key={index}
                  selected={option.selected}
                  value={option.value}
                  disabled={option.disabled}
                >
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="grade"
              className="block text-sm font-medium text-gray-700"
            >
              Grade:
            </label>
            <select
              id="grade"
              name="grade"
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              onChange={handleGrade}
            >
              {[
                { label: "", value: "", disabled: true, selected: true },
                ...grades.map((grade, index) => ({
                  selected: false,
                  label: grade,
                  value: grade,
                  disabled: false,
                })),
              ].map((option, index) => (
                <option
                  key={index}
                  selected={option.selected}
                  value={option.value}
                  disabled={option.disabled}
                >
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-6">
            <label
              htmlFor="subject"
              className="block text-sm font-medium text-gray-700"
            >
              Subject:
            </label>
            <select
              id="subject"
              name="subject"
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              onChange={handleSubject}
            >
              {[
                { label: "", value: "", disabled: true, selected: true },
                ...subjects.map((subject, index) => ({
                  selected: false,
                  label: subject,
                  value: subject,
                  disabled: false,
                })),
              ].map((option, index) => (
                <option
                  key={index}
                  selected={option.selected}
                  value={option.value}
                  disabled={option.disabled}
                >
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-6">
            <label
              htmlFor="teacher"
              className="block text-sm font-medium text-gray-700"
            >
              Teacher:
            </label>
            <input
              id="teacher"
              name="teacher"
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={teacher?.name}
              disabled
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="inline-block bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InputPage;
