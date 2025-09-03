
export const resumeData = [
  {
    id: "1",
    companyName: "Google",
    submittedDate: "25 Aug 2025",
    jobTitle: "Frontend Developer",
    imagePath: "/images/resume-1.png",
    resumePath: "/resumes/resume-1.pdf",
    feedback: {
      overallScore: 85,
      ATS: { score: 90, tips: [] },
      toneAndStyle: { score: 88, tips: [] },
      content: { score: 84, tips: [] },
      structure: { score: 82, tips: [] },
      skills: { score: 86, tips: [] },
    },
  },
  {
    id: "2",
    companyName: "Microsoft",
    submittedDate: "28 Aug 2025",
    jobTitle: "Cloud Engineer",
    imagePath: "/images/resume-2.png",
    resumePath: "/resumes/resume-2.pdf",
    feedback: {
      overallScore: 62,
      ATS: { score: 70, tips: [] },
      toneAndStyle: { score: 65, tips: [] },
      content: { score: 60, tips: [] },
      structure: { score: 58, tips: [] },
      skills: { score: 59, tips: [] },
    },
  },
  {
    id: "3",
    companyName: "Apple",
    submittedDate: "30 Aug 2025",
    jobTitle: "iOS Developer",
    imagePath: "/images/resume-3.png",
    resumePath: "/resumes/resume-3.pdf",
    feedback: {
      overallScore: 78,
      ATS: { score: 80, tips: [] },
      toneAndStyle: { score: 76, tips: [] },
      content: { score: 79, tips: [] },
      structure: { score: 75, tips: [] },
      skills: { score: 77, tips: [] },
    },
  },
  {
    id: "4",
    companyName: "Amazon",
    submittedDate: "02 Sep 2025",
    jobTitle: "Backend Developer",
    imagePath: "/images/resume-3.png",
    resumePath: "/resumes/resume-4.pdf",
    feedback: {
      overallScore: 81,
      ATS: { score: 83, tips: [] },
      toneAndStyle: { score: 79, tips: [] },
      content: { score: 80, tips: [] },
      structure: { score: 82, tips: [] },
      skills: { score: 78, tips: [] },
    },
  },
  {
    id: "5",
    companyName: "Netflix",
    submittedDate: "05 Sep 2025",
    jobTitle: "UI/UX Designer",
    imagePath: "/images/resume-2.png",
    resumePath: "/resumes/resume-5.pdf",
    feedback: {
      overallScore: 69,
      ATS: { score: 70, tips: [] },
      toneAndStyle: { score: 72, tips: [] },
      content: { score: 68, tips: [] },
      structure: { score: 67, tips: [] },
      skills: { score: 71, tips: [] },
    },
  },
  {
    id: "6",
    companyName: "Tesla",
    submittedDate: "10 Sep 2025",
    jobTitle: "AI Engineer",
    imagePath: "/images/resume-1.png",
    resumePath: "/resumes/resume-6.pdf",
    feedback: {
      overallScore: 92,
      ATS: { score: 95, tips: [] },
      toneAndStyle: { score: 90, tips: [] },
      content: { score: 91, tips: [] },
      structure: { score: 93, tips: [] },
      skills: { score: 94, tips: [] },
    },
  },
];


export const AIResponseFormat = `
      interface Feedback {
      overallScore: number; //max 100
      ATS: {
        score: number; //rate based on ATS suitability
        tips: {
          type: "good" | "improve";
          tip: string; //give 3-4 tips
        }[];
      };
      toneAndStyle: {
        score: number; //max 100
        tips: {
          type: "good" | "improve";
          tip: string; //make it a short "title" for the actual explanation
          explanation: string; //explain in detail here
        }[]; //give 3-4 tips
      };
      content: {
        score: number; //max 100
        tips: {
          type: "good" | "improve";
          tip: string; //make it a short "title" for the actual explanation
          explanation: string; //explain in detail here
        }[]; //give 3-4 tips
      };
      structure: {
        score: number; //max 100
        tips: {
          type: "good" | "improve";
          tip: string; //make it a short "title" for the actual explanation
          explanation: string; //explain in detail here
        }[]; //give 3-4 tips
      };
      skills: {
        score: number; //max 100
        tips: {
          type: "good" | "improve";
          tip: string; //make it a short "title" for the actual explanation
          explanation: string; //explain in detail here
        }[]; //give 3-4 tips
      };
    }`;

export const Feedback = {
  overallScore: 85,
  ATS: {
    score: 90,
    tips: [
      { type: "good", tip: "Strong keyword usage for ATS parsing" },
      { type: "improve", tip: "Include more industry-specific terms" },
      { type: "improve", tip: "Optimize job title consistency" },
    ],
  },
  toneAndStyle: {
    score: 80,
    tips: [
      {
        type: "good",
        tip: "Professional tone maintained",
        explanation: "The language used is formal and professional throughout the document.",
      },
      {
        type: "improve",
        tip: "Add impact-driven statements",
        explanation: "Include quantified achievements to make the writing more compelling.",
      },
    ],
  },
  content: {
    score: 78,
    tips: [
      {
        type: "good",
        tip: "Relevant work experience",
        explanation: "The resume includes roles closely aligned with the target job.",
      },
      {
        type: "improve",
        tip: "Add key achievements",
        explanation: "Provide metrics or results to support your responsibilities.",
      },
    ],
  },
  structure: {
    score: 82,
    tips: [
      {
        type: "good",
        tip: "Clear section headers",
        explanation: "Each section is well-labeled and easy to navigate.",
      },
      {
        type: "improve",
        tip: "Balance white space",
        explanation: "Adjust margins and spacing to improve readability.",
      },
    ],
  },
  skills: {
    score: 88,
    tips: [
      {
        type: "good",
        tip: "Strong technical skills listed",
        explanation: "Includes a good mix of hard and soft skills.",
      },
      {
        type: "improve",
        tip: "Highlight leadership skills",
        explanation: "Include leadership or teamwork skills in a dedicated section.",
      },
    ],
  },
};

export const prepareInstructions = ({
  jobTitle,
  jobDescription,
  AIResponseFormat,
}: {
  jobTitle: string;
  jobDescription: string;
  AIResponseFormat: string;
}) =>
  `You are an expert in ATS (Applicant Tracking System) and resume analysis.
  Please analyze and rate this resume and suggest how to improve it.
  The rating can be low if the resume is bad.
  Be thorough and detailed. Don't be afraid to point out any mistakes or areas for improvement.
  If there is a lot to improve, don't hesitate to give low scores. This is to help the user to improve their resume.
  If available, use the job description for the job user is applying to to give more detailed feedback.
  If provided, take the job description into consideration.
  The job title is: ${jobTitle}
  The job description is: ${jobDescription}
  Provide the feedback using the following format: ${AIResponseFormat}
  Return the analysis as a JSON object, without any other text and without the backticks.
  Do not include any other text or comments.`;

