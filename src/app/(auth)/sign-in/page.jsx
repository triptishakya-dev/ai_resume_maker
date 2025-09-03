"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SignInPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);

    try {
      const res = await fetch("/api/sign-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log("API Response:", data);

      if (res.ok) {
        router.push("/");
      } else {
        alert(data.error || "Login failed");
      }
    } catch (error) {
      console.error("Sign-in error:", error);
      alert("Something went wrong");
    }
  };

  return (
    <main className="min-h-screen pt-10">
      <section className="flex flex-col items-center gap-8 pt-12 mx-15 pb-5 max-sm:mx-2">
        <div className="flex flex-col items-center gap-8 max-w-4xl text-center max-sm:gap-4 py-16">
          <h1 className="max-sm:text-[3rem] text-5xl bg-clip-text text-black bg-gradient-to-r from-[#AB8C95] via-[#000000] to-[#8E97C5] leading-tight xl:tracking-[-2px] font-semibold">
            Sign In to Your Account
          </h1>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-8 w-full items-start mt-8 max-w-md"
          >
            {/* Email Field */}
            <div className="flex flex-col gap-2 w-full items-start">
              <label htmlFor="email" className="text-[#475467]">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full p-4 rounded-2xl bg-white focus:outline-none shadow-inner text-black font-medium"
              />
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-2 w-full items-start">
              <label htmlFor="password" className="text-[#475467]">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="w-full p-4 rounded-2xl bg-white focus:outline-none shadow-inner text-black font-medium"
              />
            </div>

            {/* Submit Button */}
            <div className="flex flex-col w-full gap-3">
              {/* Forgot Password Link */}
              <div className="text-right w-full">
                <Link
                  href="/forgot-password"
                  className="text-sm text-indigo-600 hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>

              <button
                type="submit"
                className="bg-gradient-to-b from-[#8e98ff] to-[#606beb] text-white rounded-full px-4 py-2 cursor-pointer w-full shadow-md hover:bg-gradient-to-b hover:from-[#717dff] hover:to-[#4957eb]"
              >
                Sign In
              </button>
            </div>
          </form>

          {/* Sign Up Link */}
          <p className="text-center text-sm text-gray-600 mt-5">
            Don’t have an account?{" "}
            <Link href="/sign-up" className="text-indigo-600 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default SignInPage;
