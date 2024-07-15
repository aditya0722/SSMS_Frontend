import React from 'react'
import NavBar from './NavBar'
const  Members= () => {
    const members = [
        { id: 1, name: "John Doe", position: "President", image: "path/to/image1.jpg" },
        { id: 2, name: "Jane Smith", position: "Secretary", image: "path/to/image2.jpg" },
        { id: 3, name: "Sam Wilson", position: "Member", image: "path/to/image3.jpg" },
        { id: 4, name: "Sara Lee", position: "Member", image: "path/to/image4.jpg" },
        { id: 5, name: "Mike Brown", position: "Treasurer", image: "path/to/image5.jpg" },
        // Add more members as needed
      ];
  return (
    <>
    <NavBar/>
    <div className="relative bg-blue-50 overflow-hidden">
      {/* Decorative shapes */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-300 rounded-full opacity-50 transform translate-x-[-50%] translate-y-[-50%]"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-500 rounded-full opacity-50 transform translate-x-[50%] translate-y-[50%]"></div>

      <section className="container mx-auto py-16 px-6 lg:px-16 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-800 mb-4">Our Members</h1>
          <p className="text-lg text-blue-600">
            Meet the dedicated members of our community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {members.map((member) => (
            <div key={member.id} className="bg-white p-6 rounded-lg shadow-lg">
              <img src={member.image} alt={member.name} className="w-full h-48 object-cover rounded-lg mb-4" />
              <h2 className="text-2xl font-semibold text-blue-800 mb-2">{member.name}</h2>
              <p className="text-blue-600">{member.position}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
    </>
  )
}

export default Members