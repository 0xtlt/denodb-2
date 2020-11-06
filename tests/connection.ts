import { Database } from "../mod.ts";

const Connection = (): Database => {
  const connection: Database = new Database(
    { dialect: "mysql", debug: false },
    {
      database: "test",
      host: "localhost",
      username: "root",
      password: "007",
      port: 3306,
    },
  );

  return connection;
};

export default Connection;
