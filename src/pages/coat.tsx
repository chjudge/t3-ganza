import { Navbar } from "@/components/navbar";
import { type NextPage } from "next";
import { useForm, type SubmitHandler } from "react-hook-form";
import { api } from "@/utils/api";

type FormValues = {
  number: string;
};

const CoatCheck: NextPage = () => {
  const { register, handleSubmit } = useForm<FormValues>({
    shouldUseNativeValidation: true,
  });

  const mutation = api.checkin.checkout.useMutation({
    onSuccess: () => {
      console.log("success");
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    mutation.mutate({ number: Number(data.number) });
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center gap-4 h-full py-15">
        <h1 className="">Coat Check</h1>
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises*/}
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="number">Coat Check Number</label>
          <input
            id="number"
            type="number"
            autoComplete="off"
            className="block appearance-none rounded-lg border  border-gray-600 bg-gray-700 p-2.5 text-sm text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
            {...register("number", { required: true })}
          />

          <button type="submit" className="btn">
            Submit
          </button>
        </form>

        {mutation.isSuccess && !mutation.data.success && (
          <p className="text-center text-2xl">Number not found</p>
        )}

        {mutation.isSuccess && mutation.data.success && (
          <div>
            <p className="text-center text-2xl">Checked Out</p>
          </div>
        )}
      </div>
    </>
  );
};

export default CoatCheck;
