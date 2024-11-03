// utils/aiTextGenerator.js
const axios = require('axios');
require('dotenv').config(); // Load environment variables

const API_URL = 'https://api.openai.com/v1/chat/completions'; // Correct endpoint for Chat API
const API_KEY = process.env.API_KEY; // Fetch the API key from environment variables

// Function to generate text using the AI service
exports.generateText = async (data) => {
  try {
    // Log the API Key for debugging (remove this in production)
    console.log('API Key:', API_KEY); // Debugging line

    const response = await axios.post(API_URL, {
      model: 'gpt-3.5-turbo', // Specify the model
      messages: [{ role: 'user', content: data.prompt }], // Structure for the Chat API
      max_tokens: 150, // Adjust max tokens as needed
      temperature: 0.7, // Control randomness of output
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`, // Use Bearer token for authorization
      },
    });

    return response.data.choices[0].message.content.trim(); // Return generated text
  } catch (error) {
    console.error("Error calling AI service:", error.message);
    throw new Error('AI service request failed'); // Handle error
  }
};
