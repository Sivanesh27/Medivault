import React, { useState, useRef, useEffect } from 'react';

function Chatbot() {
  const [messages, setMessages] = useState([
    { from: "bot", text: "👋 Hello! How can I assist you today?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  // Auto-scroll to the bottom when new messages arrive
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { from: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true); // Show typing indicator

    try {
      // Fetch response from your backend chatbot API
      const res = await fetch('http://localhost:5000/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      });

      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await res.json();
      const botMessage = { from: 'bot', text: data.reply };
      
      // Add the bot's response to the chat
      setMessages(prev => [...prev, botMessage]);

    } catch (error) {
      // Handle any errors that occur during the fetch
      console.error("Chatbot API error:", error);
      const errorMessage = { from: 'bot', text: '🤖 Sorry, I am having trouble connecting to my brain right now.' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
        setIsTyping(false); // Hide typing indicator
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-50 p-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">Healthcare Chatbot</h1>

      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl flex flex-col">
        {/* Chat messages */}
        <div className="flex-1 p-4 overflow-y-auto h-96 space-y-3">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`px-4 py-2 rounded-2xl text-sm max-w-[70%] ${
                  msg.from === "user"
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-gray-200 text-gray-800 rounded-bl-none"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
           {/* Typing indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="px-4 py-2 rounded-2xl text-sm max-w-[70%] bg-gray-200 text-gray-800 rounded-bl-none">
                <div className="flex items-center space-x-1">
                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-pulse"></span>
                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-pulse delay-75"></span>
                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-pulse delay-150"></span>
                </div>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input form */}
        <form
          onSubmit={sendMessage}
          className="flex items-center border-t border-gray-200 p-3 bg-gray-50 rounded-b-2xl"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition font-medium"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chatbot;