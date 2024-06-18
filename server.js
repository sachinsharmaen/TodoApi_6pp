import { app } from "./app.js";
import { connectDB } from "./data/db_connection.js";

connectDB();

app.listen(process.env.PORT, (req, res) => {
  console.log(`Server at ${process.env.PORT} listening on ${process.env.NODE_ENV}`);
});