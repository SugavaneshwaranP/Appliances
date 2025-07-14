import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 font-sans text-gray-800 overflow-x-hidden">
      
      {/* Navbar */}
      <header className="sticky top-0 bg-white shadow z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-extrabold text-green-700 animate-pulse">Godrej Sustain+</h1>
          <nav className="space-x-6 text-sm font-semibold">
            <Link to="/" className="text-green-700 hover:text-green-900 transition">Home</Link>
            <Link to="/dashboard" className="text-green-700 hover:text-green-900 transition">Dashboard</Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-24 px-6 text-center overflow-hidden">
        {/* Floating Bubbles */}
        <div className="absolute top-10 left-[-50px] w-40 h-40 bg-green-300 rounded-full opacity-20 animate-ping"></div>
        <div className="absolute bottom-0 right-[-50px] w-60 h-60 bg-blue-300 rounded-full opacity-30 animate-pulse"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-green-700 via-blue-600 to-green-500 animate-fade-in-down">
            Smart Living, Sustainable Future
          </h2>
          <p className="mt-4 text-lg md:text-xl text-gray-700 animate-fade-in-up">
            Track and reduce your energy & water usage with intelligent appliances.
          </p>
          <Link
            to="/dashboard"
            className="mt-10 inline-block px-8 py-3 bg-green-600 text-white text-lg rounded-full shadow-lg hover:bg-green-700 transition duration-300 animate-bounce"
          >
            Go to Dashboard →
          </Link>
        </div>

        {/* Floating Appliance Image */}
        <div className="mt-16">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2621/2621061.png"
            alt="Smart Appliance"
            className="w-72 mx-auto animate-float"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-green-50">
        <h3 className="text-3xl font-bold text-center text-green-800 mb-12 animate-fade-in-down">Eco-Smart Appliance Features</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {[
            {
              title: "Smart Fridge",
              icon: "https://cdn-icons-png.flaticon.com/512/1046/1046784.png",
              desc: "Optimize cooling with energy tracking & AI sensors.",
            },
            {
              title: "AI Air Conditioner",
              icon: "https://cdn-icons-png.flaticon.com/512/1046/1046871.png",
              desc: "Control cooling dynamically based on environment.",
            },
            {
              title: "Eco Washing Machine",
              icon: "https://cdn-icons-png.flaticon.com/512/1046/1046875.png",
              desc: "Water-saving with auto-load & smart washing cycles.",
            },
            {
              title: "Smart Desert Cooler",
              icon: "https://cdn-icons-png.flaticon.com/512/1046/1046816.png",
              desc: "Efficient air & water flow control system.",
            },
          ].map(({ title, icon, desc }, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1 hover:scale-105 duration-300 animate-fade-in-up"
            >
              <img src={icon} alt={title} className="w-16 h-16 mx-auto mb-4 animate-float" />
              <h4 className="text-xl font-semibold text-green-700">{title}</h4>
              <p className="mt-2 text-sm text-gray-600">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="bg-gradient-to-r from-green-700 to-blue-600 text-white py-20 text-center px-6">
        <h3 className="text-3xl font-bold animate-fade-in-down">Ready to Conserve Smarter?</h3>
        <p className="mt-4 text-lg animate-fade-in-up">Monitor. Analyze. Reduce. Make every drop and watt count.</p>
        <Link
          to="/dashboard"
          className="mt-8 inline-block bg-white text-green-700 font-semibold px-6 py-3 rounded-xl hover:bg-gray-100 transition animate-bounce"
        >
          Explore
        </Link>
      </section>

    
    </div>
  );
}
