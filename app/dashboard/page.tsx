"use client";

import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
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
        if (res.data.role === "teacher") {
          push("/dashboard/teacher");
        }
        if (res.data.role === "parent") {
          push("/dashboard/parent");
        }
        if (res.data.role === "student") {
          push("/dashboard/student");
        }
      } catch (error) {
        push("/login");
      }
    };
    cekToken();
  }, []);
  return;
}
