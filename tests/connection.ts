import { Database } from "../mod.ts";

const Connection = (): Database => {
  const connection: Database = new Database(
    { dialect: "mysql", debug: false },
    {
      database: "test",
      host: "127.0.0.1",
      username: "root",
      password: "",
      port: 3306,
    },
  );

  return connection;
};

export default Connection;
