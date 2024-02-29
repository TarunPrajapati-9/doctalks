import { type FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";

import verifyTokenServerSize from "@/utils/func/verifytoken";

export default function createContext({
  req,
  resHeaders,
}: FetchCreateContextFnOptions) {
  let isValidDoctor = verifyTokenServerSize();
  return {
    req,
    resHeaders,
    isValidDoctor,
  };
}
