"use client";
import React, { useState } from "react";
import Link from "next/link";

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/sign-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Something went wrong.");
      } else {
        setSuccess("Account created successfully!");
        setName("");
        setEmail("");
        setPassword("");
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen pt-10">
      <section className="flex flex-col items-center gap-8 pt-12 mx-15 pb-5 max-sm:mx-2">
        <div className="flex flex-col items-center gap-8 max-w-4xl text-center max-sm:gap-4 py-16">
          <h1 className="max-sm:text-[3rem] text-5xl bg-clip-text text-black bg-gradient-to-r from-[#AB8C95] via-[#000000] to-[#8E97C5] leading-tight xl:tracking-[-2px] font-semibold">
            Create Your Account
          </h1>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-8 w-full items-start mt-8 max-w-md"
          >
            {/* Name */}
            <div className="flex flex-col gap-2 w-full items-start">
              <label htmlFor="name" className="text-[#475467]">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                required
                className="w-full p-4 rounded-2xl bg-white focus:outline-none shadow-inner text-black font-medium"
              />
            </div>

            {/* Email */}
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

            {/* Password */}
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

            {/* Feedback Messages */}
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && <p className="text-green-500 text-sm">{success}</p>}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-b from-[#8e98ff] to-[#606beb] text-white rounded-full px-4 py-2 cursor-pointer w-full shadow-md hover:bg-gradient-to-b hover:from-[#717dff] hover:to-[#4957eb]"
            >
              {loading ? "Creating..." : "Sign Up"}
            </button>
          </form>

          {/* Sign In Link */}
          <p className="text-center text-sm text-gray-600 mt-5">
            Already have an account?{" "}
            <Link href="/sign-in" className="text-indigo-600 hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default SignUpPage;
