import React from "react";
import NavBar from './NavBar'
export default function About() {
  return (
    <>
    <NavBar/>
    <div className="relative bg-blue-50 overflow-hidden">
      {/* Decorative shapes */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-300 rounded-full opacity-50 transform translate-x-[-50%] translate-y-[-50%]"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-500 rounded-full opacity-50 transform translate-x-[50%] translate-y-[50%]"></div>

      <section className="container mx-auto py-16 px-6 lg:px-16 relative z-10">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-blue-800 mb-4">About Us</h1>
          <p className="text-lg text-blue-600 mb-8">
            Welcome to our community! We are dedicated to bringing people together and fostering a supportive environment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Our Mission */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-blue-800 mb-4">Our Mission</h2>
            <p className="text-blue-600">
              Our mission is to create a welcoming space where members can share ideas, support each other, and grow together. We believe in the power of community and strive to make a positive impact on everyone involved.
            </p>
          </div>

          {/* Our Vision */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-blue-800 mb-4">Our Vision</h2>
            <p className="text-blue-600">
              Our vision is to become a beacon of unity and support, inspiring others to join us in our journey towards a better, more connected world. We aim to empower individuals through collaboration and shared experiences.
            </p>
          </div>

          {/* Our Values */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-blue-800 mb-4">Our Values</h2>
            <p className="text-blue-600">
              We value inclusivity, respect, and empathy. Our community thrives on the diverse perspectives and unique contributions of each member. We are committed to maintaining a safe and positive environment for everyone.
            </p>
          </div>

          {/* Our Team */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-blue-800 mb-4">Our Team</h2>
            <p className="text-blue-600">
              Our team consists of passionate individuals dedicated to supporting our community. From organizing events to providing resources, we are here to help our members succeed and feel valued.
            </p>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
