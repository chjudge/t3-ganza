import type { NextPage } from "next";
import { useForm, type SubmitHandler } from "react-hook-form";
import { api } from "@/utils/api";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/utils/firebase";

type FormValues = {
  name: string;
  coat_check: string;
};

const Checkin: NextPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful },
  } = useForm<FormValues>({ shouldUseNativeValidation: true });

  
  const [user] = useAuthState(auth);

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
      reset({ name: "", coat_check: "" });
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <>
      <div className="flex flex-col items-center gap-4">
        
        <h1 className="bg-red-900 w-screen text-center text-yellow-300 text-4xl py-6 px-20">Welcome to the Tri-Rho Extravaganza!</h1>
        
        { user && (
        <div className="">
          {!mutation.isSuccess && (
            /* eslint-disable-next-line @typescript-eslint/no-misused-promises*/
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="">
                <div className="flex items-center pt-6 justify-center">
                  <label htmlFor="name" className="text-center text-4xl mx-5">
                    Full Name:
                  </label>
                  <input
                    id="name"
                    type="text"
                    autoComplete="off"
                    className="block appearance-none rounded-lg border  border-gray-600 bg-gray-700 p-2.5 text-sm text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
                    {...register("name", {
                      required: "Please enter your full name",
                    })}
                  />
                </div>
                <p  className="text-center text-2xl pt-6 pb-1">
                  Do you want to check your coat?
                </p>
                <div className="flex items-center gap-3 justify-center">
                <label className="text-2xl" htmlFor="coat_check_yes" >Yes</label>
                <input
                  type="radio"
                  {...register("coat_check", { required: "Select yes or no" })}
                  id="coat_check_yes"
                  value="yes"
                  className="h-5 w-5"
                />
                <label className="text-2xl" htmlFor="coat_check_no">No</label>
                <input
                  type="radio"
                  {...register("coat_check", { required: "Select yes or no" })}
                  id="coat_check_no"
                  value="no"
                  className="h-5 w-5"
                /></div>
                <div className="p-6 flex justify-center">
                <button type="submit" className="btn">Submit</button></div>
              </div>
            </form>
          )}

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
              <button className="btn" type="reset" onClick={() => mutation.reset()}>
                Next
              </button>
            </div>
          )}
        </div>
          )}
      </div>
    </>
  );
};

export default Checkin;
