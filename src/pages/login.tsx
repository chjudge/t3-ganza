import { useSession, signIn } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";

type FormValues = {
  username: string;
  password: string;
};

const Login = () => {
  const { data: session } = useSession();

  const { register, handleSubmit } = useForm<FormValues>({
    shouldUseNativeValidation: true,
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
    signIn("credentials", {
      redirect: false,
      username: data.username,
      password: data.password,
    })
      .then((res) => {
        console.log(res);
        if (res) {
          if (res.ok) {
            console.log("success")
          } else {
            // Not signed in
          }
        }
      })
      .catch((err) => {
        // Handle error
      });
  };

  return (
    <div>
    {/* eslint-disable-next-line @typescript-eslint/no-misused-promises*/}
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          autoComplete="off"
          className="block appearance-none rounded-lg border  border-gray-600 bg-gray-700 p-2.5 text-sm text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
          {...register("username", { required: true })}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          className="block appearance-none rounded-lg border  border-gray-600 bg-gray-700 p-2.5 text-sm text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
          {...register("password", { required: true })}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
