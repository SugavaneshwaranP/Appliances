import React from 'react';
import { Link } from 'react-router-dom';

const features = [
  { name: 'Appliance Overview', route: '/overview', icon: '📦', color: 'from-green-500 to-green-300', text: 'Track performance & real-time status of all appliances' },
  { name: 'Energy Usage', route: '/energy', icon: '⚡', color: 'from-yellow-500 to-yellow-300', text: 'Analyze energy consumption over time' },
  { name: 'Water Consumption', route: '/water', icon: '💧', color: 'from-blue-500 to-blue-300', text: 'Monitor water usage across devices' },
  { name: 'Alerts & Notifications', route: '/alerts', icon: '🚨', color: 'from-red-500 to-red-300', text: 'See latest warnings and suggestions' },
  { name: 'Appliance Health', route: '/health', icon: '🛠️', color: 'from-amber-500 to-amber-300', text: 'Check appliance maintenance and health status' },
  { name: 'Scheduler', route: '/scheduler', icon: '⏰', color: 'from-purple-500 to-purple-300', text: 'Schedule tasks for appliances smartly' },
  { name: 'Sustainability Goals', route: '/goals', icon: '🌱', color: 'from-emerald-500 to-emerald-300', text: 'Track your conservation progress' },
  { name: 'Carbon Meter', route: '/carbon', icon: '🌍', color: 'from-gray-500 to-gray-300', text: 'Estimate carbon footprint' },
  { name: 'Appliance Controls', route: '/controls', icon: '🎛️', color: 'from-indigo-500 to-indigo-300', text: 'Turn devices on/off in real-time' },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600 animate-pulse">
             Smart Resource Dashboard
          </h1>
          <Link
            to="/"
            className="relative px-6 py-3 text-white font-semibold rounded-lg bg-gradient-to-r from-blue-600 to-blue-400 shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-blue-500 transition-all duration-300"
          >
            Home
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(({ name, route, icon, color, text }) => (
            <Link
              to={route}
              key={name}
              className={`relative p-6 rounded-2xl bg-gradient-to-br ${color} backdrop-blur-lg bg-opacity-30 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 group`}
            >
              <div className="absolute inset-0 rounded-2xl bg-white bg-opacity-10 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative text-5xl mb-4 animate-bounce">{icon}</div>
              <h3 className="font-bold text-xl text-white drop-shadow-md">{name}</h3>
              <p className="text-sm text-gray-100 mt-2 drop-shadow-sm">{text}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}