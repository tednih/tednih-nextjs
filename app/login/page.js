"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function LoginPage() {
  const [user, setUser] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const res = await signIn("credentials", {
      redirect: false,
      username: user.username,
      password: user.password,
    });

    if (!res.ok) {
      setError(res.error);
    } else {
      router.push(callbackUrl);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-primary dark:bg-darkprimary p-8 rounded shadow-md w-full max-w-sm"
      >
        <h1 className="text-xl text-text dark:text-darktext font-bold mb-4 text-center">
          Login
        </h1>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <label>Username</label>
        <input
          type="text"
          placeholder="tednih"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          className="w-full p-2 mb-4 rounded 
             border-2 border-gray-400 dark:border-gray-600 
             focus:border-button focus:ring-2 focus:ring-button dark:focus:ring-darkbutton 
             focus:outline-none"
          required
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          className="w-full p-2 mb-4 rounded 
             border-2 border-gray-400 dark:border-gray-600 
             focus:border-button focus:ring-2 focus:ring-button dark:focus:ring-darkbutton 
             focus:outline-none"
          required
        />

        <button
          type="submit"
          className="w-full bg-button dark:bg-darkbutton dark:text-darktext py-2 rounded hover:bg-button/60 hover:dark:bg-darkbutton/60"
        >
          Login
        </button>
      </form>
    </div>
  );
}
