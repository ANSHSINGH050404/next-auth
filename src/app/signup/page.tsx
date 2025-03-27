'use client'
import React,{useState} from 'react'

function Signup  () {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    const sumbithandler = async (e: any) => {
      e.preventDefault();
  
      try {
        const response = await fetch(
          "http://localhost:3000/api/users/signup",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              username: username,
              email,
              password,
            }),
          }
        );
        const data = await response.json();
        console.log(data);
        
      } catch (error) {
        console.error("Error signing up:", error);
        alert("Error signing up");
      }
    };
  return (
    <>
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
          <form onSubmit={sumbithandler}>
            <div className="mb-4">
              <label className="block text-black">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-black">Email Address</label>
              <input
                type="text"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <div className="mb-4"></div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Sign Up
            </button>
          </form>
          <div className="flex justify-center items-center mt-6">
            <button className="bg-red-500 text-white px-4 py-2 rounded mr-2">
              Sign in with Google
            </button>
            <button className="bg-blue-700 text-white px-4 py-2 rounded">
              Sign in with Facebook
            </button>
          </div>
          <div className="mt-4 text-center">
            <a href="/signin" className="text-blue-500">
              Already have an account? Sign In
            </a>
          </div>
        </div>
      </div>
    </>

  )
}

export default Signup