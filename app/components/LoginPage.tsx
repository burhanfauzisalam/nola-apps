"use client";

import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useRouter } from "next/navigation";
import SwitchToTeacher from "./SwitchToTeacher";
import SwitchToStudent from "./SwitchToStudent";

interface data {
  data: any;
}

const LoginPage: React.FC<data> = ({ data }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]: any = useState();
  const [loading, isLoading] = useState(false);
  const { push } = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!username && !password) {
      return setError("Please fill username and password");
    }
    isLoading(true);
    try {
      const url = data.url;
      const res = await axios.post(
        url,
        {
          username,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      Cookies.set("token", JSON.stringify(res.data), { expires: 1 / 24 });
      push("/");
    } catch (error: any) {
      if (error.response) {
        setError(error.response.data.message);
        console.log(error.response);
      } else {
        setError("An unexpected error occurred");
        console.log("Error", error.message);
      }
    } finally {
      isLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Login</h2>
          <p className="text-gray-600">
            Enter your credentials to access your account
          </p>
          <p className="text-gray-600">This page is for {data.pageFor}</p>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="mb-4">
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          {loading ? (
            <div className="flex justify-center items-center">
              <span>Loading...</span>
            </div>
          ) : (
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
          )}
          {data.pageFor === "students" ? (
            <SwitchToTeacher />
          ) : (
            <SwitchToStudent />
          )}
          {error && <span className="text-red-500">{error}</span>}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
