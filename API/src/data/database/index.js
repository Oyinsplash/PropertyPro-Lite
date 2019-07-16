import { Pool } from "pg";

import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});
pool.on("connect", () => {
  // console.log("I'm here!!");
});
export default {
  query: (text, params) => pool.query(text, params),
  queryPool: text => pool.query(text)
};
