import React from 'react'

const Login = () => {
  return (
    <>

    <div className="relative bg-blue-50 overflow-hidden min-h-screen flex items-center justify-center">
      {/* Decorative shapes */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-300 rounded-full opacity-50 transform translate-x-[-50%] translate-y-[-50%]"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-500 rounded-full opacity-50 transform translate-x-[50%] translate-y-[50%]"></div>

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold text-blue-800 mb-6 text-center">Login</h1>
          <form className="space-y-6">
            <div>
              <label className="block text-blue-800 mb-2" htmlFor="email">Phone Number</label>
              <input type="number" id="email" className="w-full p-2 border border-blue-300 rounded" />
            </div>
            <div>
              <label className="block text-blue-800 mb-2" htmlFor="password">Password</label>
              <input type="password" id="password" className="w-full p-2 border border-blue-300 rounded" />
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300">Login</button>
          </form>
          <p className="text-blue-600 mt-4 text-center">
            Forgot your Password? <a href="/ForgotPassword" className="text-blue-800 hover:underline">Click me</a>
          </p>
        </div>
      </div>
    </div>
    </>
  )
}

export default Login