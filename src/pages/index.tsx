// index page with navbar

import { Navbar } from "@/components/navbar";

export default function Index() {
  return (
    <>
      <Navbar />
      <div className="flex h-screen w-screen flex-col items-center justify-center gap-4">
        <p className="text-center text-2xl">
          Ganza App yay
        </p>
      </div>
    </>
  );
}
