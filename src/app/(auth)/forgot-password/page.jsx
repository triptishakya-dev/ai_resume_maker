"use client";
import React, { useState } from "react";
import Link from "next/link";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Reset email sent to:", email);
    // Add your forgot-password logic here (API call, email service, etc.)
  };

  return (
    <main className="min-h-screen pt-10">
      <section className="flex flex-col items-center gap-8 pt-12 mx-15 pb-5 max-sm:mx-2">
        <div className="flex flex-col items-center gap-8 max-w-4xl text-center max-sm:gap-4 py-16">
          <h1 className="max-sm:text-[3rem] text-5xl bg-clip-text text-black bg-gradient-to-r from-[#AB8C95] via-[#000000] to-[#8E97C5] leading-tight xl:tracking-[-2px] font-semibold">
            Forgot Password
          </h1>

          <p className="text-gray-600 text-sm">
            Enter your email to receive a password reset link.
          </p>

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

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-gradient-to-b from-[#8e98ff] to-[#606beb] text-white rounded-full px-4 py-2 cursor-pointer w-full shadow-md hover:bg-gradient-to-b hover:from-[#717dff] hover:to-[#4957eb]"
            >
              Send Reset Link
            </button>
          </form>

          {/* Back to Sign In */}
          <p className="text-center text-sm text-gray-600 mt-5">
            Remembered your password?{" "}
            <Link href="/sign-in" className="text-indigo-600 hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default ForgotPasswordPage;
