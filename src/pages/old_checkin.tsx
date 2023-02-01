/* eslint-disable @typescript-eslint/no-misused-promises */

import { api } from "@/utils/api";
import { Navbar } from "@/components/navbar";
import type { UseFormProps } from "react-hook-form";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from "zod";

export const validationSchema = z.object({
  number: z.number().int().positive(),
});

function useZodForm<TSchema extends z.ZodType>(
  props: Omit<UseFormProps<TSchema['_input']>, 'resolver'> & {
    schema: TSchema;
  },
) {
  const form = useForm<TSchema['_input']>({
    ...props,
    resolver: zodResolver(props.schema, undefined),
  });

  return form;
}

export default function Checkin() {
  // const query = api.ticket.checkTicket.useQuery(undefined, {
  //   suspense: true,
  // });

  // const posts = query.data;

  const mutation = api.ticket.checkTicket.useMutation({
    onSuccess: () => {
      console.log("success");
    },
  });

  const methods = useZodForm({
    schema: validationSchema,
    defaultValues: {
      number: 0,
    },
  });

  return (
    <>
      <Navbar />
      <div className="flex h-screen w-screen flex-col items-center justify-center gap-4">
        <p className="text-center text-2xl">checkin</p>

        {mutation.isSuccess && (
          <p className="text-center text-2xl">
            Ticket {mutation.variables?.number} Checked In
          </p>
        )}

        <form onSubmit={methods.handleSubmit( (values) => {
          console.log("submitting ", values);
          mutation.mutate(values);
          methods.reset();
        })} className="flex flex-col gap-4">
          <input
            type="number"
            {...methods.register("number")}
            className="block w-full appearance-none rounded-lg border  border-gray-600 bg-gray-700 p-2.5 text-sm text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
          />
          <button type="submit" disabled={mutation.isLoading} className="btn">
            {mutation.isLoading ? "Loading" : "Check In"}
          </button>
        </form>
      </div>
    </>
  );
}
