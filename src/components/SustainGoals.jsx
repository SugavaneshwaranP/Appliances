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

  const handleInputChange = (e) => {
    setNewGoal({ ...newGoal, [e.target.name]: e.target.value });
  };

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

  const exportToCSV = () => {
    const csv = [
      'Goal,Progress',
      ...goals.map((g) => `${g.goal},${g.progress}`),
    ].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, 'sustainability_goals.csv');
  };

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div
      className={`p-6 max-w-3xl mx-auto rounded-xl shadow-xl transition-colors duration-500 ${
        darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
      }`}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6 bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 text-white p-4 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold">🌱 Sustainability Goals</h2>
        <div className="flex gap-3">
          <button
            onClick={toggleDarkMode}
            className="text-sm px-3 py-1 bg-white text-gray-800 rounded shadow hover:bg-gray-100"
          >
            {darkMode ? '☀️ Light' : '🌙 Dark'}
          </button>
          <Link
            to="/dashboard"
            className="text-sm underline hover:text-yellow-300"
          >
            ← Back
          </Link>
        </div>
      </div>

      {/* Goal Creation Form */}
      <form
        onSubmit={addGoal}
        className="mb-8 grid grid-cols-1 sm:grid-cols-3 gap-4"
      >
        <input
          type="text"
          name="goal"
          placeholder="Enter new goal"
          value={newGoal.goal}
          onChange={handleInputChange}
          className="border px-3 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700 dark:text-white"
        />
        <input
          type="number"
          name="progress"
          placeholder="Progress (%)"
          value={newGoal.progress}
          onChange={handleInputChange}
          min="0"
          max="100"
          className="border px-3 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700 dark:text-white"
        />
        <button
          type="submit"
          className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700 shadow-md transition"
        >
          ➕ Add Goal
        </button>
      </form>

      {/* Goals List */}
      <ul className="space-y-6">
        {goals.map(({ id, goal, progress, color }) => (
          <li
            key={id}
            className="p-4 rounded-lg shadow-md bg-white dark:bg-gray-800 border dark:border-gray-700"
          >
            <div className="flex justify-between mb-2">
              <span className="font-medium">{goal}</span>
              <span className="text-sm text-gray-500 dark:text-gray-300">
                {progress.toFixed(1)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-4 overflow-hidden">
              <div
                className={`h-4 ${color} transition-all duration-700 ease-in-out`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </li>
        ))}
      </ul>

      {/* Export Button */}
      <div className="text-center mt-8">
        <button
          onClick={exportToCSV}
          className="bg-blue-600 hover:bg-blue-700 transition px-5 py-2 rounded text-white shadow-lg"
        >
          📥 Export to CSV
        </button>
      </div>
    </div>
  );
}
