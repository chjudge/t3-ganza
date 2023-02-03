import { Navbar } from "@/components/navbar";
import { type NextPage } from "next";
import { useForm, type SubmitHandler } from "react-hook-form";
import { api } from "@/utils/api";
import { type FC, useState, useEffect } from "react";

type FormValues = {
  number: string;
  name: string;
};

const CoatCheck: NextPage = () => {
  const [name, setName] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful },
  } = useForm<FormValues>({
    shouldUseNativeValidation: true,
  });

  const mutation = api.checkin.checkout.useMutation({
    onSuccess: () => {
      console.log("success");
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    if (data.name) {
      console.log(data.name);
      setName(data.name);
    } else if (data.number && data.number !== "0") {
      mutation.mutate({ number: Number(data.number) });
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);


  return (
    <>
      <Navbar />
      <div className="py-15 flex h-full flex-col items-center justify-center gap-4">
        <h1 className="pt-6 text-3xl">Coat Check</h1>
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises*/}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="text-center">
            <label htmlFor="number">Coat Check Number</label>
          </div>

          <div className="p-2">
            <input
              id="number"
              type="number"
              autoComplete="off"
              className="block appearance-none rounded-lg border  border-gray-600 bg-gray-700 p-2 text-sm text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
              {...register("number", { required: false })}
            />
          </div>
          <div className="p-2">
            <label htmlFor="name">Search Name</label>
            <input
              id="name"
              type="text"
              autoComplete="off"
              className="block appearance-none rounded-lg border  border-gray-600 bg-gray-700 p-2 text-sm text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
              {...register("name", { required: false })}
            />
          </div>

          <div className="p-6">
            <button type="submit" className="btn">
              Submit
            </button>
          </div>
        </form>

        {mutation.isSuccess && !mutation.data.success && (
          <p className="text-center text-2xl">Number not found</p>
        )}

        {mutation.isSuccess && mutation.data.success && (
          <div>
            <p className="text-center text-2xl">{mutation.data.name && `${mutation.data.name} `}Checked Out</p>
            {mutation.data.win && mutation.data.name && (
              <p>{`${mutation.data.name} won a prize!`}</p>
            )}
          </div>
        )}

        {name && name !== "" && <Results name={name} />}
      </div>
    </>
  );
};

export default CoatCheck;

interface ResultsProps {
  name: string;
}

export const Results: FC<ResultsProps> = (props) => {
  const query = api.checkin.searchNames.useQuery({ name: props.name });

  return (
    <>
      <div className="flex h-full flex-col items-center justify-center gap-4">
        <h1 className="pt-6 text-3xl">Results</h1>
        {query.isSuccess && query.data && query.data.people && (
          <div className="flex flex-col gap-4">
            <ul className="list-inside list-disc">
              {query.data.people.length === 0 && (
                <li>No results found</li>
              )}
              {query.data.people.map((person) => (
                <li key={person.coat_check_number}>
                  {person.name} - {person.coat_check_number}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};
