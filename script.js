async function submitTextQuery() {
  const query = document.getElementById('query').value;
  const response = await fetch('http://localhost:5000/api/ask', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query })
  });
  const data = await response.json();
  document.getElementById('response').innerText = data.answer;
}

function startVoiceQuery() {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = 'en-US';
  recognition.onresult = async (event) => {
    const voiceQuery = event.results[0][0].transcript;
    const response = await fetch('http://localhost:5000/api/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: voiceQuery })
    });
    const data = await response.json();
    document.getElementById('response').innerText = data.answer;
  };
  recognition.start();
}
