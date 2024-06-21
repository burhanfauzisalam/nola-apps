"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./login.module.css";
import Cookies from "js-cookie";
import axios from "axios";
import { useRouter } from "next/navigation";

const LoginPage = () => {
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
    const apiLoginUrl: any = process.env.NEXT_PUBLIC_API_LOGIN;
    try {
      const res = await axios.post(apiLoginUrl, {
        username,
        password,
      });
      // console.log(res.data);
      Cookies.set("token", res.data, { expires: 1 / 24 / 60 });
      push("/");
    } catch (error: any) {
      setError(error.response.data.message);
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
                  <p className="text-muted mb-4 text-center">
                    Enter your credentials to access your account
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
