"use client";

import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

function page() {
  const router = useRouter();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPass] = React.useState("");
  const [confirmPass, setConfirmPass] = React.useState("");
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState(false);
  const { data: session } = useSession();
  if (session) {
    router.replace("/welcome");
  }

  React.useEffect(() => {
    if (success) {
      setSuccess(false);
    }
  }, [name, email, password, confirmPass, error]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(name, email, password, confirmPass)

    if (!name || !email || !password || !confirmPass) {
      setError("Please complete all inputs");
      return;
    }

    if (password != confirmPass) {
      setError("Password do not match");
      return;
    }

    try {
      const userCheck = await fetch("api/checkuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email })
      });

      const { user } = await userCheck.json();
      if (user) {
        setError("User already exists");
        return;
      }
    } catch (error) {
      console.log("Error during fetching:", error);
      return;
    }

    try {
      const resp = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, password })
      })

      if (resp.ok) {
        console.log(resp)
        const form = e.target;
        setError("");
        form.reset();
        setSuccess(true);
      } else {
        console.log("Registration failed");
      }

    } catch (error) {
      console.log("Error during req:", error);
    }
  }
  return (
    <div>
      <Navbar />
      <div className="container mx-auto py-5">
        <h3>Register Page</h3>
        <hr className="my-3" />
        <form onSubmit={handleSubmit}>
          <input onChange={(e) => setName(e.target.value)}
            className="block bg-gray-400 p-2 my-2 rounded-md text-black placeholder:text-white"
            type="text"
            placeholder="Enter your name"
          />
          <input onChange={(e) => setEmail(e.target.value)}
            className="block bg-gray-400 p-2 my-2 rounded-md text-black placeholder:text-white"
            type="email"
            placeholder="Enter your email"
          />
          <input onChange={(e) => setPass(e.target.value)}
            className="block bg-gray-400 p-2 my-2 rounded-md text-black placeholder:text-white"
            type="password"
            placeholder="Enter your password"
          />
          <input onChange={(e) => setConfirmPass(e.target.value)}
            className="block bg-gray-400 p-2 my-2 rounded-md text-black placeholder:text-white"
            type="password"
            placeholder="Confirm your password"
          />
          <Button className="bg-green-400" type="submit">Signup</Button>

          {error && (
            <div className="bg-red-500 w-fit text-sm text-white py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-500 w-fit text-sm text-white py-1 px-3 rounded-md mt-2">
              Register Successfully
            </div>
          )}
        </form>
        <hr className="my-3" />
        <p>Already have an account? go to <Link href={"/login"} className="text-blue-500 hover:underline">Login</Link></p>
      </div>
    </div>
  )
}

export default page