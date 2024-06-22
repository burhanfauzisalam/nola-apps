"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

const ParentPage = () => {
  const session: any = Cookies.get("token");
  const sessionParse = JSON.parse(session ? session : null);
  const token = sessionParse.token;
  const [user, setUser]: any = useState();
  useEffect(() => {
    const getUser = async () => {
      try {
        const url: any = process.env.NEXT_PUBLIC_API_PARENT;
        const res = await axios.get(url, { headers: { token } });
        setUser(res.data);
      } catch (error: any) {
        console.log(error.response.message);
      }
    };
    getUser();
  }, []);
  return (
    <div className="mt-10">
      <h1>{user?.username}</h1>
    </div>
  );
};

export default ParentPage;
