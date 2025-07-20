import React from 'react';
import { Link } from 'react-router-dom';

const goals = [
  { goal: 'Reduce Energy by 25%', progress: 78, color: 'from-green-500 to-green-300' },
  { goal: 'Save 1000L Water/Month', progress: 60, color: 'from-blue-500 to-blue-300' },
  { goal: 'Use AC < 6 hrs/day', progress: 90, color: 'from-purple-500 to-purple-300' },
];

export default function SustainGoals() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-8">
      <div className="max-w-4xl mx-auto rounded-2xl shadow-2xl backdrop-blur-lg bg-white/10 p-6">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-600 animate-pulse">
            🌱 Sustainability Goals
          </h2>
          <Link
            to="/dashboard"
            className="px-4 py-2 text-sm font-semibold rounded-lg bg-gradient-to-r from-blue-600 to-blue-400 text-white hover:from-blue-700 hover:to-blue-500 shadow-md hover:shadow-lg transition-all duration-300"
          >
            ← Back
          </Link>
        </div>

        <ul className="space-y-8">
          {goals.map(({ goal, progress, color }, index) => (
            <li
              key={index}
              className="relative p-4 rounded-xl bg-white/20 backdrop-blur-md shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-500 group"
            >
              <div className="absolute inset-0 rounded-xl bg-white bg-opacity-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative font-semibold text-lg text-white drop-shadow-md">{goal}</div>
              <div className="w-full bg-gray-700/50 rounded-full h-5 mt-3 shadow-inner overflow-hidden">
                <div
                  className={`h-5 rounded-full bg-gradient-to-r ${color} transition-all duration-1000 ease-out`}
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <div className="text-right text-sm text-gray-200 mt-2 font-medium">{progress}% Achieved</div>
            </li>
          ))}
        </ul>
      </div>  
    </div>
  );
}