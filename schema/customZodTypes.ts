import { z } from "zod";

export const customBoolean = (fieldName: string) => {
  return z
    .preprocess(
      (value) => {
        if (value === "true") return true;
        if (value === "false") return false;
        return Boolean(value);
      },
      z.boolean({
        message: `${fieldName} must be a boolean`,
      })
    )
    .default(true);
};
