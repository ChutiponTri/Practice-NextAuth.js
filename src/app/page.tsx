"use client";

import Navbar from "@/components/Navbar";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  return (
    <main>
      <Navbar session={session} />
      <div className="container mx-auto">
        <h3 className="my-3">Welcome to Home Page</h3>
        <hr className="my-3" />
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis distinctio eaque quidem impedit non explicabo placeat blanditiis iste excepturi. Ipsum nesciunt deleniti recusandae, saepe rerum sit facere minus corrupti numquam?</p>
      </div>
    </main>
  );
}

