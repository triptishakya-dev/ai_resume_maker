"use client";

import ATS from "@/components/ATS";
import Details from "@/components/Details";
import Summary from "@/components/Summary";
import { Feedback } from "@/constants";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Page = ({params}) => {
  const [feedback, setFeedback] = useState(null);

  const { id } = React.use(params);

  useEffect(() => {
    const fetchResume = async () => {
        try {
            const response = await fetch(`/api/resume/${id}`);
            if(response.ok){
                const data = await response.json();
                setFeedback(data.analysisResult);
            }
        } catch (error) {
            console.log(error)
        }
    }
    fetchResume();
  }, [id]);

  return (
    <main className="!pt-0 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-8 py-8 flex flex-col gap-6">

        {/* Review Details */}
        <section className="flex flex-col gap-6 w-full py-8 text-black">
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
