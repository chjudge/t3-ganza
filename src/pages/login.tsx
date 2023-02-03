import { auth } from "@/utils/firebase";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { type SubmitHandler, useForm } from "react-hook-form";

type FormValues = {
  loginEmail: string;
  loginPassword: string;
};

export default function LoginForm() {
  const inputStyle =
  "relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm";

  const { register, handleSubmit } = useForm<FormValues>();

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);

    signInWithEmailAndPassword(data.loginEmail, data.loginPassword)
      .then((userCredential) => {
        // Signed in
        if (userCredential) {
          const user = userCredential.user;
          console.log(user);
        }
      })
      .catch((error) => {
        console.log(error);
        // ..
      });
  };
  return (
    <div>
      <p className="">Log in to your account</p>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="sr-only" htmlFor="loginEmail">
          Email
        </label>
        <input
          className={inputStyle + " rounded-t-md"}
          id="loginEmail"
          type="email"
          autoComplete="email"
          {...register("loginEmail", { required: true })}
          placeholder="Email address"
        />

        <label className="sr-only" htmlFor="loginPassword">
          Password
        </label>
        <input
          className={inputStyle}
          id="loginPassword"
          type="password"
          {...register("loginPassword", { required: true })}
          placeholder="Password"
        />

        <button type="submit" className="">
          Login
        </button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>{error.message}</p>}
      {user && (
        <div>
          <p>Signed In User: {user.user.email}</p>
        </div>
      )}
    </div>
  );
}
