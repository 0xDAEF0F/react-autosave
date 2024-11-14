"use client";

import { saveData } from "../actions/saveData";
import { useAutoSave } from "../hooks/useAutoSave";
import { TextSchema, textSchema } from "../utils/schema";
import { useFormik } from "formik";

export function Form() {
  const formik = useFormik<TextSchema>({
    initialValues: { text: "" },
    onSubmit: () => {},
  });
  const { status } = useAutoSave({
    data: formik.values,
    schema: textSchema,
    onSave: saveData,
  });

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <h1 className='capitalize'>Status: {`${status}`}</h1>
      <input
        className='p-3 border border-black'
        type='text'
        placeholder='text'
        name='text'
        value={formik.values.text}
        onChange={formik.handleChange}
      />
    </form>
  );
}
