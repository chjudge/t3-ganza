// This is the page that will be rendered when the user visits /checkin
// variable declarations for sessionData and secretMessage

import { useState } from "react";
import {api} from "@/utils/api";

export default function Checkin() {
  const [ticketNumber, setTicketNumber] = useState(-1);
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl">checkin</p>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          id="ticketNumber"
          type="number"
          placeholder="Ticket Number"
          required
          min={0}
          onChange={(e) => setTicketNumber(parseInt(e.target.value))}
          className="block w-full appearance-none rounded-lg border  border-gray-600 bg-gray-700 p-2.5 text-sm text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="rounded-full bg-white/10 px-10 py-3 font-semibold  no-underline transition hover:bg-white/20"
        >
          Check In
        </button>
      </form>
    </div>
  );

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    console.log("submitting ", ticketNumber);
    e.preventDefault();
  }
}
