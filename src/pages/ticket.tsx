import { Navbar } from "@/components/navbar";
import { api } from "@/utils/api";
import { useState } from "react";

export default function Ticket() {
  const [ticketNumber, setTicketNumber] = useState(0);
  const [name, setName] = useState("");
  const ticketMutation = api.ticket.giveTicket.useMutation();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("submitting ", ticketNumber);
    console.log("calling api");
    ticketMutation.mutate({ number: ticketNumber, name: name });

    // reset the form
    setTicketNumber(0);
    setName("");
  } // dont make this a form forms are bad, use a button that calls a function

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
        {ticketMutation.isError && (
          <p className="text-center text-2xl">Error</p>
        )}
        {ticketMutation.isLoading && (
          <p className="text-center text-2xl">Loading</p>
        )}

        {ticketMutation.isSuccess && (
          <p className="text-center text-2xl">
            Ticket {ticketMutation.variables?.number} Created
          </p>
        )}
      </div>
    </>
  );
}
