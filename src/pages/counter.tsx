import { Navbar } from "@/components/navbar";
import { api } from "@/utils/api";
import { useEffect } from "react";

export default function Counter() {
  const mutation = api.checkin.counter.useMutation({
    onSuccess: () => {
      console.log("success");
    },
  });
  const query = api.checkin.getCounter.useQuery();

  useEffect(() => {
    const timer = setInterval(() => {
      query.refetch().catch((err) => {
        console.log(err);
      });
    }, 2000);

    return () => clearInterval(timer);
  }, [query]);

  function onSubmit(increment: boolean) {
    mutation
      .mutateAsync({ increment: increment })
      .then(() => {
        query.refetch().catch((err) => {
          console.log(err);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <Navbar />
      <div className="flex h-full flex-col items-center justify-center gap-4">
        {query.isSuccess && query.data.count && (
          <p>{`Count: ${query.data.count}`}</p>
        )}
        <button
          onClick={() => onSubmit(true)}
          className="rounded-full bg-white/10 px-10 py-3 font-semibold  no-underline transition hover:bg-white/20"
        >
          +
        </button>
        <button
          onClick={() => onSubmit(false)}
          className="rounded-full bg-white/10 px-10 py-3 font-semibold  no-underline transition hover:bg-white/20"
        >
          -
        </button>
      </div>
    </>
  );
}
