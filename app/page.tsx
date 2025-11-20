import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";

const Home = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full relative">
      <div className="absolute w-50 h-30 border-t-2 border-r-2 border-black top-5 right-5 animate-caret-blink"></div>
      <div className="absolute w-50 h-30 border-b-2 border-r-2 border-black bottom-5 right-5 animate-caret-blink"></div>
      <div className="absolute w-50 h-30 border-b-2 border-l-2 border-black bottom-5 left-5 animate-caret-blink"></div>
      <div className="absolute w-50 h-30 border-t-2 border-l-2 border-black top-5 left-5 animate-caret-blink"></div>
      <div className="w-5xl flex flex-col items-center gap-5">
        <h1 className="font-extralight text-5xl">
          <span className="font-bold">T</span>ask{" "}
          <span className="font-bold">N</span>i{" "}
          <span className="font-bold">M</span>acky
        </h1>
        <p className="text-center">
          <span className="font-bold">Task Ni Macky</span> is my personal task
          management app designed to help me stay organized, focused, and
          productive. It’s where I list all my projects, daily tasks, deadlines,
          and anything important I need to remember. Everything is arranged in a
          simple and clear way so I can easily track what I need to do and what
          I’ve already finished. This app is built to help me manage my time
          better and stay consistent with my goals.
        </p>
        <div className="flex gap-5 mt-5">
          {!session && (
            <>
              <Link
                href="/signin"
                className="py-2 px-5 border border-black shadow-md rounded text-sm hover:bg-black hover:text-white transition-all"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="py-2 px-5 border border-black shadow-md rounded text-sm bg-black hover:bg-white hover:text-black text-white transition-all"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
