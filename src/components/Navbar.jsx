"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Navbar = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/cookies");
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setUser(data);
        }
      } catch (error) {
        console.log("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  const handleLogOut = async () => {
    try {
      const res = await fetch("/api/log-out", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      window.location.reload(); // ✅ this reloads the page

      if (res.ok) {
        console.log("User logged out successfully");
      } else {
        const data = await res.json();
        console.error("Logout failed:", data.msg || "Unknown error");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <nav className="">
      <div className="flex flex-row justify-between items-center bg-white rounded-full p-4 w-full px-10 max-w-[1200px] mx-auto">
        <Link href={"/"}>
          <p className="text-2xl font-bold text-gradient text-black">RESUME</p>
        </Link>
        <div className="flex gap-5">
        {user?.id ? (
            <button
              className="primary-gradient text-white rounded-full px-4 py-2 cursor-pointer  w-fit"
              onClick={handleLogOut}
            >
              Log Out
            </button>
          ) : (
            <Link href={"/sign-in"}>
              <button className="primary-gradient text-white rounded-full px-4 py-2 cursor-pointer  w-fit">
                Sign In
              </button>
            </Link>
          )}

          <Link
            href={"/upload-resume"}
            className="primary-gradient text-white rounded-full px-4 py-2 cursor-pointer  w-fit"
          >
            upload resume
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
