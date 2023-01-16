import { Navbar } from "@/components/navbar";
import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <>
    <Navbar />
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)} className="rounded-full bg-white/10 px-10 py-3 font-semibold  no-underline transition hover:bg-white/20" >Increment</button>
    </div>
    </>
  );
}
