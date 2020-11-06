import { Database } from "../mod.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";

const Connection = (): Database => {
  const env = config();

  const connection: Database = new Database(
    { dialect: "mysql", debug: true },
    {
      database: "test",
      host: "127.0.0.1",
      username: "root",
      password: "007",
      port: Number(env.DB_PORT),
    },
  );

  return connection;
};

export default Connection;
