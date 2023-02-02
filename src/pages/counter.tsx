import { Navbar } from "@/components/navbar";
import { api } from "@/utils/api";

export default function Counter() {
  const mutation = api.checkin.counter.useMutation({
    onSuccess: () => {
      console.log("success");
    },
  });
  const query = api.checkin.getCounter.useQuery();

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
      <div>
        {query.isSuccess && query.data.count && (
          <p>{`Count: ${query.data.count.count}`}</p>
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
