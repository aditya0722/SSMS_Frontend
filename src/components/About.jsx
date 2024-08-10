import React from "react";
import { People, Group, Visibility, VerifiedUser } from "@mui/icons-material";
import NavBar from './NavBar';

export default function About() {
  return (
    <>
      <NavBar />
      <div className="relative bg-blue-50 overflow-hidden">
        {/* Decorative shapes */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-300 rounded-full opacity-50 transform translate-x-[-50%] translate-y-[-50%]"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-500 rounded-full opacity-50 transform translate-x-[50%] translate-y-[50%]"></div>

        <section className="container mx-auto py-16 px-6 lg:px-16 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-blue-800 mb-4">हाम्रो बारेमा </h1>
            <p className="text-lg text-blue-600 mb-8">
              हाम्रो समुदायमा स्वागत छ! हामी मानिसहरूलाई एकसाथ ल्याउने र सहयोगात्मक वातावरणलाई प्रोत्साहन गर्ने उद्देश्यले समर्पित छौं। 
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Our Mission */}
            <div className="bg-white p-6 rounded-lg shadow-lg flex items-start">
              <Group className="text-blue-800 mr-4" />
              <div>
                <h2 className="text-2xl font-semibold text-blue-800 mb-4">हाम्रो लक्ष्य </h2>
                <p className="text-blue-600">
                  हाम्रो लक्ष्य सदस्यहरूलाई विचारहरू साझा गर्न, एकअर्कालाई समर्थन गर्न, र सँगै बढ्न सक्ने स्वागतयोग्य ठाउँ सिर्जना गर्नु हो।
                </p>
              </div>
            </div>

            {/* Our Vision */}
            <div className="bg-white p-6 rounded-lg shadow-lg flex items-start">
              <Visibility className="text-blue-800 mr-4" />
              <div>
                <h2 className="text-2xl font-semibold text-blue-800 mb-4">हाम्रो दृष्टिकोण </h2>
                <p className="text-blue-600">
                  हाम्रो दृष्टिकोण एकता र समर्थनको प्रतीक बन्ने हो, अरूलाई हाम्रो यात्रा तर्फ प्रेरित गर्दै।
                </p>
              </div>
            </div>

            {/* Our Values */}
            <div className="bg-white p-6 rounded-lg shadow-lg flex items-start">
              <VerifiedUser className="text-blue-800 mr-4" />
              <div>
                <h2 className="text-2xl font-semibold text-blue-800 mb-4">हाम्रा मूल्यहरू </h2>
                <p className="text-blue-600">
                  हामी समावेशिता, सम्मान, र सहानुभूतिको मूल्य राख्छौं। 
                </p>
              </div>
            </div>

            {/* Our Team */}
            <div className="bg-white p-6 rounded-lg shadow-lg flex items-start">
              <People className="text-blue-800 mr-4" />
              <div>
                <h2 className="text-2xl font-semibold text-blue-800 mb-4">हाम्रो टोली </h2>
                <p className="text-blue-600">
                  हाम्रो टोलीमा हाम्रो समुदायलाई समर्थन गर्न समर्पित जोशिलो व्यक्तिहरू छन्।
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
