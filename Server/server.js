import express from "express";
import bodyParser from "body-parser";
import "dotenv/config";
import fs from "fs/promises";
import cors from "cors";
import { rateLimit } from "express-rate-limit";

const app = express();
const port = process.env.PORT;

// Middleware
const limiter = rateLimit({
  windowMs: 7 * 24 * 60 * 60 * 1000, // 1 week
  limit: 1, // Limit each IP to 1 request per windowMs
  standardHeaders: "draft-8", // Use the latest standard headers
  legacyHeaders: false, // Disable legacy headers
});

//functions
function shuffle(array) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
}

app.use(
  cors({
    origin: "http://localhost:5173", // Allow only your frontend
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/register", limiter, async (req, res) => {
  try {
    const name = req.body.name;
    const number = req.body.number;
    const user = {
      name,
      number,
    };
    const data = JSON.parse(await fs.readFile("./user.json", "utf-8"));
    var step1 = data.users;
    step1.push(user);
    try {
      var newuser = JSON.stringify({ users: step1 });
      await fs.writeFile("./user.json", newuser);
      return res.status(200).json({ message: "Registered Successfully" });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "We couldnt handle this request" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "We couldnt handle this request" });
  }
});

app.get("/register", async (req, res) => {
  try {
    const data = JSON.parse(await fs.readFile("./user.json", "utf-8"));
    var step1 = data.users;
    shuffle(step1);
    const chunkedArray = [];
    for (let i = 0; i < step1.length; i += 2) {
      chunkedArray.push(step1.slice(i, i + 2));
    }

    var regg = "";
    chunkedArray.forEach((group, index) => {
      group.map((item) => {
        regg += item.name;
        regg += ",";
      });
      regg += "<br />";
    });

    return res.send(regg);
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
