const express = require('express');
const axios = require('axios');
require('dotenv').config();
const cors = require('cors');
const OpenAI = require('openai');
const { Request, Response } = require('express');
const { exec } = require('child_process');

// OpenAiApi initialization
const openapi = new OpenAI({
    apiKey: process.env.OPENAIAPI_KEY,
});

const app = express();
app.use(cors());
app.use(express.json());

// Start the server listeting on 'port'
const port = 3011;
app.listen(port, express.urlencoded({ extended: true }), () => {
    console.log(`Server running on port ${port}`);
});

// Listening on route '/chat' on 'port'
app.post('/chat', async (request, response) => {
  const { prompt } = req.body;

// Check 'prompt' and create request
try {
    if (prompt == null) {
        throw new Error('somth have happened');
    }
    const response = await openapi.createCompletion({
        model: 'text-davinci-003',
        prompt,
        max_tokens: 500,
        temperature: 0,
    });
    // Receiving the response and sending it back
    const completion = response.data.choices[0].text;
     response.status(200).json({
        success: true,
        message: completion,
    });
} catch (error) {
    console.log(error.message);
}});


