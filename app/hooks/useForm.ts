import { useState, useCallback } from "react";

type FormValues = Record<string, unknown>;

type UseFormProps<T extends FormValues> = {
  defaultValues: T;
};

type UseFormReturn<T extends FormValues> = {
  data: T;
  register: (name: keyof T) => {
    name: keyof T;
    value: T[keyof T];
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };
};

export function useForm<T extends FormValues>({
  defaultValues,
}: UseFormProps<T>): UseFormReturn<T> {
  const [data, setData] = useState<T>(defaultValues);

  const register = useCallback(
    (name: keyof T) => {
      return {
        name,
        value: data[name],
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
          setData((prev) => ({
            ...prev,
            [name]: e.target.value,
          }));
        },
      };
    },
    [data]
  );

  return {
    data,
    register,
  };
}
