import React from 'react';
import ScoreGauge from './ScoreGauge';

// Capitalized component name
const Category = ({ title, score }) => {

  const textColor = score > 70 ? "text-green-500"
  :score > 49
  ? "text-yellow-600" : "text-red-600";
  return (
    <div className='resume-summary flex flex-row justify-between items-center p-2 border-b'>
      <div className='category'>
</div>
      <div className='flex flex-row gap-2 items-center justify-center '>
        <p className='text-2xl '>{title}</p>
      </div>
      <div>
        <p className='text-2xl'>
          <span className={textColor}>{score}</span>

        </p>
      </div>
      <span className='font-medium'>{title}</span>
      <span className='font-semibold'>{score}/100</span>
    </div>
  );
};

const Summary = ({ feedback }) => {
  console.log('Feedback data:', feedback);

  return (
    <div className="bg-white rounded-2xl shadow-md w-full">
      <div className="flex flex-row items-center p-4 gap-8">
        <ScoreGauge score={feedback?.overallScore || 0} />
        <div className='flex flex-col gap-2'>
          <h2 className='text-2xl font-bold'>Your Resume Score</h2>
          <p className='text-sm text-gray-500'>
            This score is calculated based on the variables listed below
          </p>
        </div>
      </div>

      <Category title="Tone & Style" score={feedback?.toneAndStyle?.score || 0} />
      <Category title="Content" score={feedback?.content?.score || 0} />
      <Category title="Structure" score={feedback?.structure?.score || 0} />
      <Category title="Skills" score={feedback?.skills?.score || 0} />
      
    </div>
  );
};

export default Summary;
