"use client";
import React, { useState } from 'react';
import { ChevronDown, Users, Calendar, BookOpen, Award, Mail, Phone, MapPin, ExternalLink, Facebook, Linkedin, Twitter } from 'lucide-react';
import Image from 'next/image';

const AlumniPortal = () => {
  const [activeSection, setActiveSection] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Image width={100} height={100} src="/CollegeLogo.png" alt="GEC Bilaspur Logo" className="h-12 w-12" />
              <div>
                <h1 className="text-lg font-semibold text-gray-900">Alumni Association</h1>
                <p className="text-sm text-gray-600">Government Engineering College Bilaspur</p>
              </div>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#home" className="text-gray-700 hover:text-blue-600 font-medium">Home</a>
              <a href="#about" className="text-gray-700 hover:text-blue-600 font-medium">About</a>
              <a href="#directory" className="text-gray-700 hover:text-blue-600 font-medium">Directory</a>
              <a href="#events" className="text-gray-700 hover:text-blue-600 font-medium">Events</a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 font-medium">Contact</a>
            </nav>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
              Login
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="bg-gradient-to-r from-blue-50 to-indigo-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center items-center space-x-8 mb-8">
              <Image width={100} height={100} src="/Logo.png" alt="Alumni Club Logo" className="h-24 w-24" />
              <Image width={100} height={100} src="/CollegeLogo.png" alt="College Logo" className="h-24 w-24" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Welcome to GEC Bilaspur Alumni Network
            </h1>
            <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
              Connecting generations of engineers since 1964. Join our community of accomplished professionals 
              and stay connected with your alma mater.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-colors font-semibold">
                Register Now
              </button>
              <button className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-md hover:bg-blue-600 hover:text-white transition-colors font-semibold">
                Alumni Directory
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="text-3xl font-bold text-blue-600 mb-2">60+</div>
              <div className="text-gray-700">Years of Excellence</div>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="text-3xl font-bold text-blue-600 mb-2">7</div>
              <div className="text-gray-700">Engineering Departments</div>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="text-3xl font-bold text-blue-600 mb-2">5000+</div>
              <div className="text-gray-700">Alumni Worldwide</div>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-700">Companies Represented</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">About GEC Bilaspur</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Established in 1964, Government Engineering College Bilaspur has been a cornerstone of 
              technical education in Chhattisgarh, producing skilled engineers who contribute to 
              industry and society globally.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Our Vision</h3>
                <p className="text-gray-700 leading-relaxed">
                  To be a global leader by imparting quality technical education and innovative 
                  research for the betterment of the industry and society.
                </p>
              </div>
              
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Our Mission</h3>
                <ul className="text-gray-700 space-y-2">
                  <li>• Developing technical competencies to enhance employability and entrepreneurship</li>
                  <li>• Promoting research and consultancy activities to meet the need of industries</li>
                  <li>• Inculcating ethical values and leadership qualities for sustainable development</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Academic Programs</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-700">Civil Engineering</span>
                </div>
                <div className="flex items-center space-x-3">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-700">Mechanical Engineering</span>
                </div>
                <div className="flex items-center space-x-3">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-700">Electrical Engineering</span>
                </div>
                <div className="flex items-center space-x-3">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-700">Mining Engineering</span>
                </div>
                <div className="flex items-center space-x-3">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-700">Electronics & Telecommunications</span>
                </div>
                <div className="flex items-center space-x-3">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-700">Computer Science & Engineering</span>
                </div>
                <div className="flex items-center space-x-3">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-700">Information Technology</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Award className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-700">M.Tech in Thermal Engineering</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Alumni Services</h2>
            <p className="text-lg text-gray-600">Stay connected and engaged with your alma mater</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Alumni Directory</h3>
              <p className="text-gray-600">Connect with fellow graduates and build professional networks across industries and locations.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Events & Reunions</h3>
              <p className="text-gray-600">Stay updated on alumni events, annual reunions, and college celebrations.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Career Support</h3>
              <p className="text-gray-600">Access career resources, mentorship programs, and job opportunities through our network.</p>
            </div>
          </div>
        </div>
      </section>

      {/* News & Events */}
      <section id="events" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Latest News & Events</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6">
                <div className="text-sm text-blue-600 mb-2">December 15, 2025</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Annual Alumni Meet 2025</h3>
                <p className="text-gray-600 mb-4">Join us for our annual alumni gathering to reconnect with classmates and celebrate our achievements.</p>
                <a href="#" className="text-blue-600 font-medium hover:text-blue-700 flex items-center">
                  Read More <ExternalLink className="h-4 w-4 ml-1" />
                </a>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6">
                <div className="text-sm text-blue-600 mb-2">November 20, 2025</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Industry Connect Program</h3>
                <p className="text-gray-600 mb-4">Alumni-led mentorship program connecting current students with industry professionals.</p>
                <a href="#" className="text-blue-600 font-medium hover:text-blue-700 flex items-center">
                  Read More <ExternalLink className="h-4 w-4 ml-1" />
                </a>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6">
                <div className="text-sm text-blue-600 mb-2">October 30, 2025</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Diamond Jubilee Celebrations</h3>
                <p className="text-gray-600 mb-4">Celebrating 60+ years of excellence in technical education and alumni achievements.</p>
                <a href="#" className="text-blue-600 font-medium hover:text-blue-700 flex items-center">
                  Read More <ExternalLink className="h-4 w-4 ml-1" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Get in Touch</h2>
            <p className="text-lg text-gray-600">Connect with the Alumni Office for any queries or support</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Address</h3>
                    <p className="text-gray-600">
                      Government Engineering College Bilaspur<br />
                      Bilaspur, Chhattisgarh 495009, India
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Phone className="h-6 w-6 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                    <p className="text-gray-600">+91-7752-XXX-XXX</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Mail className="h-6 w-6 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                    <p className="text-gray-600">alumni@gecbilaspur.ac.in</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="font-semibold text-gray-900 mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <a href="#" className="bg-gray-100 p-3 rounded-full hover:bg-gray-200 transition-colors">
                    <span className="sr-only">Facebook</span>
                    <div className="h-8 w-8 bg-blue-600 rounded flex justify-center items-center"><Facebook/></div>
                  </a>
                  <a href="#" className="bg-gray-100 p-3 rounded-full hover:bg-gray-200 transition-colors">
                    <span className="sr-only">LinkedIn</span>
                    <div className="h-8 w-8 bg-blue-700 rounded flex justify-center items-center"><Linkedin/></div>
                  </a>
                  <a href="#" className="bg-gray-100 p-3 rounded-full hover:bg-gray-200 transition-colors">
                    <span className="sr-only">Twitter</span>
                    <div className="h-8 w-8 bg-blue-400 rounded flex justify-center items-center"><Twitter/></div>
                  </a>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Send us a Message</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input type="text" id="name" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" id="email" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea id="message" rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"></textarea>
                </div>
                <button onClick={() => alert('Message functionality would be implemented with backend integration')} className="w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors font-medium">
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <Image width={100} height={100} src="/CollegeLogo.png" alt="GEC Bilaspur" className="h-10 w-10" />
                <div>
                  <h3 className="text-lg font-semibold">GEC Bilaspur Alumni</h3>
                  <p className="text-gray-400 text-sm">Established 1964</p>
                </div>
              </div>
              <p className="text-gray-400 mb-4">
                Connecting generations of engineers and fostering lifelong relationships 
                within the GEC Bilaspur community.
              </p>
              <p className="text-gray-400 text-sm">
                Affiliated with Chhattisgarh Swami Vivekanand Technical University (CSVTU), Bhilai
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Alumni Directory</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Events</a></li>
                <li><a href="#" className="hover:text-white transition-colors">News</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Career Services</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">College Website</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Academic Calendar</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Library</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Research</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2025 Government Engineering College Bilaspur Alumni Association. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AlumniPortal;