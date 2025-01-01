// OpenAI API Key (replace with your actual key)
const OPENAI_API_KEY = "your_openai_api_key";

// Elements
const chatbox = document.getElementById("chatbox");
const userMessageInput = document.getElementById("user-message");
const sendButton = document.getElementById("send-button");

// Event Listener for Sending Messages
sendButton.addEventListener("click", async () => {
  const userMessage = userMessageInput.value.trim();

  if (userMessage) {
    // Display user message in chat
    displayMessage("You", userMessage);

    // Clear input field
    userMessageInput.value = "";

    // Get AI response
    const aiResponse = await getAIResponse(userMessage);
    displayMessage("AI", aiResponse);
  }
});

// Function to Display Messages
function displayMessage(sender, message) {
  const messageElement = document.createElement("p");
  messageElement.textContent = `${sender}: ${message}`;
  chatbox.appendChild(messageElement);
  chatbox.scrollTop = chatbox.scrollHeight; // Scroll to the bottom
}

// Function to Get AI Response from OpenAI API
async function getAIResponse(userMessage) {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: userMessage }],
      }),
    });

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error fetching AI response:", error);
    return "Sorry, I couldn't process your request.";
  }
}
