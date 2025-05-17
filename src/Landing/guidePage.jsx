import { useState } from 'react';
import { Download, GraduationCap, BookOpen, Building2, Award, Lightbulb } from 'lucide-react';
import './index.css';

function GuidePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="">
      <header className="sticky top-0 z-50 bg-transparent backdrop-blur-md shadow-md">
        <nav className="flex items-center justify-between p-4 lg:px-6">
          {/* Logo */}
          <div className="flex lg:flex-1">
            <a href="/" className="-m-1.5 p-1.5 flex items-center">
              <img
                alt="InternTrail Logo"
                src="/logo.png"
                className="h-8 w-auto"
              />
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="lg:flex lg:gap-x-8">
            <a
              href="/"
              className="text-md font-semibold text-gray-900 hover:text-indigo-600 transition duration-300"
            >
              Back to Homepage
            </a>
          </div>
        </nav>
      </header>

      <main className="relative isolate px-6 pt-10 lg:px-8">
        
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
      
      {/* Third Blob (Optional for more complexity) */}
      <div
        className="absolute top-60 left-1/2 -translate-x-1/2 transform-gpu blur-3xl"
        style={{
          background: 'radial-gradient(circle at 50% 50%, #80d5ff, transparent 60%)',
          width: '400px',
          height: '400px',
          borderRadius: '30% 70% 50% 50% / 50% 30% 70% 50%',
          opacity: 0.2,
        }}
      ></div>
    </div>

        <div className="mx-auto max-w-4xl pt-20 pb-10 sm:py-24 lg:pt-24 lg:pb-10">
          <div className="text-center">
            {/* Decorative Icon */}
            <div className="inline-flex items-center justify-center p-4 mb-8 rounded-full bg-indigo-100 shadow-lg">
              <Lightbulb size={48} className="text-indigo-600" />
            </div>
            <h1 className="text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
              Welcome to the InternTrail Guide
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-500">
              Learn how to navigate and make the most out of InternTrail.
            </p>
          </div>
        </div>

        <section className="py-16">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-semibold text-gray-900 mb-4">
                    Getting Started
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Follow these steps to get started with InternTrail:
                </p>
                </div>
            <div className="container mx-auto">
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="p-6 border rounded-lg shadow-sm">
                    <h3 className="text-xl font-semibold mb-2 text-center">Step 1: Sign Up</h3>
                    <p className="text-gray-600 text-center">
                    Create an account by clicking the "Get Started" button on the homepage.
                    </p>
                </div>
                <div className="p-6 border rounded-lg shadow-sm">
                    <h3 className="text-xl font-semibold mb-2 text-center">Step 2: Set Up Your Profile</h3>
                    <p className="text-gray-600 text-center">
                    Fill in your details to complete your profile and get started.
                    </p>
                </div>
                <div className="p-6 border rounded-lg shadow-sm">
                    <h3 className="text-xl font-semibold mb-2 text-center">Step 3: Explore Features</h3>
                    <p className="text-gray-600 text-center">
                    Navigate through the dashboard to explore tools like trainee management, announcements, and more.
                    </p>
                </div>
                </div>
            </div>
        </section>

        <section className="py-16">
        <div className="text-center mb-12">
            <h2 className="text-4xl font-semibold text-gray-900 mb-4">
              User Manuals
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Download comprehensive user manuals tailored for your specific role.
            </p>
          </div>
          
        <div className="container mx-auto">

          
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="p-6 border rounded-lg shadow-sm flex flex-col items-center">

              <div className="bg-indigo-100 p-3 rounded-full mb-4">
                <GraduationCap className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center">Student Trainee</h3>
              <p className="text-gray-600 text-center mb-4">
                Guide for tracking hours and submitting requirements
              </p>
              <a 
                href="/manuals/User_Manual_Student_Trainee.pdf" 
                className="mt-auto flex items-center gap-2 text-indigo-600 font-medium hover:text-indigo-800 transition-colors"
                download
              >
                <Download size={18} />
                <span>Download PDF</span>
              </a>
            </div>
            
            <div className="p-6 border rounded-lg shadow-sm flex flex-col items-center">
              <div className="bg-purple-100 p-3 rounded-full mb-4">
                <BookOpen className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center">College Coordinator</h3>
              <p className="text-gray-600 text-center mb-4">
                Manual for managing students and coordinating internships
              </p>
              <a 
                href="/manuals/User_Manual_OJT_Coordinator.pdf" 
                className="mt-auto flex items-center gap-2 text-purple-600 font-medium hover:text-purple-800 transition-colors"
                download
              >
                <Download size={20} />
                <span>Download PDF</span>
              </a>
            </div>
            
            <div className="p-6 border rounded-lg shadow-sm flex flex-col items-center">
              <div className="bg-amber-100 p-3 rounded-full mb-4">
                <Building2 className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center">HTE Supervisor</h3>
              <p className="text-gray-600 text-center mb-4">
                Guide for evaluating and managing intern performance
              </p>
              <a 
                href="/manuals/User_Manual_of_HTE_Supervisor.pdf" 
                className="mt-auto flex items-center gap-2 text-amber-600 font-medium hover:text-amber-800 transition-colors"
                download
              >
                <Download size={18} />
                <span>Download PDF</span>
              </a>
            </div>
            
            <div className="p-6 border rounded-lg shadow-sm flex flex-col items-center">
              <div className="bg-green-100 p-3 rounded-full mb-4">
                <Award className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center">Dean</h3>
              <p className="text-gray-600 text-center mb-4">
                Manual for overseeing college internship programs
              </p>
              <a 
                href="/manuals/User_Manual_of_Dean.pdf" 
                className="mt-auto flex items-center gap-2 text-green-600 font-medium hover:text-green-800 transition-colors"
                download
              >
                <Download size={18} />
                <span>Download PDF</span>
              </a>
            </div>

            
          </div>

        </div>
      </section>

        <section className="py-16 bg-gray-50">
        <div className="container mx-auto">
            
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-12">
                <h2 className="text-4xl font-semibold text-gray-900 mb-4">
                    Frequently Asked Questions
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Find answers to common questions about using InternTrail.
                </p>
                </div>
                <div className="space-y-8">
                    <div className="text-center">
                        <h3 className="text-lg font-semibold mb-2">How do I track my hours?</h3>
                        <p className="text-gray-600 mx-auto max-w-lg">
                            Use the dashboard to view your total rendered hours and progress toward your required hours.
                        </p>
                    </div>
                
                <div className="text-center">
                    <h3 className="text-lg font-semibold mb-2">How do I upload documents?</h3>
                    <p className="text-gray-600 mx-auto max-w-lg">
                        Navigate to the "Requirements" section and use the upload feature to submit your files.
                    </p>
                </div>
                
                <div className="text-center">
                    <h3 className="text-lg font-semibold mb-2">Who can I contact for support?</h3>
                    <p className="text-gray-600 mx-auto max-w-lg">
                        Reach out to your coordinator or directly contact us via Google Forms.
                    </p>
                </div>
            </div>
            </div>
        </div>
        </section>

      </main>

      <footer className="border-t border-gray-200 py-8 mt-24 w-full">
        <div className="w-full text-center">
          <p className="text-sm text-gray-600">
            &copy; 2025 InternTrail. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default GuidePage;