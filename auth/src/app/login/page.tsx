"use client"

import { useActionState } from "react";
import { handleLogin } from "../_lib/actions";




const Login = () => {

    const [state, formAction] = useActionState(handleLogin, {message:""})


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white">
      <div className="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Log In</h1>

        <form className="space-y-4" action={formAction}>
          {state.message && <p className="bg-red-500 my-2 p-3">{state.message}</p>}
          <div>
            <label htmlFor="login" className="block text-sm font-medium mb-1">Login</label>
            <input
              type="text"
              name="login"
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Enter your login"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-lg hover:from-pink-600 hover:to-purple-600 focus:outline-none focus:ring-4 focus:ring-pink-300"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};
export default Login

