"use client";

import ATS from "@/components/ATS";
import Details from "@/components/Details";
import Summary from "@/components/Summary";
import { Feedback } from "@/constants";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [imageUrl, setImageUrl] = useState("/images/resume-3.png");
  const [resumeUrl, setResumeUrl] = useState("/images/resume-3.png");
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    setFeedback(Feedback);
  }, []);

  return (
    <main className="!pt-0 bg-gray-50 min-h-screen">
      <div className="flex flex-row w-full max-lg:flex-col-reverse">
        {/* Left Section - Resume Preview + Back Button */}
        <section className='flex flex-col gap-6 w-1/2 px-8 max-lg:w-full py-8 bg-[url("/images/bg-small.svg")] bg-cover h-screen sticky top-0 items-center justify-between border-r border-gray-200'>
          
          {/* Back Button Inside Resume Panel */}
          <div className="w-full flex justify-start">
            <Link
              href="/"
              className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-100 transition bg-white shadow-sm"
            >
              <img src="/icons/back.svg" alt="logo" className="w-3 h-3" />
              <span className="text-gray-800 text-sm font-semibold">
                Back to Homepage
              </span>
            </Link>
          </div>

          {/* Resume Preview */}
          {imageUrl && resumeUrl && (
            <div className="animate-in fade-in duration-1000 h-[85%] w-fit shadow-lg rounded-2xl overflow-hidden border border-gray-200">
              <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
                <img
                  src={imageUrl}
                  alt="resume"
                  className="w-full h-full object-contain"
                  title="resume"
                />
              </a>
            </div>
          )}
        </section>

        {/* Right Section - Review Details */}
        <section className="flex flex-col gap-6 w-1/2 px-8 max-lg:w-full py-8 text-black">
          <h2 className="text-4xl font-bold text-gray-900 tracking-tight">
            Resume Review
          </h2>

          {feedback ? (
            <div className="flex flex-col gap-8 animate-in fade-in duration-1000">
              <Summary feedback={feedback} />
              <ATS score={feedback.ATS.score} suggestions={feedback.ATS.tips} />
              <Details feedback={feedback} />
            </div>
          ) : (
            <div className="flex justify-center">
              <img src="/images/resume-scan-2.gif" className="w-56" alt="loading" />
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default Page;
