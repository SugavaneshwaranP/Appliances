import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const appliances = [
  {
    appliance: 'Smart Refrigerator',
    status: '✅ Healthy',
    notes: 'All systems operational',
  },
  {
    appliance: 'Air Conditioner',
    status: '⚠️ Filter Needs Cleaning',
    notes: 'Airflow slightly restricted',
  },
  {
    appliance: 'Washing Machine',
    status: '✅ Healthy',
    notes: 'Running smoothly',
  },
  {
    appliance: 'Desert Cooler',
    status: '🔧 Low Efficiency',
    notes: 'Water pump needs servicing',
  },
];

const generateRandomScore = () => Math.floor(Math.random() * 30 + 60);

export default function ApplianceHealth() {
  const [healthData, setHealthData] = useState(appliances.map(a => ({
    ...a,
    score: generateRandomScore(),
  })));

  const [darkMode, setDarkMode] = useState(false);
  const [selectedAppliance, setSelectedAppliance] = useState(appliances[0].appliance);
  const [modalOpen, setModalOpen] = useState(false);
  const [trendData, setTrendData] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setHealthData(prev =>
        prev.map(h => ({ ...h, score: generateRandomScore() }))
      );
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const trend = Array.from({ length: 14 }, (_, i) => ({
      date: `Day ${i + 1}`,
      score: generateRandomScore(),
    }));
    setTrendData(trend);
  }, [selectedAppliance]);

  const downloadCSV = () => {
    const csv = [
      ['Appliance', 'Score'],
      ...healthData.map(({ appliance, score }) => [appliance, score]),
    ]
      .map(row => row.join(','))
      .join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'appliance_health.csv';
    a.click();
  };

  const getStatusColor = score =>
    score >= 85
      ? 'bg-green-100 border-green-600 text-green-800'
      : score >= 70
      ? 'bg-yellow-100 border-yellow-600 text-yellow-800'
      : 'bg-red-100 border-red-600 text-red-800';

  return (
    <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-white'} p-6 max-w-6xl mx-auto rounded-xl shadow-lg`}>
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-bold text-yellow-700 dark:text-yellow-400">
          🛠️ Appliance Health Dashboard
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="text-xs px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-800"
          >
            {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
          <button
            onClick={downloadCSV}
            className="text-xs px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
          >
            📥 Export CSV
          </button>
          <Link to="/" className="text-sm text-blue-500 hover:underline">← Back</Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
        {healthData.map(({ appliance, status, score, notes }) => (
          <div
            key={appliance}
            className={`rounded-xl p-4 border-l-4 ${getStatusColor(score)} shadow-md transition`}
          >
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-bold">{appliance}</h3>
              <button
                onClick={() => {
                  setSelectedAppliance(appliance);
                  setModalOpen(true);
                }}
                className="text-xs px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Schedule Maintenance
              </button>
            </div>
            <p className="text-sm">{status}</p>
            <p className="text-xs italic text-gray-600 dark:text-gray-400">{notes}</p>
            <div className="relative mt-2 w-full bg-gray-200 dark:bg-gray-700 h-3 rounded">
              <div
                className="absolute top-0 left-0 h-3 rounded"
                style={{
                  width: `${score}%`,
                  backgroundColor:
                    score >= 85 ? '#22c55e' : score >= 70 ? '#facc15' : '#ef4444',
                }}
              ></div>
            </div>
            <p className="text-right text-xs mt-1">{score}% Efficiency</p>
          </div>
        ))}
      </div>

      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">
          📊 {selectedAppliance} - Health Trend (Last 14 Days)
        </h4>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" stroke="#8884d8" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="score" stroke="#f59e0b" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {modalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-80 shadow-xl">
            <h3 className="text-lg font-bold mb-3">🛠️ Schedule Maintenance</h3>
            <p className="text-sm mb-4">
              You are scheduling maintenance for <strong>{selectedAppliance}</strong>. Confirm?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setModalOpen(false)}
                className="px-3 py-1 text-sm rounded bg-gray-300 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert('✅ Maintenance scheduled!');
                  setModalOpen(false);
                }}
                className="px-3 py-1 text-sm rounded bg-green-600 text-white hover:bg-green-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
