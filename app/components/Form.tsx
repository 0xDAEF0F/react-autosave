/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useState } from "react";
import { saveData } from "../actions/saveData";
import { useAutoSave } from "../hooks/useAutoSave";

export function Form() {
  const [data, setData] = useState({ text: "" });
  const { status } = useAutoSave({ data, onSave: saveData });

  return (
    <form>
      <h1 className='capitalize'>Status: {`${status}`}</h1>
      <input
        className='p-3 border border-black'
        type='text'
        placeholder='text'
        value={data.text}
        onChange={(e) => setData((d) => ({ ...d, text: e.target.value }))}
      />
    </form>
  );
}
