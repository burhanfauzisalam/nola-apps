"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "../style/login.module.css";
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

  console.log(data.url);
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
      Cookies.set("token", res.data, { expires: 1 / 24 });
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
    <div className={`container-fluid ${styles.loginContainer}`}>
      <div className="row no-gutters">
        <div className={`col-md-6 d-none d-md-flex ${styles.bgImage}`}></div>
        <div className="bg-light d-flex align-items-center justify-content-center">
          <div className="login py-5 px-3">
            <div className="container">
              <div className="row justify-content-center">
                <div className="">
                  <h3 className="display-4 text-center">Login</h3>
                  <p className="text-muted text-center">
                    Enter your credentials to access your account
                  </p>
                  <p className="text-muted mb-4 text-center">
                    This page is for {data.pageFor}
                  </p>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <input
                        type="username"
                        placeholder="Username"
                        className="form-control rounded-pill border-0 shadow-sm px-4"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="password"
                        placeholder="Password"
                        className="form-control rounded-pill border-0 shadow-sm px-4 text-primary"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    {/* <div className="form-check mb-3">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="customCheck1"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="customCheck1"
                      >
                        Remember password
                      </label>
                    </div> */}
                    {loading ? (
                      "Loading..."
                    ) : (
                      <button
                        type="submit"
                        className="btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm"
                      >
                        Sign in
                      </button>
                    )}
                    {data.pageFor === "students" ? (
                      <SwitchToTeacher />
                    ) : (
                      <SwitchToStudent />
                    )}
                    <br />
                    <span className="text-danger">{error}</span>
                    {/* <div className="text-center d-flex justify-content-between mt-4">
                      <p>
                        <a href="#" className="font-italic text-muted">
                          Forgot password?
                        </a>
                      </p>
                      <p>
                        <a href="#" className="font-italic text-muted">
                          Sign up
                        </a>
                      </p>
                    </div> */}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
