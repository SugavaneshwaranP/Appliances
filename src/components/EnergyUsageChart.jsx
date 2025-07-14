import React, { useEffect, useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from 'recharts';
import { Link } from 'react-router-dom';

const applianceOptions = [
  'Smart Refrigerator',
  'AI Air Conditioner',
  'Eco Washing Machine',
  'Desert Air Cooler'
];

const roomOptions = ['Living Room', 'Bedroom', 'Kitchen', 'Utility'];

const themes = {
  green: { usage: '#22c55e', compare: '#6366f1', forecast: '#facc15' },
  blue: { usage: '#3b82f6', compare: '#8b5cf6', forecast: '#0ea5e9' },
  sunset: { usage: '#f97316', compare: '#e11d48', forecast: '#facc15' },
  cyberpunk: { usage: '#ec4899', compare: '#8b5cf6', forecast: '#f43f5e' },
};

const getForecast = (last) => +(last * (1 + Math.random() * 0.1)).toFixed(2);

export default function EnergyUsageChart() {
  const [data, setData] = useState([]);
  const [compareData, setCompareData] = useState([]);
  const [selectedAppliance, setSelectedAppliance] = useState(applianceOptions[0]);
  const [compareAppliance, setCompareAppliance] = useState(applianceOptions[1]);
  const [selectedRoom, setSelectedRoom] = useState(roomOptions[0]);
  const [showCost, setShowCost] = useState(false);
  const [mode, setMode] = useState('daily');
  const [forecast, setForecast] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [theme, setTheme] = useState('green');

  const generateData = (labelCount, labelName) => {
    return Array.from({ length: labelCount }).map((_, i) => {
      const usage = +(Math.random() * (selectedRoom === 'Kitchen' ? 15 : 10) + 2).toFixed(2);
      return {
        label: `${labelName} ${i + 1}`,
        usage,
        cost: +(usage * 6.5).toFixed(2),
      };
    });
  };

  const updateChartData = () => {
    let count = mode === 'hourly' ? 24 : mode === 'daily' ? 7 : 12;
    let label = mode === 'hourly' ? 'Hour' : mode === 'daily' ? 'Day' : 'Month';
    const d = generateData(count, label);
    const cd = generateData(count, label);
    const fc = d.map((item, idx) => ({
      ...item,
      label: `Forecast ${label} ${idx + 1}`,
      usage: getForecast(item.usage),
      cost: getForecast(item.cost),
    }));
    setData(d);
    setCompareData(cd);
    setForecast(fc);
  };

  useEffect(() => {
    updateChartData();
    const interval = setInterval(updateChartData, 15000);
    return () => clearInterval(interval);
  }, [mode, selectedAppliance, compareAppliance, selectedRoom]);

  const avg = data.length ? (data.reduce((a, b) => a + b.usage, 0) / data.length).toFixed(2) : 0;
  const max = data.length ? Math.max(...data.map(d => d.usage)) : 0;
  const min = data.length ? Math.min(...data.map(d => d.usage)) : 0;

  const downloadCSV = () => {
    const csvRows = [['Label', 'Usage (kWh)', 'Cost (₹)']];
    data.forEach(row => csvRows.push([row.label, row.usage, row.cost]));
    const blob = new Blob([csvRows.map(e => e.join(',')).join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedAppliance}_EnergyData.csv`;
    a.click();
  };

  return (
    <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-white'} p-6 max-w-6xl mx-auto rounded-xl shadow-lg`}>
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl sm:text-2xl font-bold text-green-600">
          🔋 Energy Tracker: {selectedAppliance} vs {compareAppliance}
        </h2>
        <Link to="/" className="text-sm text-blue-500 hover:underline">← Back to Home</Link>
      </div>

      <div className="flex flex-wrap justify-between gap-3 mb-6">
        <div className="flex gap-2">
          <select value={selectedAppliance} onChange={e => setSelectedAppliance(e.target.value)}
            className="text-sm border rounded px-3 py-1">
            {applianceOptions.map((a, i) => <option key={i}>{a}</option>)}
          </select>

          <select value={compareAppliance} onChange={e => setCompareAppliance(e.target.value)}
            className="text-sm border rounded px-3 py-1">
            {applianceOptions.map((a, i) => <option key={i}>{a}</option>)}
          </select>

          <select value={selectedRoom} onChange={e => setSelectedRoom(e.target.value)}
            className="text-sm border rounded px-3 py-1">
            {roomOptions.map((room, i) => <option key={i}>{room}</option>)}
          </select>

          <select value={theme} onChange={e => setTheme(e.target.value)}
            className="text-sm border rounded px-3 py-1">
            {Object.keys(themes).map(key => <option key={key}>{key}</option>)}
          </select>
        </div>

        <div className="flex gap-2 items-center">
          <button onClick={() => setMode(mode === 'hourly' ? 'daily' : mode === 'daily' ? 'monthly' : 'hourly')}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 text-xs rounded shadow">
            {mode === 'hourly' ? 'Switch to Daily' : mode === 'daily' ? 'Switch to Monthly' : 'Switch to Hourly'}
          </button>
          <button onClick={() => setShowCost(!showCost)}
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1 text-xs rounded shadow">
            {showCost ? 'Show kWh' : 'Show ₹'}
          </button>
          <button onClick={downloadCSV}
            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 text-xs rounded shadow">
            ⬇️ CSV
          </button>
          <button onClick={() => setDarkMode(!darkMode)}
            className="bg-gray-700 hover:bg-gray-800 text-white px-3 py-1 text-xs rounded shadow">
            {darkMode ? '☀️ Light' : '🌙 Dark'}
          </button>
          <button onClick={() => {
            navigator.clipboard.writeText(window.location.href + '?share=true');
            alert('🔗 Shareable chart link copied!');
          }}
            className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 text-xs rounded shadow">
            📤 Share
          </button>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <LineChart>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" stroke="#8884d8" />
          <YAxis />
          <Tooltip formatter={v => showCost ? `₹ ${v}` : `${v} kWh`} />
          <Line data={data} dataKey={showCost ? 'cost' : 'usage'} stroke={themes[theme].usage} strokeWidth={2} />
          <Line data={compareData} dataKey={showCost ? 'cost' : 'usage'} stroke={themes[theme].compare} strokeWidth={2} strokeDasharray="5 5" />
          <Line data={forecast} dataKey={showCost ? 'cost' : 'usage'} stroke={themes[theme].forecast} strokeWidth={2} strokeDasharray="4 2" />
        </LineChart>
      </ResponsiveContainer>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 text-center text-sm">
        <div className="bg-white text-gray-800 dark:bg-gray-800 dark:text-white p-4 rounded shadow">
          <p className="font-bold">🔍 Avg Usage</p>
          <p>{avg} kWh</p>
        </div>
        <div className="bg-white text-gray-800 dark:bg-gray-800 dark:text-white p-4 rounded shadow">
          <p className="font-bold">📈 Max</p>
          <p>{max.toFixed(2)} kWh</p>
        </div>
        <div className="bg-white text-gray-800 dark:bg-gray-800 dark:text-white p-4 rounded shadow">
          <p className="font-bold">📉 Min</p>
          <p>{min.toFixed(2)} kWh</p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
        {applianceOptions.map((device, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 p-4 rounded shadow flex flex-col items-center justify-between">
            <p className="font-semibold text-sm">{device}</p>
            <button
              onClick={() => alert(`${device} toggled`)}
              className="mt-2 px-4 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Toggle Power
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 text-sm italic text-gray-500 dark:text-gray-400 text-center">
        🌱 Tip: Reduce usage during peak hours to save up to 30% on your bill.
      </div>
    </div>
  );
}
