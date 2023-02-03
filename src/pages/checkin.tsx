import type { NextPage } from "next";
import { useForm, type SubmitHandler } from "react-hook-form";
import { api } from "@/utils/api";
import { useEffect } from "react";

type FormValues = {
  name: string;
  coat_check: string;
};

const Checkin: NextPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { isSubmitSuccessful },
  } = useForm<FormValues>({ shouldUseNativeValidation: true });

  const mutation = api.checkin.checkin.useMutation({
    onSuccess: () => {
      console.log("success");
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const coat_check = data.coat_check === "yes" ? true : false;

    const name = data.name;

    mutation.mutate({ name, coat_check });
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({name: "", coat_check: ""});
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <>
    {!mutation.isSuccess && 
      /* eslint-disable-next-line @typescript-eslint/no-misused-promises*/
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">Full Name</label>
        <input
          id="name"
          type="text"
          autoComplete="off"
          className="block appearance-none rounded-lg border  border-gray-600 bg-gray-700 p-2.5 text-sm text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
          {...register("name", { required: "Please enter your full name" })}
        />
        <label>Do you want to check your coat?</label>

        <label htmlFor="coat_check_yes">Yes</label>
        <input
          type="radio"
          {...register("coat_check", { required: "Select yes or no" })}
          id="coat_check_yes"
          value="yes"
        />
        <label htmlFor="coat_check_no">No</label>
        <input
          type="radio"
          {...register("coat_check", { required: "Select yes or no" })}
          id="coat_check_no"
          value="no"
        />

        <button type="submit">Submit</button>
      </form>
    }

      {mutation.isSuccess && !mutation.data.success && (
        <p className="text-center text-2xl">
          {" "}
          Name already exists, please try again
        </p>
      )}

      {mutation.isSuccess && mutation.data.success && (
        <div>
          <p className="text-center text-2xl">
            {mutation.variables?.name} Checked In
          </p>
          {mutation.data.number && (
            <p className="text-center text-2xl">{`Coat check number: ${mutation.data.number}`}</p>
          )}
          <button type="reset" onClick={ () => mutation.reset()}>Next</button>
        </div>
      )}
    </>
  );
};

export default Checkin;
