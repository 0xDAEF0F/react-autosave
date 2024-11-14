import { useEffect, useMemo, useRef, useState } from "react";
import { debounce, isEqual } from "lodash";
import { ZodType } from "zod";

type Props<Data> = {
  data: Data;
  schema: ZodType;
  onSave: (data: Data) => Promise<void>;
  wait?: number;
};

export type Status = "idle" | "saving" | "error";

export function useAutoSave<Data>({
  data,
  schema,
  onSave,
  wait = 1000,
}: Props<Data>) {
  const [status, setStatus] = useState<Status>("idle");
  const prevVal = useRef(data);

  const debounced = useMemo(
    () =>
      debounce((data) => {
        if (isEqual(data, prevVal.current)) return;
        if (!schema.safeParse(data).success) {
          console.log("error schema");
          setStatus("error");
          return;
        }
        setStatus("saving");
        onSave(data)
          .then(() => setStatus("idle"))
          .catch(() => {
            console.log("error server");
            setStatus("error");
          });
        prevVal.current = data;
      }, wait),
    [onSave, wait, schema]
  );

  useEffect(() => {
    debounced(data);
  }, [data, debounced]);

  return { status };
}
