import React from 'react';
import { FaCheckCircle, FaCamera, FaMoneyBill, FaUsers } from 'react-icons/fa';

const features = [
  { icon: FaCheckCircle, text: "Real-time collaboration" },
  { icon: FaCamera, text: "Remote camera access" },
  { icon: FaMoneyBill, text: "Financial management" },
  { icon: FaUsers, text: "User-friendly interface" },
];

const testimonials = [
  {
    image: 'https://via.placeholder.com/100', 
    name: 'John Doe', 
    text: "Great community and support! Highly recommended!", 
    role: 'President'
  },
  {
    image: 'https://via.placeholder.com/100', 
    name: 'Jane Smith', 
    text: "This app has transformed the way we work together!", 
    role: 'Secretary'
  },
  {
    image: 'https://via.placeholder.com/100', 
    name: 'Michael Brown', 
    text: "User-friendly and very reliable.", 
    role: 'Member'
  },
];

const Main = () => {
  return (
    <>
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4">Key Features</h3>
              <ul className="space-y-4">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center group">
                    <div className="rounded-full h-8 w-8 bg-blue-500 flex items-center justify-center text-white font-bold group-hover:bg-blue-700 transition duration-300">
                      {index + 1}
                    </div>
                    <div className="flex items-center ml-4 space-x-2">
                      <feature.icon className="text-blue-500 group-hover:text-blue-700 transition duration-300" />
                      <span className="ml-2">{feature.text}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4">Testimonials</h3>
              <div className="space-y-4">
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition duration-300 group">
                    <div className="flex items-center mb-4">
                      <img src={testimonial.image} alt={testimonial.name} className="w-16 h-16 rounded-full mr-4" />&nbsp;&nbsp;&nbsp;
                      <div>
                        <p className="font-semibold group-hover:text-blue-700 transition duration-300">{testimonial.name}</p>
                        <p className="text-sm text-gray-500 group-hover:text-blue-700 transition duration-300">{testimonial.role}</p>
                      </div>
                    </div>
                    <p className="mb-4 group-hover:text-blue-700 transition duration-300">"{testimonial.text}"</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Main;
