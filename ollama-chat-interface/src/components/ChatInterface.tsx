import React, { useState } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      const userMessage: Message = { role: 'user', content: input };
      setMessages(prevMessages => [...prevMessages, userMessage]);
      setInput('');
      setIsLoading(true);

      try {
        console.log('Sending request to Ollama...');
        const response = await fetch('http://localhost:11434/api/generate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'llama3',  // Changed from 'llama2' to 'llama3'
            prompt: input,
            stream: false,
          }),
        });

        console.log('Response status:', response.status);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Received data:', data);
        const assistantMessage: Message = { role: 'assistant', content: data.response };
        setMessages(prevMessages => [...prevMessages, assistantMessage]);
      } catch (error: unknown) {
        console.error('Detailed error:', error);
        const errorMessage: Message = { 
          role: 'assistant', 
          content: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`
        };
        setMessages(prevMessages => [...prevMessages, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-4">
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[70%] rounded-lg p-3 ${
              message.role === 'user' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white'
            }`}>
              {message.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white max-w-[70%] rounded-lg p-3">
              Thinking...
            </div>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit} className="border-t dark:border-gray-700 pt-4 flex">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow p-2 rounded-l-lg border dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type a message..."
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isLoading}
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatInterface;