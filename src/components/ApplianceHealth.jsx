import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const appliances = [
  { appliance: 'Smart Refrigerator', status: '✅ Healthy', notes: 'All systems operational' },
  { appliance: 'Air Conditioner', status: '⚠️ Filter Needs Cleaning', notes: 'Airflow slightly restricted' },
  { appliance: 'Washing Machine', status: '✅ Healthy', notes: 'Running smoothly' },
  { appliance: 'Desert Cooler', status: '🔧 Low Efficiency', notes: 'Water pump needs servicing' },
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
      ? 'bg-gradient-to-r from-green-500 to-green-300 border-green-600 text-white'
      : score >= 70
      ? 'bg-gradient-to-r from-yellow-500 to-yellow-300 border-yellow-600 text-white'
      : 'bg-gradient-to-r from-red-500 to-red-300 border-red-600 text-white';

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-gradient-to-br from-gray-100 to-white'} p-8`}>
      <div className="max-w-7xl mx-auto rounded-2xl shadow-2xl backdrop-blur-lg bg-opacity-30 p-6">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-600 animate-pulse">
            🛠️ Appliance Health Dashboard
          </h2>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="px-4 py-2 text-sm font-semibold rounded-lg bg-gradient-to-r from-gray-700 to-gray-600 text-white hover:from-gray-800 hover:to-gray-700 shadow-md hover:shadow-lg transition-all duration-300"
            >
              {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
            </button>
            <button
              onClick={downloadCSV}
              className="px-4 py-2 text-sm font-semibold rounded-lg bg-gradient-to-r from-green-600 to-green-400 text-white hover:from-green-700 hover:to-green-500 shadow-md hover:shadow-lg transition-all duration-300"
            >
              📥 Export CSV
            </button>
            <Link to="/" className="text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors duration-300">
              ← Back
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {healthData.map(({ appliance, status, score, notes }) => (
            <div
              key={appliance}
              className={`relative rounded-xl p-5 border-l-4 ${getStatusColor(score)} shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 backdrop-blur-md bg-opacity-80 group`}
            >
              <div className="absolute inset-0 rounded-xl bg-white bg-opacity-10 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative flex justify-between items-center mb-2">
                <h3 className="font-bold text-lg">{appliance}</h3>
                <button
                  onClick={() => {
                    setSelectedAppliance(appliance);
                    setModalOpen(true);
                  }}
                  className="px-3 py-1 text-xs font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg transition-all duration-300"
                >
                  Schedule Maintenance
                </button>
              </div>
              <p className="text-sm font-medium">{status}</p>
              <p className="text-xs italic opacity-80 mt-1">{notes}</p>
              <div className="relative mt-3 w-full bg-gray-300 dark:bg-gray-700 h-4 rounded-full overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-4 rounded-full transition-all duration-500"
                  style={{
                    width: `${score}%`,
                    background: score >= 85 ? 'linear-gradient(to right, #22c55e, #16a34a)' : score >= 70 ? 'linear-gradient(to right, #facc15, #eab308)' : 'linear-gradient(to right, #ef4444, #dc2626)',
                  }}
                ></div>
              </div>
              <p className="text-right text-xs font-semibold mt-2">{score}% Efficiency</p>
            </div>
          ))}
        </div>

        <div className="mb-8">
          <h4 className="text-xl font-semibold mb-4 text-white drop-shadow-md">
            📊 {selectedAppliance} - Health Trend (Last 14 Days)
          </h4>
          <div className="rounded-xl p-4 bg-white/10 dark:bg-black/20 backdrop-blur-lg shadow-xl">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#4b5563' : '#d1d5db'} />
                <XAxis dataKey="date" stroke={darkMode ? '#9ca3af' : '#6b7280'} />
                <YAxis stroke={darkMode ? '#9ca3af' : '#6b7280'} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: darkMode ? '#1f2937' : '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  }}
                />
                <Line type="monotone" dataKey="score" stroke="#f59e0b" strokeWidth={3} dot={{ r: 5 }} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {modalOpen && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-96 shadow-2xl transform transition-all duration-300 scale-100">
              <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">🛠️ Schedule Maintenance</h3>
              <p className="text-sm mb-6 text-gray-600 dark:text-gray-300">
                Schedule maintenance for <strong>{selectedAppliance}</strong>. Confirm?
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 text-sm font-semibold rounded-lg bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white hover:bg-gray-400 dark:hover:bg-gray-700 transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    alert('✅ Maintenance has been scheduled!');
                    setModalOpen(false);
                  }}
                  className="px-4 py-2 text-sm font-semibold rounded-lg bg-gradient-to-r from-green-600 to-green-400 text-white hover:from-green-700 hover:to-green-500 shadow-md hover:shadow-lg transition-all duration-300"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}