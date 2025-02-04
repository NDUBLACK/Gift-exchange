import express from "express";
import bodyParser from "body-parser";
import "dotenv/config";
import cors from "cors";

const app = express();
const port = process.env.PORT;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.post("/register", (req, res) => {
  res.json({ message: "Homepage" });
  res.status = 200;
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
