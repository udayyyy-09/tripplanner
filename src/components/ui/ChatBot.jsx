import { useState, useRef, useEffect } from 'react';

const ChatBot = () => {
  const [messages, setMessages] = useState([
    {
      role: "model",
      content: "Hello! I'm your travel assistant. Ask me about destinations, itineraries, or cultural tips!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('travel-chat', JSON.stringify(messages));
  }, [messages]);

  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    
    const userMessage = { role: "user", content: input };
    const newMessages = [...messages, userMessage];
    
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      // Use the correct API endpoint and model name
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-latest:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [{ 
                text: formatConversation(newMessages) 
              }],
              role: "user"
            }],
            generationConfig: {
              temperature: 0.8,
              maxOutputTokens: 2000
            }
          })
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
        throw new Error("Invalid response format from Gemini");
      }

      const botReply = data.candidates[0].content.parts[0].text;
      
      setMessages(prev => [...prev, { 
        role: "model", 
        content: botReply 
      }]);
    } catch (error) {
      console.error("API Error:", error);
      setError(error.message);
      setMessages(prev => [...prev, { 
        role: "model", 
        content: "⚠️ I encountered an error. Please try again later." 
      }]);
    } finally {
      setLoading(false);
    }
  };

  // Format conversation history for Gemini
  const formatConversation = (messages) => {
    return messages.map(msg => {
      return `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`;
    }).join('\n\n') + '\n\nAssistant:';
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-xl p-4">
      <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-blue-500">
          <path fillRule="evenodd" d="M8.161 2.58a1.875 1.875 0 011.678 0l4.993 2.498c.106.052.23.052.336 0l3.869-1.935A1.875 1.875 0 0121.75 4.82v12.485c0 .71-.401 1.36-1.037 1.677l-4.875 2.437a1.875 1.875 0 01-1.676 0l-4.994-2.497a.375.375 0 00-.336 0l-3.868 1.935A1.875 1.875 0 012.25 19.18V6.695c0-.71.401-1.36 1.036-1.677l4.875-2.437zM9 6a.75.75 0 01.75.75V15a.75.75 0 01-1.5 0V6.75A.75.75 0 019 6zm6.75 3a.75.75 0 00-1.5 0v8.25a.75.75 0 001.5 0V9z" clipRule="evenodd" />
        </svg>
        Travel Genie
      </h2>
      
      <div className="h-80 overflow-y-auto border rounded-lg p-3 mb-3 bg-gray-50">
        {messages.map((msg, i) => (
          <div key={i} className={`mb-3 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
            <div className={`inline-block max-w-xs px-4 py-2 rounded-xl ${msg.role === 'user' 
              ? 'bg-blue-100 text-blue-900 rounded-br-none' 
              : 'bg-gray-200 text-gray-900 rounded-bl-none'}`}>
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="text-left">
            <div className="inline-block px-4 py-2 rounded-xl bg-gray-200 text-gray-900 rounded-bl-none">
              <div className="flex space-x-2">
                <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce"></div>
                <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {error && (
        <div className="text-red-500 text-sm mb-2 p-2 bg-red-50 rounded">
          Error: {error}
        </div>
      )}

      <div className="flex gap-2">
        <input
          type="text"
          className="flex-grow border border-gray-300 rounded-lg px-4 bg-white py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about Paris, Tokyo, or beach destinations..."
          disabled={loading}
        />
        <button
          onClick={handleSend}
          disabled={!input.trim() || loading}
          className={`px-4 py-2 rounded-lg font-medium ${(!input.trim() || loading) 
            ? 'bg-gray-300 cursor-not-allowed' 
            : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
        >
          {loading ? 'Sending...' : 'Send'}
        </button>
      </div>
    </div>
  );
};

export default ChatBot;