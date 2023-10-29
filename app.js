const { config } = require('dotenv');
config();
const OpenAI = require("openai");
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser'); // Add bodyParser middleware
const app = express();

const openAi = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

// Use bodyParser to parse JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.post('/chat', async (req, res) => {
  const userMessage = req.body.userMessage;
  const system_prompt = `Respond to the user with a meal with the ingridients that the user inputs and its description in the following parsable JSON format:
                  {
                    dishName: "Name of the dish",
                    dishDescription: "A 2-3 sentence description of the dish/its history anything related",
                    dishIngridients: "the list of ingridients that is needed for the dish as well as how much of each",
                    dishRecipe: "The steps to make said meal seperated by lines",
                  }`
  ;

  try {
    const chatCompletion = await openAi.chat.completions.create({
      messages: [
        { role: "system", content: system_prompt },
        { role: "user", content: userMessage },
      ],
      model: "gpt-3.5-turbo",
    });

    const aiResponse = JSON.parse(chatCompletion.choices[0].message.content);
    res.json(aiResponse);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ response: 'Error processing the request' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});