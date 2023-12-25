require("dotenv").config();
const express = require("express");
const router = express.Router();
const OpenAIApi = require("openai");
const Configuration = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

router.post("/:msg", async (req, res) => {
  const message = req.params.msg;
  console.log(message);
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "assistant",
        content: `generate 10 new vocabuary words of category ${message} and their meaning`,
      },
    ],
    temperature: 1,
    max_tokens: 512,
    top_p: 1,
    temperature: 0.5,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  res.json({ response: completion });
});

module.exports = router;
