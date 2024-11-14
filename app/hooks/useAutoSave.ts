import { useEffect, useMemo, useRef, useState } from "react";
import { debounce, isEqual } from "lodash";

type Props<Data> = {
  data: Data;
  onSave: (data: Data) => Promise<void>;
  wait?: number;
};

export type Status = "idle" | "saving" | "error";

export function useAutoSave<Data>({ data, onSave, wait = 1000 }: Props<Data>) {
  const [status, setStatus] = useState<Status>("idle");
  const prevVal = useRef(data);

  const debounced = useMemo(
    () =>
      debounce((data) => {
        if (isEqual(data, prevVal.current)) return;
        setStatus("saving");
        onSave(data)
          .then(() => setStatus("idle"))
          .catch(() => setStatus("error"));
        prevVal.current = data;
      }, wait),
    [onSave, wait]
  );

  useEffect(() => {
    debounced(data);
  }, [data, debounced]);

  return { status };
}
