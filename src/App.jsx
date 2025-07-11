import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';

// 9 Feature Components
import ApplianceOverview from './components/ApplianceOverview';
import EnergyUsageChart from './components/EnergyUsageChart';
import WaterConsumption from './components/WaterConsumption';
import AlertsPanel from './components/AlertsPanel';
import ApplianceHealth from './components/ApplianceHealth';
import Scheduler from './components/Scheduler';
import SustainGoals from './components/SustainGoals';
import CarbonMeter from './components/CarbonMeter';
import ApplianceControls from './components/ApplianceControls';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/overview" element={<ApplianceOverview />} />
        <Route path="/energy" element={<EnergyUsageChart />} />
        <Route path="/water" element={<WaterConsumption />} />
        <Route path="/alerts" element={<AlertsPanel />} />
        <Route path="/health" element={<ApplianceHealth />} />
        <Route path="/scheduler" element={<Scheduler />} />
        <Route path="/goals" element={<SustainGoals />} />
        <Route path="/carbon" element={<CarbonMeter />} />
        <Route path="/controls" element={<ApplianceControls />} />
      </Routes>
    </Router>
  );
}
