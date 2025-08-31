"use client"
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
    <main className="!pt-0">
      <nav className="resume-nav flex items-center gap-2 p-2">
        <Link
          href="/"
          className="flex flex-row items-center gap-2 border border-gray-200 rounded-lg p-2 shadow-sm"
        >
          <img src="/icons/back.svg" alt="logo" className="w-2.5 h-2.5" />
          <span className="text-gray-800 text-sm font-semibold">
            Back to HomePage
          </span>
        </Link>
      </nav>

      <div className="flex flex-row w-full max-lg:flex-col-reverse">
        <section className='flex flex-col gap-8 w-1/2 px-8 max-lg:w-full py-6 bg-[url("/images/bg-small.svg")] bg-cover h-[100vh] sticky top-0 items-center justify-center'>
          {imageUrl && resumeUrl && (
            <div className="animate-in fade-in duration-1000 h-[90%] w-fit">
              <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
                <img
                  src={imageUrl}
                  alt="resume"
                  className="w-full h-full object-contain rounded-2xl"
                  title="resume"
                />
              </a>
            </div>
          )}
        </section>
        <section className="flex flex-col gap-8 w-1/2 px-8 max-lg:w-full py-6 text-black">
          <h2 className="text-4xl text-black font-bold ">Resume Review</h2>
          {feedback ? (
            <div className="flex flex-col gap-8 animate-in fade-in duration-1000">
              {/* Replace with your actual Summary component */}
              <Summary feedback={feedback} />
              <ATS score={feedback.ATS.score} suggestions={feedback.ATS.tips} />
              <Details feedback={feedback}/>
            </div>
          ) : (
            <img src="/images/resume-scan-2.gif" className="w-full " alt="" />
          )}
        </section>
      </div>
    </main>
  );
};

export default Page;
