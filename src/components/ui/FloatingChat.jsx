// In your Layout or App.jsx
import ChatBot from './ChatBot';
import { useState } from 'react';

const FloatingChat = () => {
  const [showChat, setShowChat] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowChat((prev) => !prev)}
        className="fixed bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 z-50"
      >
        💬
      </button>

      {showChat && (
        <div className="fixed bottom-16 right-4 w-80 z-50">
          <ChatBot />
        </div>
      )}
    </>
  );
};

export default FloatingChat;
