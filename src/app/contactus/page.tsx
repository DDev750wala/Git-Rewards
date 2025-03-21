import React from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaInstagram } from "react-icons/fa";

const teamMembers = [
  { name: "Krish", phone: "+123 456 7890", instagram: "https://instagram.com/krish" },
  { name: "Divij", phone: "+987 654 3210", instagram: "https://instagram.com/divij" },
  { name: "Dev", phone: "+456 789 1230", instagram: "https://instagram.com/dev" },
  { name: "Mann", phone: "+321 654 9870", instagram: "https://instagram.com/mann" },
];

const ContactUs = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r  text-white p-6">
      <div className="bg-black p-8 rounded-2xl shadow-2xl max-w-4xl w-full transform transition duration-500 hover:scale-105 hover:shadow-3xl">
        <h2 className="text-4xl font-extrabold text-center text-white mb-8 uppercase tracking-wider animate-pulse">DeBuggers</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {teamMembers.map((member, index) => (
            <div 
              key={index} 
              className="bg-gray-900 p-6 rounded-xl shadow-lg flex flex-col items-center text-center transform transition duration-500 hover:scale-110 hover:shadow-2xl hover:bg-gray-600 border border-gray-600 hover:border-blue-400 animate-fadeIn"
            >
              <h3 className="text-3xl font-bold text-gray-200 mb-3">{member.name}</h3>
              <p className="flex items-center space-x-2 text-blue-400 text-lg font-medium">
                <FaPhone className="animate-bounce" /> <span>{member.phone}</span>
              </p>
              <a 
                href={member.instagram} 
                className="flex items-center space-x-2 text-blue-400 text-xl font-semibold hover:text-blue-500 mt-3 transition duration-300 ease-in-out transform hover:scale-105"
              >
                <FaInstagram className="animate-spin-slow" /> <span>Instagram</span>
              </a>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 space-y-4">
          <div className="flex items-center justify-center space-x-3 text-xl font-medium">
            <FaMapMarkerAlt className="text-blue-400 animate-bounce" />
            <p className="tracking-wider">123 Street, City, Country</p>
          </div>
          <div className="flex items-center justify-center space-x-3 text-xl font-medium animate-fadeIn">
            <FaEnvelope className="text-blue-400 animate-pulse" />
            <p className="tracking-wide">contact@ourteam.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
