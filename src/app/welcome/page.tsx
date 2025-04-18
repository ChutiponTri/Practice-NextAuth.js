"use client";

import Navbar from "@/components/Navbar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react"

function page() {
  const router = useRouter();
  const { data: session } = useSession();
  if (!session) {
    router.replace("/login");
  }

  return (
    <div>
      <Navbar session={session} />
      <div className="container mx-auto">
        <h3 className="text-3xl my-3">Welcome {session?.user?.name}</h3>
        <p>Email: {session?.user?.email}</p>
        <hr className="my-3"></hr>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam odio, culpa saepe quo dolor dolore. Maxime, maiores perspiciatis illo voluptatibus sequi at vel aliquam, asperiores ullam, est sed debitis explicabo.</p>
      </div>
    </div>
  )
}

export default page