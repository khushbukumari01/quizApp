"use client";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: userName,
          password,
        }),
      });
      const data = await res.json();
      console.log(data)
      console.log(data.status);
      if(data.status===200)
      {
        alert("Logged In")
      }
      else{
        alert("wrong username or password")
      }
      alert("username and password entered by you is: " + userName + ":" + password);
    }
    catch(e){
     
    }
   
  };

  const handleUsername = (e) => {
    setUserName(e.target.value);
    console.log(userName);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    console.log(password);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              value={userName}
              onChange={handleUsername}
              placeholder="Enter your username"
            />
          </div>
          <div>
            <input
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="password"
              value={password}
              onChange={handlePassword}
              placeholder="Enter your password"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
