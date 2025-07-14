import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const initialState = [
  { name: 'Smart Refrigerator', isOn: true },
  { name: 'AI Air Conditioner', isOn: false },
  { name: 'Eco Washing Machine', isOn: false },
  { name: 'Desert Cooler', isOn: true },
];

export default function ApplianceControls() {
  const [appliances, setAppliances] = useState(initialState);

  const togglePower = (index) => {
    const updated = [...appliances];
    updated[index].isOn = !updated[index].isOn;
    setAppliances(updated);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-indigo-700">🎛️ Appliance Control</h2>
        <Link to="/dashboard" className="text-sm text-blue-500 hover:underline">← Back</Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {appliances.map((appliance, index) => (
          <div
            key={index}
            className={`rounded-lg p-4 shadow text-center border-2 transition duration-300 ${
              appliance.isOn ? 'bg-green-100 border-green-400' : 'bg-red-100 border-red-400'
            }`}
          >
            <h4 className="font-bold text-lg">{appliance.name}</h4>
            <p className="text-sm text-gray-600 mb-3">
              Status:{" "}
              <span className={`font-semibold ${appliance.isOn ? 'text-green-700' : 'text-red-600'}`}>
                {appliance.isOn ? 'ON' : 'OFF'}
              </span>
            </p>
            <button
              onClick={() => togglePower(index)}
              className={`px-4 py-2 text-white rounded-full text-sm ${
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
