"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

const CekToken = () => {
  const { push } = useRouter();
  const token = Cookies.get("token");

  const [user, setUser]: any = useState();

  useEffect(() => {
    const cekToken: any = async () => {
      try {
        const url: any = process.env.NEXT_PUBLIC_API_DECODE;
        const res = await axios.post(url, {}, { headers: { token } });
        // console.log(res.data);
        setUser(res.data);
      } catch (error) {
        push("/login");
      }
    };
    cekToken();
  }, []);
  return;
};

export default CekToken;
