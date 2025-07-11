import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

const initialAlerts = [
  {
    id: 1,
    message: '⚠️ AC usage was high yesterday',
    device: 'Air Conditioner',
    severity: 'medium',
    timestamp: '2025-06-29 08:45',
  },
  {
    id: 2,
    message: '💧 Cooler water level critically low',
    device: 'Cooler',
    severity: 'high',
    timestamp: '2025-06-29 07:10',
  },
];

const severityColors = {
  high: 'bg-red-100 border-red-600 text-red-800',
  medium: 'bg-yellow-100 border-yellow-500 text-yellow-700',
  low: 'bg-green-100 border-green-500 text-green-700',
};

export default function AlertsPanel() {
  const [alerts, setAlerts] = useState(initialAlerts);
  const [filter, setFilter] = useState('All');
  const [darkMode, setDarkMode] = useState(false);
  const [search, setSearch] = useState('');
  const [muted, setMuted] = useState(false);
  const alertEndRef = useRef(null);
  const audioRef = useRef(null);

  const filteredAlerts = alerts.filter(
    (a) =>
      (filter === 'All' || a.device === filter) &&
      a.message.toLowerCase().includes(search.toLowerCase())
  );

  const allDevices = ['All', ...new Set(alerts.map((a) => a.device))];

  useEffect(() => {
    // Simulate a high-priority alert after 10 seconds
    const timeout = setTimeout(() => {
      const newAlert = {
        id: Date.now(),
        message: '🚨 Energy surge in living room cooler!',
        device: 'Cooler',
        severity: 'high',
        timestamp: new Date().toLocaleString(),
        flash: true,
      };
      setAlerts((prev) => [...prev, newAlert]);

      // Play sound if not muted
      if (!muted && audioRef.current) {
        audioRef.current.play().catch((e) => console.log('Audio play blocked:', e));
      }
    }, 10000);

    return () => clearTimeout(timeout);
  }, [muted]);

  useEffect(() => {
    if (alertEndRef.current) {
      alertEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [alerts]);

  const dismissAlert = (id) => setAlerts(alerts.filter((a) => a.id !== id));

  return (
    <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-white'} p-6 max-w-4xl mx-auto rounded-xl shadow-lg`}>
      <audio ref={audioRef} src="godrej\public\mixkit-game-notification-wave-alarm-987.wav" preload="auto" />
      
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-bold text-red-700 dark:text-red-400">🚨 Alerts & Notifications</h2>
        <Link to="/" className="text-sm text-blue-500 hover:underline">← Back</Link>
      </div>

      <div className="flex flex-wrap justify-between items-center gap-3 mb-4">
        <div className="flex gap-2">
          <select value={filter} onChange={e => setFilter(e.target.value)} className="text-sm border rounded px-2 py-1">
            {allDevices.map((dev, i) => <option key={i}>{dev}</option>)}
          </select>
          <input
            type="text"
            placeholder="Search alerts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="text-sm border px-3 py-1 rounded"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="text-xs bg-gray-700 hover:bg-gray-800 text-white px-3 py-1 rounded shadow"
          >
            {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
          <button
            onClick={() => setMuted(!muted)}
            className={`text-xs px-3 py-1 rounded shadow ${muted ? 'bg-red-600' : 'bg-green-600'} text-white`}
          >
            {muted ? '🔇 Unmute' : '🔔 Mute Alerts'}
          </button>
        </div>
      </div>

      <ul className="space-y-4 max-h-[400px] overflow-y-auto pr-2 scroll-smooth">
        {filteredAlerts.length ? (
          filteredAlerts.map((alert) => (
            <li
              key={alert.id}
              className={`p-4 border-l-4 rounded shadow-md flex justify-between items-center transition-all duration-500 animate-in ${
                severityColors[alert.severity]
              } ${alert.flash ? 'animate-pulse' : ''}`}
            >
              <div>
                <p className="font-medium">{alert.message}</p>
                <p className="text-xs mt-1 text-gray-600 dark:text-gray-400">
                  [{alert.device}] — {alert.timestamp}
                </p>
              </div>
              <button
                onClick={() => dismissAlert(alert.id)}
                className="text-xs text-red-500 hover:text-red-700"
              >
                ✖ Dismiss
              </button>
            </li>
          ))
        ) : (
          <li className="text-center text-gray-500">No alerts found</li>
        )}
        <div ref={alertEndRef}></div>
      </ul>

      <div className="mt-6 text-xs text-gray-500 text-center dark:text-gray-400">
        📊 Tip: Customize alert thresholds and snooze non-critical alerts.
      </div>
    </div>
  );
}
