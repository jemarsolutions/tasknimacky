import { auth } from "@/lib/auth";
import { signInAction } from "@/server/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const SignIn = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (session) redirect("/");
  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen">
      <div className="absolute w-50 h-30 border-t-2 border-r-2 border-black top-5 right-5 animate-caret-blink"></div>
      <div className="absolute w-50 h-30 border-b-2 border-r-2 border-black bottom-5 right-5 animate-caret-blink"></div>
      <div className="absolute w-50 h-30 border-b-2 border-l-2 border-black bottom-5 left-5 animate-caret-blink"></div>
      <div className="absolute w-50 h-30 border-t-2 border-l-2 border-black top-5 left-5 animate-caret-blink"></div>
      <div className="w-full max-w-xs">
        <a href="/" className="text-black text-xl">
          <span className="font-bold">T</span>ask{" "}
          <span className="font-bold">N</span>i{" "}
          <span className="font-bold">M</span>acky
        </a>
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 my-4"
          action={signInAction}
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              name="password"
              type="password"
              placeholder="******************"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="py-2 px-5 border border-black shadow-md rounded text-sm hover:bg-black hover:text-white transition-all cursor-pointer"
              type="submit"
            >
              Sign In
            </button>
            <a
              className="inline-block align-baseline font-bold text-sm text-black hover:text-gray-700"
              href="/signup"
            >
              Create account
            </a>
          </div>
        </form>
        <p className="text-center text-gray-500 text-xs">
          &copy;2025 <span className="font-bold">T</span>ask{" "}
          <span className="font-bold">N</span>i{" "}
          <span className="font-bold">M</span>acky. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default SignIn;
