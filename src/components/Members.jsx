import React from 'react'
import NavBar from './NavBar'
import {useState,useEffect} from "react"
import axios from 'axios'
const  Members= () => {
  
  const [users, setUsers] = useState([]);
      useEffect(() => {
        axios.get("http://localhost:3000/api/login/members")
          .then((res) => {
            setUsers(res.data);
          })
          .catch((error) => {
            console.error(error);
          })
          .finally(() => {
            setLoading(false);
          });
      }, []);
  return (
    <>
    <NavBar/>
    <div className="relative bg-blue-50 overflow-hidden">
      {/* Decorative shapes */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-300 rounded-full opacity-50 transform translate-x-[-50%] translate-y-[-50%]"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-500 rounded-full opacity-50 transform translate-x-[50%] translate-y-[50%]"></div>

      <section className="container mx-auto py-16 px-6 lg:px-16 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-800 mb-4">हाम्रो सदस्यहरू</h1>
          <p className="text-lg text-blue-600">
          हाम्रो समुदायका समर्पित सदस्यहरूलाई भेट्नुहोस्।
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {users.map((member) => (
            <div key={member.id} className="bg-white p-6 rounded-lg shadow-lg">
              {(member.imageUrl)?(<img src={member.imageUrl} alt={member.name} className="w-full h-48 object-cover rounded-lg mb-4" />):(
                <img src="https://i.pinimg.com/736x/43/6c/ac/436cac73f5fff533999f31147c3538b7.jpg" style={{borderRadius:"50%"}} alt="User" />
              )
}
              <h2 className="text-2xl font-semibold text-blue-800 mb-2">{member.name}</h2>
              <p className="text-blue-600">{member.role}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
    </>
  )
}

export default Members