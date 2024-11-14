"use server";

import { textSchema } from "../utils/schema";
import { sleep } from "../utils/sleep";

export async function saveData(data: unknown) {
  await sleep(1000);
  const res = textSchema.safeParse(data);
  if (res.error) throw new Error("bad data");
}
