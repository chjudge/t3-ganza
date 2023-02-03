import { Navbar } from "@/components/navbar";
import { api } from "@/utils/api";

export default function Prizes() {
  const query = api.checkin.getPrize.useQuery();

  function onSubmit() {
    query.refetch().catch((err) => {
      console.log(err);
    });
  }

  return (
    <>
      <Navbar />
      <div className="flex h-full flex-col items-center justify-center gap-4">
        <p>{query.data?.name}</p>
        {query.isSuccess && query.data.name && (
          <p>{`Winner: ${query.data.name}`}</p>
        )}
        <button
          onClick={() => onSubmit()}
          className="rounded-full bg-white/10 px-10 py-3 font-semibold  no-underline transition hover:bg-white/20"
        >
          Choose a winner
        </button>
      </div>
    </>
  );
}
