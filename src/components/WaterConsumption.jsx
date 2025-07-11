import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid } from 'recharts';

export default function WaterConsumption() {
  const [usage, setUsage] = useState(0);
  const [flowRate, setFlowRate] = useState(0);
  const [mode, setMode] = useState('daily');
  const [goal, setGoal] = useState(500);
  const [darkMode, setDarkMode] = useState(false);
  const [showCost, setShowCost] = useState(false);
  const [data, setData] = useState([]);
  const [forecast, setForecast] = useState([]);
  const [leakDetected, setLeakDetected] = useState(false);

  const labels = {
    daily: 7,
    weekly: 4,
    monthly: 12,
  };

  const generateData = (n) =>
    Array.from({ length: n }, (_, i) => {
      const val = +(Math.random() * 50 + 30).toFixed(1);
      return {
        label: `${mode === 'daily' ? 'Day' : mode === 'weekly' ? 'Week' : 'Month'} ${i + 1}`,
        usage: val,
        cost: +(val * 3.2).toFixed(2),
      };
    });

  const update = () => {
    const newUsage = +(Math.random() * 50 + 20).toFixed(1);
    const flow = +(Math.random() * 4 + 1).toFixed(2);
    setUsage(newUsage);
    setFlowRate(flow);
    setData(generateData(labels[mode]));
    setForecast(generateData(labels[mode]).map(d => ({
      ...d,
      label: `Forecast ${d.label}`,
      usage: +(d.usage * 1.05).toFixed(1),
      cost: +(d.cost * 1.05).toFixed(2),
    })));
    setLeakDetected(Math.random() > 0.9); // Simulate 10% leak chance
  };

  useEffect(() => {
    update();
    const interval = setInterval(update, 5000);
    return () => clearInterval(interval);
  }, [mode]);

  const total = data.reduce((acc, d) => acc + d.usage, 0);
  const progress = ((total / goal) * 100).toFixed(1);

  return (
    <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-white'} p-6 max-w-6xl mx-auto rounded-xl shadow-lg`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-blue-700 dark:text-blue-400">💧 Real-Time Water Dashboard</h2>
        <Link to="/" className="text-sm text-blue-500 hover:underline">← Home</Link>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 text-center text-sm mb-6">
        <div className="p-4 bg-blue-100 dark:bg-blue-800 rounded shadow">
          <p className="text-4xl font-bold text-blue-600 dark:text-white">{usage} L</p>
          <p>Total Water Used</p>
        </div>
        <div className="p-4 bg-green-100 dark:bg-green-800 rounded shadow">
          <p className="text-4xl font-bold text-green-600 dark:text-white">{flowRate} L/min</p>
          <p>Flow Rate</p>
        </div>
        <div className="p-4 bg-purple-100 dark:bg-purple-800 rounded shadow">
          <p className="text-4xl font-bold text-purple-600 dark:text-white">₹ {(usage * 3.2).toFixed(2)}</p>
          <p>Current Cost</p>
        </div>
      </div>

      {leakDetected && (
        <div className="bg-red-200 text-red-800 p-3 mb-4 rounded font-semibold animate-pulse">
          🚨 Leak Detected! Please check your pipes.
        </div>
      )}

      {/* Controls */}
      <div className="flex flex-wrap justify-between items-center gap-3 mb-5">
        <div className="flex gap-2">
          <select value={mode} onChange={e => setMode(e.target.value)} className="border px-3 py-1 rounded text-sm">
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
          <button onClick={() => setShowCost(!showCost)} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs shadow">
            {showCost ? 'Show Litres' : 'Show Cost'}
          </button>
          <button onClick={() => setDarkMode(!darkMode)} className="bg-gray-700 text-white px-3 py-1 rounded text-xs shadow">
            {darkMode ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>
        <div>
          <button
            onClick={() => {
              const csv = ['Label,Usage (L),Cost (₹)', ...data.map(d => `${d.label},${d.usage},${d.cost}`)].join('\n');
              const blob = new Blob([csv], { type: 'text/csv' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `WaterUsage_${mode}.csv`;
              a.click();
            }}
            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 text-xs rounded shadow">
            📤 Export CSV
          </button>
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip formatter={(val) => showCost ? `₹ ${val}` : `${val} L`} />
          <Line type="monotone" dataKey={showCost ? 'cost' : 'usage'} stroke="#3b82f6" strokeWidth={2} />
          <Line type="monotone" data={forecast} dataKey={showCost ? 'cost' : 'usage'} stroke="#facc15" strokeDasharray="5 5" />
        </LineChart>
      </ResponsiveContainer>

      {/* Goal Tracker */}
      <div className="mt-6">
        <p className="font-medium mb-1">🎯 Goal Progress: {total.toFixed(1)} / {goal} L</p>
        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
          <div className="bg-blue-500 h-full" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      {/* Bar chart (historical compare) */}
      <div className="mt-10">
        <h3 className="text-lg font-bold mb-2">📊 Weekly Storage vs Usage</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data}>
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="usage" fill="#0ea5e9" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* AI Tip */}
      <div className="mt-6 text-center text-sm italic text-gray-500 dark:text-gray-300">
        🤖 Tip: Reduce usage by installing low-flow aerators and checking for leaks regularly.
      </div>
    </div>
  );
}
