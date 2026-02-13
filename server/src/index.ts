import express from "express";
import cors from "cors";
import router from "./routes/orderRoutes";

const app = express();
const PORT = 5000;

app.use(cors());

app.use(express.json());

app.use("/api", router);

try {
  app.listen(PORT, () => {
    console.log(`App is listening to port ${PORT}`);
  });
} catch (error) {
  console.error("Error starting server");
  process.exit(1);
}
