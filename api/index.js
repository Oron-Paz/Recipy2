const { config } = require('dotenv');
config();
const OpenAI = require("openai");
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser'); // Add bodyParser middleware
const cors = require('cors'); // Require the cors middleware

const app = express();
app.use(cors());

const openAi = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../public')));
app.use('/images', express.static(path.join(__dirname, '../public/images')));
app.use('/fonts', express.static(path.join(__dirname, '../public/fonts')));

// Use bodyParser to parse JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/public', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.post('/api', async (req, res) => {
  const userMessage = req.body.userMessage;
  const system_prompt = `If the user input is not food related or is not something that can be turned into a meal then simply fill all the strings for the JSON with "undefined". Otherwise DONT leave anything undefined, respond to the user with a meal with the ingridients and amounts that the user inputs, you do not have to use all ingridients if they dont make sense in a dish. Write its description in the following parsable JSON format:
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
