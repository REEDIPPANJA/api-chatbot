require("dotenv").config();
const express = require("express");
const cors=require("cors");
const axios = require("axios");
const app = express();
app.use(express.json());
app.use(cors(
  {
    origin:"https://api-chatbot.netlify.app"
  }
));   

app.post("/", async (req, res) => {
  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMENI_URL}`,
      req.body
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
