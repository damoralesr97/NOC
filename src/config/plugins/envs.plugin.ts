import "dotenv/config";
import * as env from "env-var";

export const envs = {
  PORT: env.get("PORT").required().asInt(),
  MAILER_EMAIL: env.get("MAILER_EMAIL").required().asEmailString(),
};
