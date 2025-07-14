import React from 'react';
import { Link } from 'react-router-dom';

const goals = [
  { goal: 'Reduce Energy by 25%', progress: 78, color: 'bg-green-500' },
  { goal: 'Save 1000L Water/Month', progress: 60, color: 'bg-blue-500' },
  { goal: 'Use AC < 6 hrs/day', progress: 90, color: 'bg-purple-500' },
];

export default function SustainGoals() {
  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-emerald-700">🌱 Goals</h2>
        <Link to="/dashboard" className="text-sm text-blue-500 hover:underline">← Back</Link>
      </div>

      <ul className="space-y-6">
        {goals.map(({ goal, progress, color }, index) => (
          <li key={index}>
            <div className="mb-1 font-medium">{goal}</div>
            <div className="w-full bg-gray-200 rounded-full h-4 shadow-inner">
              <div
                className={`h-4 rounded-full ${color}`}
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="text-right text-xs text-gray-500 mt-1">{progress}% Achieved</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
