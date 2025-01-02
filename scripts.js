const form = document.getElementById('userInputForm');
const userInput = document.getElementById('userInput');
const chatLog = document.getElementById('chat-log');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const userMessage = userInput.value;
  addMessage(userMessage, 'user-message');
  userInput.value = '';

  // AI Response Logic
  setTimeout(() => {
    const aiResponse = getAIResponse(userMessage);
    addMessage(aiResponse, 'ai-message');
  }, 500);
});

function addMessage(message, className) {
  const messageDiv = document.createElement('div');
  messageDiv.className = className;
  messageDiv.textContent = message;
  chatLog.appendChild(messageDiv);
  chatLog.scrollTop = chatLog.scrollHeight; // Auto-scroll to the latest message
}

function getAIResponse(message) {
  message = message.toLowerCase();

  // Basic functionalities
  if (message.includes('hello') || message.includes('hi')) {
    return "Hello! How can I assist you today?";
  } else if (message.includes('time')) {
    return `The current time is ${new Date().toLocaleTimeString()}.`;
  } else if (message.includes('date')) {
    return `Today's date is ${new Date().toLocaleDateString()}.`;
  } else if (message.includes('calculate')) {
    try {
      const expression = message.replace('calculate', '').trim();
      const result = eval(expression); // Basic math evaluation (Caution: Avoid unsafe inputs!)
      return `The result is ${result}.`;
    } catch (err) {
      return "I couldn't calculate that. Please check your expression.";
    }
  } else if (message.includes('joke')) {
    return "Why don't programmers like nature? It has too many bugs!";
  } else if (message.includes('add task')) {
    const task = message.replace('add task', '').trim();
    addToDoList(task);
    return `Task "${task}" added to your to-do list!`;
  } else if (message.includes('show tasks')) {
    return showToDoList();
  } else {
    return "I'm not sure how to respond to that. Try asking me something else!";
  }
}

// To-Do List Functionality
const toDoList = [];

function addToDoList(task) {
  toDoList.push(task);
}

function showToDoList() {
  if (toDoList.length === 0) return "Your to-do list is empty.";
  return "Your to-do list:\n" + toDoList.map((task, index) => `${index + 1}. ${task}`).join('\n');
}
