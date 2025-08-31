import Link from "next/link";
import ScoreCircle from "./ScoreCircle";

const ResumeCard = ({ resume }) => {
  const { id, companyName, jobTitle, feedback, imagePath } = resume;
  console.log(imagePath);

  return (
    <Link
      href={`/resume/${id}`}
      className="resume-card animate-in fade-in duration-1000"
    >
      <div className="resume-card-header">
        <div className="flex flex-col gap-2">
          <h2 className=" font-bold break-words max-sm:text-xl text-3xl text-black">
            {companyName}
          </h2>
          <h3 className="text-lg text-gray-500">{jobTitle}</h3>
        </div>

        <div className="flex-shrink-0">
          <ScoreCircle score={feedback.overallScore} />
        </div>
      </div>

      <div className="gradient-border animate-in fade-in duration-1000">
        <div className="w-full h-full">
          <img
            src={imagePath}
            alt="resume"
            className="w-full h-[350px] max-sm:h-[200px] object-cover"
          />
        </div>
      </div>
    </Link>
  );
};

export default ResumeCard;
