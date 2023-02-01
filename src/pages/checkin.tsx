import type { GetServerSideProps, NextPage } from "next";
import { useForm, type SubmitHandler } from "react-hook-form";
import { api } from "@/utils/api";
import { prisma } from "@/server/db";
import { useState } from "react";

type FormValues = {
  name: string;
  coat_check: string;
};

const Checkin: NextPage = () => {
  const { register, handleSubmit } = useForm<FormValues>();

  // const query = api.checkin.coatCheckNumber
  const mutation = api.checkin.checkin.useMutation({
    onSuccess: () => {
      console.log("success");
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);

    const coat_check = data.coat_check === "yes" ? true : false;

    // const {name, coat_check} = data;
    const name = data.name;

    console.log(coat_check);

    mutation.mutate({ name, coat_check });
    // mutation.mutate(data);

    // if (data.coat_check === data.no_coat_check) {
    //   console.log("coat check");
    // } else {
    //   mutation.mutate({ name: data.name, coat_check: data.coat_check });
    // }
  };
  return (
    <>
      <p>checkin</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          className="block appearance-none rounded-lg border  border-gray-600 bg-gray-700 p-2.5 text-sm text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
          {...register("name", { required: true })}
        />
        <label>Do you want to check your coat?</label>
        {/* <input id="coat_check" type="checkbox" {...register("coat_check")} /> */}

        <label htmlFor="coat_check_yes">Yes</label>
        <input
          type="radio"
          {...register("coat_check", { required: true })}
          id="coat_check_yes"
          value="yes"
        />
        <label htmlFor="coat_check_no">No</label>
        <input
          type="radio"
          {...register("coat_check", { required: true })}
          id="coat_check_no"
          value="no"
        />

        <button type="submit">Submit</button>
      </form>

      {mutation.isSuccess && (
        <p className="text-center text-2xl">
          {mutation.variables?.name} Checked In
          <Result
            name={mutation.variables?.name ? mutation.variables?.name : ""}
          />
        </p>
      )}
    </>
  );
};

export default Checkin;

type Props = {
  name: string;
};

const Result: NextPage<Props> = ({ name }) => {
  // const query = api.checkin.coatCheckNumber.useQuery({ name: name });

  const [ number, setNumber ] = useState(0);

  prisma.person
    .findUniqueOrThrow({
      where: {
        name: name,
      },
    })
    .then((person) => {
      console.log(`got the number:  ${person.coat_check_number}`);
      setNumber(person.coat_check_number);
    })
    .catch((e) => {
      console.log(e);
    });

  return (
    <>
      <p>result</p>
      {number != 0 && <p>{number}</p>}
      {/* {query.isLoading && <p>loading</p>}
      {query.isSuccess && <p>{query.data}</p>} */}
    </>
  );
};
