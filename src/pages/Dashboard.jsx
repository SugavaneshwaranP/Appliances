// Dashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const features = [
  { name: 'Appliance Overview', route: '/overview', icon: '📦', color: 'bg-green-100', text: 'Track performance & real-time status of all appliances' },
  { name: 'Energy Usage', route: '/energy', icon: '⚡', color: 'bg-yellow-100', text: 'Analyze energy consumption over time' },
  { name: 'Water Consumption', route: '/water', icon: '💧', color: 'bg-blue-100', text: 'Monitor water usage across devices' },
  { name: 'Alerts & Notifications', route: '/alerts', icon: '🚨', color: 'bg-red-100', text: 'See latest warnings and suggestions' },
  { name: 'Appliance Health', route: '/health', icon: '🛠️', color: 'bg-amber-100', text: 'Check appliance maintenance and health status' },
  { name: 'Scheduler', route: '/scheduler', icon: '⏰', color: 'bg-purple-100', text: 'Schedule tasks for appliances smartly' },
  { name: 'Sustainability Goals', route: '/goals', icon: '🌱', color: 'bg-emerald-100', text: 'Track your conservation progress' },
  { name: 'Carbon Meter', route: '/carbon', icon: '🌍', color: 'bg-gray-100', text: 'Estimate carbon footprint' },
  { name: 'Appliance Controls', route: '/controls', icon: '🎛️', color: 'bg-indigo-100', text: 'Turn devices on/off in real-time' },
];

export default function Dashboard() {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-green-700">
          🌿 Smart Resource Dashboard
        </h1>
        <Link
          to="/"
          className="text-sm bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          ← Back to Home
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {features.map(({ name, route, icon, color, text }) => (
          <Link
            to={route}
            key={name}
            className={`p-5 rounded-xl shadow-md transform hover:scale-105 transition-all duration-300 ${color}`}
          >
            <div className="text-4xl mb-3">{icon}</div>
            <h3 className="font-semibold text-lg text-gray-800">{name}</h3>
            <p className="text-sm text-gray-600 mt-1">{text}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
