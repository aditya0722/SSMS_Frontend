import React from 'react'
import NavBar from './NavBar'
const Contact = () => {
  return (
    <>
    <NavBar/>
    <div className="relative bg-blue-50 overflow-hidden">
      {/* Decorative shapes */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-300 rounded-full opacity-50 transform translate-x-[-50%] translate-y-[-50%]"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-500 rounded-full opacity-50 transform translate-x-[50%] translate-y-[50%]"></div>

      <section className="container mx-auto py-16 px-6 lg:px-16 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-800 mb-4">Contact Us</h1>
          <p className="text-lg text-blue-600">
            We'd love to hear from you! Reach out to us with any questions, comments, or feedback.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-blue-800 mb-4">Send Us a Message</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-blue-800 mb-2" htmlFor="name">Name</label>
                <input type="text" id="name" className="w-full p-2 border border-blue-300 rounded" />
              </div>
              <div>
                <label className="block text-blue-800 mb-2" htmlFor="email">Email</label>
                <input type="email" id="email" className="w-full p-2 border border-blue-300 rounded" />
              </div>
              <div>
                <label className="block text-blue-800 mb-2" htmlFor="message">Message</label>
                <textarea id="message" rows="4" className="w-full p-2 border border-blue-300 rounded"></textarea>
              </div>
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">Send</button>
            </form>
          </div>

          {/* Contact Details */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-blue-800 mb-4">Our Contact Information</h2>
            <p className="text-blue-600 mb-4">Feel free to get in touch with us through any of the following methods:</p>
            <p className="text-blue-800 font-semibold">Address:</p>
            <p className="text-blue-600 mb-4">123 Main Street, City, State 12345</p>
            <p className="text-blue-800 font-semibold">Email:</p>
            <p className="text-blue-600 mb-4">info@example.com</p>
            <p className="text-blue-800 font-semibold">Phone:</p>
            <p className="text-blue-600 mb-4">(123) 456-7890</p>
            <p className="text-blue-800 font-semibold">Social Media:</p>
            <div className="flex space-x-4">
              <a href="#" className="text-blue-500 hover:text-blue-700 transition duration-300">Facebook</a>
              <a href="#" className="text-blue-500 hover:text-blue-700 transition duration-300">Twitter</a>
              <a href="#" className="text-blue-500 hover:text-blue-700 transition duration-300">Instagram</a>
              <a href="#" className="text-blue-500 hover:text-blue-700 transition duration-300">LinkedIn</a>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  )
}

export default Contact