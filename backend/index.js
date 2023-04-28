import dotenv from 'dotenv';
import pg from 'pg';

const { Pool } = pg;

dotenv.config();

const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});

pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack);
  }
  // Query to list all tables in the 'citus' database
  client.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';", (err, result) => {
    release();
    if (err) {
      return console.error('Error executing query', err.stack);
    }
    console.log("List of tables in the 'citus' database:");
    result.rows.forEach(row => {
      console.log(row.table_name);
    });
  });
});
