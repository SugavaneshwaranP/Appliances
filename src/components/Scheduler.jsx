import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiCalendar, FiUpload, FiDownload, FiMic } from 'react-icons/fi';

export default function Scheduler() {
  const [schedules, setSchedules] = useState([]);
  const [form, setForm] = useState({ appliance: '', time: '', recurring: false });
  const [darkMode, setDarkMode] = useState(false);
  const [conflictAlert, setConflictAlert] = useState('');
  const recognitionRef = useRef(null);
const [language, setLanguage] = useState('en-IN'); // Default English

  useEffect(() => {
    const interval = setInterval(() => {
      console.log('🔄 Real-time sync with backend...');
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const detectConflict = (time) => {
    return schedules.find((s) => s.time === time);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.appliance || !form.time) return;
    const conflict = detectConflict(form.time);
    if (conflict) {
      setConflictAlert(`⛔ Conflict: ${conflict.appliance} already schedule at ${conflict.time}`);
      return;
    }
    setSchedules([...schedules, { ...form, id: Date.now() }]);
    setForm({ appliance: '', time: '', recurring: false });
    setConflictAlert('');
  };

  const handleExportCSV = () => {
    const csv = ['Appliance,Time,Recurring'];
    schedules.forEach(({ appliance, time, recurring }) => {
      csv.push(`${appliance},${time},${recurring}`);
    });
    const blob = new Blob([csv.join('\n')], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'schedules.csv';
    a.click();
  };

  const startVoiceCommand = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Voice recognition not supported in this browser');
      return;
    }
    const SpeechRecognition = window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
recognition.lang = language;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      console.log('🎙️ Voice Input:', transcript);
      const match = transcript.match(/schedule (.+?) at (\d{1,2})(?::(\d{2}))?\s*(am|pm)?/);

      if (match) {
        const appliance = match[1];
        let hour = parseInt(match[2]);
        const minutes = match[3] || '00';
        const period = match[4];

        if (period === 'pm' && hour < 12) hour += 12;
        if (period === 'am' && hour === 12) hour = 0;

        const formattedTime = `${hour.toString().padStart(2, '0')}:${minutes}`;
        setForm({ appliance, time: formattedTime, recurring: false });

        // Voice confirmation
        setTimeout(() => {
          const synth = window.speechSynthesis;
          const msg = new SpeechSynthesisUtterance(`Scheduled ${appliance} at ${formattedTime}`);
          synth.speak(msg);
        }, 500);
      } else {
        alert('❌ Could not understand. Try: "Schedule AC at 6 PM"');
      }
    };

    recognition.onerror = (err) => console.error('Voice error:', err);
    recognition.start();
    recognitionRef.current = recognition;
  };

  return (
    <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} min-h-screen p-6`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-purple-600 flex items-center gap-2">⏰ Smart Scheduler</h2>
        <div className="flex gap-3">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-800 text-sm"
          >
            {darkMode ? '☀️ Light' : '🌙 Dark'}
          </button>

<select
  value={language}
  onChange={(e) => setLanguage(e.target.value)}
  className="text-sm border px-2 py-1 rounded bg-white dark:bg-gray-700 dark:text-white"
>
  <option value="en-IN">🇬🇧 English</option>
  <option value="hi-IN">🇮🇳 Hindi</option>
  <option value="ta-IN">🇮🇳 Tamil</option>
</select>


          <Link to="/" className="text-blue-500 hover:underline text-sm">← Back to Home</Link>
        </div>
      </div>

      {conflictAlert && (
        <div className="bg-red-100 text-red-800 border border-red-300 p-3 rounded mb-4">
          {conflictAlert}
        </div>
      )}

      <form onSubmit={handleAdd} className="grid md:grid-cols-3 gap-4 items-center bg-purple-50 p-4 rounded-lg shadow mb-6">
        <input
          type="text"
          name="appliance"
          value={form.appliance}
          onChange={handleChange}
          placeholder="Appliance name"
          className="border border-gray-300 px-3 py-2 rounded"
        />
        <input
          type="time"
          name="time"
          value={form.time}
          onChange={handleChange}
          className="border border-gray-300 px-3 py-2 rounded"
        />
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="recurring"
            checked={form.recurring}
            onChange={handleChange}
            className="accent-purple-600"
          />
          Recurring Daily
        </label>
        <div className="md:col-span-3 flex gap-3">
          <button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded text-sm w-full">
            ➕ Add Schedule
          </button>
          <button
            type="button"
            onClick={startVoiceCommand}
            className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded text-sm w-full flex items-center gap-2 justify-center"
          >
            <FiMic /> Voice Schedule
          </button>
        </div>
      </form>

      <div className="flex flex-wrap justify-between items-center mb-4">
        <div className="flex gap-4 text-sm">
          <button
            className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600 flex items-center gap-2"
            onClick={handleExportCSV}
          >
            <FiDownload /> Export CSV
          </button>
          <button
            className="bg-indigo-500 text-white px-4 py-1 rounded hover:bg-indigo-600 flex items-center gap-2"
            onClick={handleExportCSV}
          >
            <FiUpload /> Share Schedule
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2 sm:mt-0 italic">
          Tip: Schedule during off-peak hours (6AM–8AM, 10PM–12AM)
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4 text-sm">
        {schedules.map(({ appliance, time, recurring }, idx) => (
          <div key={idx} className="bg-white dark:bg-gray-800 p-4 rounded shadow flex justify-between items-center">
            <div>
              <p className="font-semibold">{appliance}</p>
              <p className="text-gray-500 dark:text-gray-300">{time} {recurring ? '🔁 Daily' : ''}</p>
            </div>
            <FiCalendar className="text-purple-600 text-xl" />
          </div>
        ))}
      </div>

      <div className="mt-6 text-sm text-center text-gray-500 dark:text-gray-400">
        💡 <strong>AI Tip:</strong> Try scheduling your washing machine at 6:30 AM tomorrow to save ~18% on energy!
      </div>
    </div>
  );
}
