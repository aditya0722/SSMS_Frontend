import React from 'react'

const HeroSection = () => {
  return (
    <>
    <section className="py-16 bg-blue-900 text-white">
        <div className="container mx-auto px-6">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-4xl font-semibold mb-4">Welcome to Our Community WebApp</h2>
              <p className="text-lg">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec ex eget metus posuere tempor sed eget elit.</p>
              <button className="mt-4 bg-white text-blue-900 px-6 py-3 rounded-md shadow-lg font-semibold hover:bg-gray-200 transition duration-300">Join Us Today</button>
            </div>
            <div className="md:w-1/2">
              <img src="/hero-image.jpg" alt="Hero Image" className="rounded-lg shadow-xl" />
            </div>
          </div>
        </div>
      </section>
      </>
  )
}

export default HeroSection