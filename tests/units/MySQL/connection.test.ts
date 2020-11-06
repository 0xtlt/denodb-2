import Connection from "../../connection.ts";
import { assertEquals } from "../../deps.ts";

Deno.test("MySQL connection", async function () {
  const connection = Connection();
  const ping = await connection.ping();
  await connection.close();

  assertEquals(ping, true);
});
