"use client";

import { useForm } from "../hooks/useForm";

export function IdealForm() {
  const { data, register } = useForm({
    defaultValues: {
      email: "",
      password: "",
      isChecked: "",
    },
  });

  console.log(data);

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <input
        {...register("email")}
        className='p-3 border border-black block'
        type='email'
        placeholder='email@email.com'
      />
      <input
        {...register("password")}
        className='p-3 border border-black block'
        type='password'
        placeholder='*******'
      />
      <input {...register("isChecked")} type='checkbox' />
    </form>
  );
}
