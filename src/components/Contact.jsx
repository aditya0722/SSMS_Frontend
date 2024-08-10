import React from 'react';
import NavBar from './NavBar';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Contact = () => {
  return (
    <>
      <NavBar />
      <div className="relative bg-blue-50 overflow-hidden">
        {/* Decorative shapes */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-300 rounded-full opacity-50 transform translate-x-[-50%] translate-y-[-50%]"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-500 rounded-full opacity-50 transform translate-x-[50%] translate-y-[50%]"></div>

        <section className="container mx-auto py-16 px-6 lg:px-16 relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-blue-800 mb-4">सम्पर्क गर्नुहोस्</h1>
            <p className="text-lg text-blue-600">
              हामी तपाईंसँग सुन्न चाहन्छौं! कुनै प्रश्न, टिप्पणी, वा प्रतिकृयाको लागि हामीलाई सम्पर्क गर्नुहोस्।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold text-blue-800 mb-4">हामीलाई सन्देश पठाउनुहोस्</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-blue-800 mb-2" htmlFor="name">"नाम"</label>
                  <input type="text" id="name" className="w-full p-2 border border-blue-300 rounded" />
                </div>
                <div>
                  <label className="block text-blue-800 mb-2" htmlFor="email">इमेल</label>
                  <input type="email" id="email" className="w-full p-2 border border-blue-300 rounded" />
                </div>
                <div>
                  <label className="block text-blue-800 mb-2" htmlFor="message">सन्देश</label>
                  <textarea id="message" rows="4" className="w-full p-2 border border-blue-300 rounded"></textarea>
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">पठाउनुहोस्</button>
              </form>
            </div>

            {/* Contact Details */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold text-blue-800 mb-4">हाम्रो सम्पर्क जानकारी</h2>
              <p className="text-blue-600 mb-4">हामीलाई सम्पर्क गर्न निम्न विधिहरू प्रयोग गर्न सक्नुहुन्छ:</p>
              <p className="text-blue-800 font-semibold">ठेगाना:</p>
              <p className="text-blue-600 mb-4">सवाली गाँउ, सोरेङ जिल्ला, सिक्किम, भारत</p>
              <p className="text-blue-800 font-semibold">इमेल:</p>
              <p className="text-blue-600 mb-4">info@example.com</p>
              <p className="text-blue-800 font-semibold">फोन:</p>
              <p className="text-blue-600 mb-4">(123) 456-7890</p>
              <p className="text-blue-800 font-semibold">सामाजिक संजाल:</p>
              <div className="flex space-x-4">
                <a href="#" className="text-blue-500 hover:text-blue-700 transition duration-300">
                  <FaFacebook size={24} />
                </a>
                <a href="#" className="text-blue-500 hover:text-blue-700 transition duration-300">
                  <FaTwitter size={24} />
                </a>
                <a href="#" className="text-blue-500 hover:text-blue-700 transition duration-300">
                  <FaInstagram size={24} />
                </a>
                <a href="#" className="text-blue-500 hover:text-blue-700 transition duration-300">
                  <FaLinkedin size={24} />
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Contact;
