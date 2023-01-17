import { Navbar } from "@/components/navbar";
import { api } from "@/utils/api";
import { useState } from "react";

export default function Ticket() {
  const [ticketNumber, setTicketNumber] = useState(-1);
  const [name, setName] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("submitting ", ticketNumber);
    console.log("calling api");
    const result = api.ticket.giveTicket.useQuery({
      number: ticketNumber,
      name: name,
    });
    console.log("result", result.data?.ok);
  }

  return (
    <>
      <Navbar />
      <div className="flex h-screen w-screen flex-col items-center justify-center gap-4">
        <p className="text-center text-2xl">Ticket Booth</p>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            id="ticketNumber"
            type="number"
            placeholder="Ticket Number"
            required
            min={0}
            onChange={(e) => setTicketNumber(parseInt(e.target.value))}
            className="input"
          />
          <input
            id="name"
            type="text"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            className="input"
          />
          <button type="submit" className="btn">
            Give Ticket
          </button>
        </form>
      </div>
    </>
  );
}
