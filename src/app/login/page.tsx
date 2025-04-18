"use client";

import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

function page() {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const { data: session } = useSession();

  if (session) {
    router.replace("/welcome");
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const resp = await signIn("credentials", {
        email, password, redirect: false
      })
      console.log(resp)

      if (resp?.error) {
        setError("Incorrect Email or Password");
        return;
      }

      router.replace("/welcome");

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Navbar />
      <div className="container mx-auto py-5">
        <h3>Login Page</h3>
        <hr className="my-3" />
        <form onSubmit={handleSubmit}>
          <input
            className="block bg-gray-400 p-2 my-2 rounded-md text-black placeholder:text-white"
            type="email"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="block bg-gray-400 p-2 my-2 rounded-md text-black placeholder:text-white"
            type="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button className="bg-green-400" type="submit">Signin</Button>
        </form>
        {error && (
          <div className="bg-red-500 w-fit text-sm text-white py-1 px-3 rounded-md mt-2">
            {error}
          </div>
        )}
        <hr className="my-3" />
        <p>Don't have an account? go to <Link href={"/register"} className="text-blue-500 hover:underline">Register</Link></p>
      </div>
    </div>
  )
}

export default page