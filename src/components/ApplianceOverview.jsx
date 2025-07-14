import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const appliancesData = [
  { name: 'Smart Refrigerator', icon: '🥶' },
  { name: 'AI Air Conditioner', icon: '❄️' },
  { name: 'Eco Washing Machine', icon: '🧺' },
  { name: 'Desert Air Cooler', icon: '💨' },
];

export default function ApplianceOverview() {
  const [data, setData] = useState([]);
  const [showCost, setShowCost] = useState(false);

  const toggleAppliance = (index) => {
    const updated = [...data];
    updated[index].isOn = !updated[index].isOn;
    setData(updated);
  };

  useEffect(() => {
    const generateData = () => {
      const updated = appliancesData.map(appliance => {
        const usage = +(Math.random() * 5 + 1).toFixed(2);
        const temp = appliance.name.includes('Refrigerator') || appliance.name.includes('Air Conditioner')
          ? +(Math.random() * 20 + 5).toFixed(1)
          : null;
        const battery = Math.floor(Math.random() * 100);
        const water = appliance.name.includes('Washing') || appliance.name.includes('Cooler')
          ? +(Math.random() * 30 + 10).toFixed(1)
          : null;
        const status = usage < 2.5 ? 'Efficient' : usage < 4 ? 'Moderate' : 'High';
        const online = Math.random() > 0.1;
        const isOn = Math.random() > 0.5;
        const priority = Math.random() > 0.6;
        const alerts = usage > 4.5 ? '⚠️ High energy consumption!' : null;
        const maintenanceDue = battery < 20;

        return {
          ...appliance,
          usage,
          temp,
          battery,
          water,
          status,
          online,
          isOn,
          priority,
          alerts,
          maintenanceDue,
        };
      });

      setData(updated);
    };

    generateData();
    const interval = setInterval(generateData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto bg-white rounded-xl shadow-lg animate-fade-in">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-green-700">📊 Appliance Overview</h2>
        <div className="flex gap-4 items-center">
          <button
            onClick={() => setShowCost(!showCost)}
            className="text-xs text-white bg-indigo-500 hover:bg-indigo-600 px-3 py-1 rounded"
          >
            Toggle {showCost ? 'kWh' : '₹'}
          </button>
          <Link to="/dashboard" className="text-sm text-blue-500 hover:underline">← Back</Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {data.map((appliance, index) => (
          <div
            key={appliance.name}
            className="bg-white border border-gray-200 rounded-xl p-5 shadow hover:shadow-lg transition-transform transform hover:-translate-y-1"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-4xl">{appliance.icon}</span>
              <span className={`text-xs px-2 py-1 rounded-full ${appliance.online ? 'bg-green-300 text-green-900' : 'bg-gray-300 text-gray-600'}`}>
                {appliance.online ? 'Online' : 'Offline'}
              </span>
            </div>

            <h4 className="text-lg font-semibold text-gray-800">{appliance.name}</h4>

            {appliance.alerts && (
              <div className="text-xs text-red-600 mt-1 animate-pulse">{appliance.alerts}</div>
            )}

            <div className="mt-2 text-sm text-gray-700">
              Energy:
              <span className="font-semibold ml-1">
                {showCost ? `₹ ${(appliance.usage * 6.5).toFixed(2)}` : `${appliance.usage} kWh`}
              </span>
            </div>

            {appliance.water && (
              <div className="text-sm text-blue-700">Water: {appliance.water} L</div>
            )}

            {appliance.temp && (
              <div className={`text-sm ${appliance.temp > 20 ? 'text-red-500' : 'text-green-600'}`}>
                Temp: {appliance.temp}°C
              </div>
            )}

            {appliance.maintenanceDue && (
              <div className="text-xs text-yellow-600 mt-1">
                🛠️ Maintenance suggested soon
              </div>
            )}

            {appliance.priority && (
              <div className="text-xs bg-yellow-200 text-yellow-800 px-2 py-0.5 mt-1 inline-block rounded-full">
                ⭐ Priority Device
              </div>
            )}

            <div className="text-sm mt-2 text-gray-600">Battery:</div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-1 mb-2">
              <div className={`h-2 rounded-full transition-all duration-500 ${appliance.battery > 60 ? 'bg-green-500' : appliance.battery > 30 ? 'bg-yellow-400' : 'bg-red-500'}`} style={{ width: `${appliance.battery}%` }}></div>
            </div>

            <span className={`text-xs px-3 py-1 rounded-full ${
              appliance.status === 'Efficient'
                ? 'bg-green-600 text-white'
                : appliance.status === 'Moderate'
                ? 'bg-yellow-400 text-black'
                : 'bg-red-500 text-white'
            }`} title={`Efficiency level: ${appliance.status}`}>
              {appliance.status}
            </span>

            <button
              onClick={() => toggleAppliance(index)}
              className={`mt-4 w-full py-2 rounded text-white text-sm transition ${
                appliance.isOn ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
              }`}
            >
              {appliance.isOn ? 'Turn OFF' : 'Turn ON'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
