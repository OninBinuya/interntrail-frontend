import React from 'react';
import { ArrowLeft, Construction } from 'lucide-react';
import './index.css';

function WorkInProgress() {
  return (
    <div className=" min-h-screen flex flex-col">

      {/* Background gradient blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* First Blob */}
        <div
          className="absolute -top-40 left-1/4 -translate-x-1/2 transform-gpu blur-3xl"
          style={{
            background: 'radial-gradient(circle at 50% 50%, #ff80b5, transparent 60%)',
            width: '500px',
            height: '500px',
            borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%',
            opacity: 0.3,
          }}
        ></div>
        
        {/* Second Blob */}
        <div
          className="absolute -top-20 right-1/4 translate-x-1/3 transform-gpu blur-3xl"
          style={{
            background: 'radial-gradient(circle at 50% 50%, #9089fc, transparent 60%)',
            width: '600px',
            height: '600px',
            borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
            opacity: 0.3,
          }}
        ></div>
      </div>

      {/* Main content */}
      <div className="flex-grow flex flex-col items-center justify-center px-6">
        <div className="text-center">

          {/* Icon */}
          <div className="inline-flex items-center justify-center p-4 mb-8 rounded-full bg-indigo-100">
            <Construction size={48} className="text-indigo-600" />
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl font-semibold text-gray-900 mb-6">
            Sorry, <br></br>We're still in Development!
          </h1>
          
          {/* Message */}
          <p className="text-xl text-gray-600 max-w-md mx-auto mb-8">
            We're putting the final touches on InternTrail and it will be ready soon!
          </p>
          <p className="text-xl text-gray-600 max-w-md mx-auto mb-8">
            -InternTrail Team
          </p>
          
          {/* Button */}
          <a 
            href="/"
            className="inline-flex items-center rounded-md bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Return to Home
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 w-full">
        <div className="w-full text-center">
          <p className="text-sm text-gray-600">
            &copy; 2025 InternTrail. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default WorkInProgress;