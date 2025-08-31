"use client";
import Navbar from "@/components/Navbar";
import React, { useState } from "react";
import { FiUpload, FiFile } from "react-icons/fi";

const Page = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusText, setStatusText] = useState("");
  const [files, setFiles] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setFiles(Array.from(e.dataTransfer.files));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <main className="min-h-screen pt-10">
      <section className="flex flex-col items-center gap-8 pt-12 mx-15 pb-5 max-sm:mx-2">
        <div className="flex flex-col items-center gap-8 max-w-4xl text-center max-sm:gap-4 py-16">
          <h1 className="max-sm:text-[3rem] text-5xl bg-clip-text text-black bg-gradient-to-r from-[#AB8C95] via-[#000000] to-[#8E97C5] leading-tight xl:tracking-[-2px] font-semibold">
            Smart feedback for your dream job
          </h1>

          {isProcessing ? (
            <>
              <h2 className="max-sm:text-xl text-3xl text-[#475467]">
                {statusText}
              </h2>
              <img
                src="/images/resume-scan.gif"
                className="w-full"
                alt="Resume Scan"
              />
            </>
          ) : (
            <h2 className="max-sm:text-xl text-2xl text-stone-800">
              Drop your resume for an ATS score and improvement tips
            </h2>
          )}

          {!isProcessing && (
            <form
              id="upload-form"
              onSubmit={handleSubmit}
              className="flex flex-col gap-8 w-full items-start mt-8"
            >
              {/* Company Name */}
              <div className="flex flex-col gap-2 w-full items-start">
                <label htmlFor="company-name" className="text-[#475467]">
                  Company Name
                </label>
                <input
                  type="text"
                  name="company-name"
                  placeholder="company-name"
                  id="company-name"
                  className="w-full p-4 rounded-2xl bg-white focus:outline-none shadow-inner text-black font-medium"
                />
              </div>

              {/* Job Title */}
              <div className="flex flex-col gap-2 w-full items-start">
                <label htmlFor="job-title" className="text-[#475467]">
                  Job Title
                </label>
                <input
                  type="text"
                  name="job-title"
                  placeholder="job-title"
                  id="job-title"
                  className="w-full p-4 rounded-2xl bg-white focus:outline-none shadow-inner text-black font-medium"
                />
              </div>

              {/* Job Description */}
              <div className="flex flex-col gap-2 w-full items-start">
                <label htmlFor="job-discription" className="text-[#475467]">
                  Job Description
                </label>
                <textarea
                  rows={5}
                  name="job-discription"
                  placeholder="job-discription"
                  id="job-discription"
                  className="w-full p-4 rounded-2xl bg-white focus:outline-none shadow-inner text-black font-medium"
                />
              </div>

              {/* File Upload */}
              <div className="flex flex-col gap-2 w-full items-start">
                <label htmlFor="uploader" className="text-[#475467]">
                  Upload Resume
                </label>
                <div
                  className="text-black font-medium relative w-full p-8 text-center transition-all duration-700 cursor-pointer bg-white rounded-2xl min-h-[60px] flex flex-col items-center justify-center gap-2 border border-dashed border-gray-400"
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onClick={() => document.getElementById("file-input").click()}
                >
                  {files.length > 0 ? (
                    <div className="flex flex-col gap-2">
                      {files.map((file, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <FiFile size={20} />
                          <span>{file.name}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <>
                      <FiUpload size={28} />
                      <span className="font-semibold">Click to upload</span> or
                      drag & drop PDF (max 20MB)
                    </>
                  )}
                  <input
                    type="file"
                    id="file-input"
                    accept="application/pdf"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                className="bg-gradient-to-b from-[#8e98ff] to-[#606beb] text-white rounded-full px-4 py-2 cursor-pointer w-full shadow-md hover:bg-gradient-to-b hover:from-[#717dff] hover:to-[#4957eb]"
                type="submit"
              >
                Analyze Resume
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
};

export default Page;
