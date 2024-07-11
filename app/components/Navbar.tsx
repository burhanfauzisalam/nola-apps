"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import axios from "axios";
import { FaRegUser } from "react-icons/fa";
import { ImPencil2 } from "react-icons/im";
import { BsJournalBookmark } from "react-icons/bs";

const Navbar = () => {
  const [error, setError]: any = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const session: any = Cookies.get("token");
  const sessionParse = JSON.parse(session ? session : null);
  const token = sessionParse?.token;
  const [user, setUser]: any = useState();
  useEffect(() => {
    const getUser = async () => {
      try {
        const url: any =
          sessionParse.role === "teacher"
            ? `${process.env.NEXT_PUBLIC_API_EX}/teacher`
            : sessionParse.role === "parent"
            ? `${process.env.NEXT_PUBLIC_API_EX}/parent`
            : `${process.env.NEXT_PUBLIC_API_EX}/student`;
        const res = await axios.get(url, { headers: { token } });
        setUser(res.data);
      } catch (error: any) {
        // setError(error?.response.message);
      }
    };
    getUser();
  }, [sessionParse, token]);

  const handleLogout = () => {
    Cookies.remove("token");
    window.location.reload();
  };
  const toggleDropdown = () => {
    setIsOpenMenu(!isOpenMenu);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-900">
              <img src="/logo.png" width={100} alt="" />
            </Link>
            <p>{error}</p>
          </div>
          <div className="hidden md:flex space-x-4 items-center">
            {user?.role === "teacher" ? (
              <Link
                href="/dashboard/teacher/assessment"
                className="text-gray-900 hover:text-gray-700 no-underline d-flex align-items-center"
              >
                <ImPencil2 />
                <span className="ml-1">Assessment</span>
              </Link>
            ) : user?.role === "student" ? (
              <Link
                href="/dashboard/student/assessment"
                className="text-gray-900 hover:text-gray-700 no-underline d-flex align-items-center"
              >
                <ImPencil2 />
                <span className="ml-1">Assessment</span>
              </Link>
            ) : user?.role === "parent" ? (
              <Link
                href="/dashboard/parent/invoice"
                className="text-gray-900 hover:text-gray-700 no-underline d-flex align-items-center"
              >
                <ImPencil2 />
                <span className="ml-1">Invoice</span>
              </Link>
            ) : (
              ""
            )}
            {user?.role === "teacher" ? (
              <Link
                href="/dashboard/teacher/report"
                className="text-gray-900 hover:text-gray-700 no-underline d-flex align-items-center"
              >
                <BsJournalBookmark />
                <span className="ml-1">Report</span>
              </Link>
            ) : user?.role === "parent" ? (
              <Link
                href="/dashboard/parent/report"
                className="text-gray-900 hover:text-gray-700 no-underline d-flex align-items-center"
              >
                <BsJournalBookmark />
                <span className="ml-1">Report</span>
              </Link>
            ) : null}
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="text-gray-900 hover:text-gray-700 focus:outline-none flex items-center d-flex align-items-center"
              >
                <FaRegUser />
                <span className="ml-1">{user?.username}</span>
              </button>
              {isOpenMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100 no-underline"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-900 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              <svg
                className={`${isOpen ? "hidden" : "block"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
              <svg
                className={`${isOpen ? "block" : "hidden"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className={`${isOpen ? "block" : "hidden"} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 ml-5 mb-2">
          <Link
            href="/"
            className="block text-gray-900 hover:text-gray-700 no-underline"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="block text-gray-900 hover:text-gray-700 no-underline"
          >
            About
          </Link>
          <Link
            href="/services"
            className="block text-gray-900 hover:text-gray-700 no-underline"
          >
            Services
          </Link>
          <Link
            href="/contact"
            className="block text-gray-900 hover:text-gray-700 no-underline"
          >
            Contact
          </Link>
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="text-gray-900 hover:text-gray-700 focus:outline-none flex items-center d-flex align-items-center"
            >
              <FaRegUser />
              <span className="ml-1">{user?.username}</span>

              {/* <svg
                  className="h-5 w-5 inline-block ml-1 -mt-1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 12a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg> */}
            </button>
            {isOpenMenu && (
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                <Link
                  href="/profile"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100 no-underline"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left no-underline"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
