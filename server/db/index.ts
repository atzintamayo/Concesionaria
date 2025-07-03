import pgPromise from "pg-promise";
import dotenv from "dotenv";

dotenv.config();

const pgp = pgPromise();

const db = pgp('postgres://mizta:mysecretpassword@localhost:5432/agencia');

const {value} = await db.one('SELECT 123 as value');

console.log(value);

export default db;
