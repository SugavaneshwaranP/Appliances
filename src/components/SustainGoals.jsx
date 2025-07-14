import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { saveAs } from 'file-saver';

export default function SustainGoals() {
  const [goals, setGoals] = useState([
    { id: 1, goal: 'Reduce Energy by 25%', progress: 78, color: 'bg-green-500' },
    { id: 2, goal: 'Save 1000L Water/Month', progress: 60, color: 'bg-blue-500' },
    { id: 3, goal: 'Use AC < 6 hrs/day', progress: 90, color: 'bg-purple-500' },
  ]);
  const [newGoal, setNewGoal] = useState({ goal: '', progress: 0 });
  const [darkMode, setDarkMode] = useState(false);

  // Simulate real-time progress updates
  useEffect(() => {
    const interval = setInterval(() => {
      setGoals((prev) =>
        prev.map((g) => ({
          ...g,
          progress: Math.min(100, g.progress + Math.random() * 5),
        }))
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Handle new goal input
  const handleInputChange = (e) => {
    setNewGoal({ ...newGoal, [e.target.name]: e.target.value });
  };

  // Add new goal
  const addGoal = (e) => {
    e.preventDefault();
    if (newGoal.goal && newGoal.progress >= 0) {
      setGoals([
        ...goals,
        {
          id: goals.length + 1,
          goal: newGoal.goal,
          progress: parseFloat(newGoal.progress),
          color: 'bg-teal-500',
        },
      ]);
      setNewGoal({ goal: '', progress: 0 });
    }
  };

  // Export goals to CSV
  const exportToCSV = () => {
    const csv = [
      'Goal,Progress',
      ...goals.map((g) => `${g.goal},${g.progress}`),
    ].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, 'sustainability_goals.csv');
  };

  // Toggle dark mode
  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div
      className={`p-6 max-w-3xl mx-auto rounded-xl shadow-lg transition-colors ${
        darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
      }`}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-emerald-700 dark:text-emerald-300">
          Sustainability Goals
        </h2>
        <div className="flex gap-4">
          <button
            onClick={toggleDarkMode}
            className="text-sm px-3 py-1 bg-gray-200 dark:bg-gray-600 rounded hover:bg-gray-300 dark:hover:bg-gray-500"
          >
            {darkMode ? 'Light' : 'Dark'} Mode
          </button>
          <Link
            to="/dashboard"
            className="text-sm text-blue-500 hover:underline"
          >
             Back
          </Link>
        </div>
      </div>

      {/* Goal Creation Form */}
      <form onSubmit={addGoal} className="mb-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <input
          type="text"
          name="goal"
          placeholder="New Goal"
          value={newGoal.goal}
          onChange={handleInputChange}
          className="border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
        />
        <input
          type="number"
          name="progress"
          placeholder="Progress (%)"
          value={newGoal.progress}
          onChange={handleInputChange}
          min="0"
          max="100"
          className="border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
        />
        <button
          type="submit"
          className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700"
        >
          Add Goal
        </button>
      </form>

      {/* Goals List */}
      <ul className="space-y-6">
        {goals.map(({ id, goal, progress, color }) => (
          <li key={id}>
            <div className="mb-1 font-medium">{goal}</div>
            <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-4 shadow-inner">
              <div
                className={`h-4 rounded-full ${color}`}
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="text-right text-xs text-gray-500 dark:text-gray-300 mt-1">
              {progress.toFixed(1)}% Achieved
            </div>
          </li>
        ))}
      </ul>

      {/* Export Button */}
      <button
        onClick={exportToCSV}
        className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Export to CSV
      </button>
    </div>
  );
}