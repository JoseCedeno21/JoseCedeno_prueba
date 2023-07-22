import app from './src/server';
import * as dotenv from "dotenv";
dotenv.config()

const port: Number = 8080
app.listen(port, () => {
  console.log(`App listening on the port ${port}`);
});