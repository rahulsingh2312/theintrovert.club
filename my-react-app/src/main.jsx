import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Send, Twitter , Instagram } from 'lucide-react';

createRoot(document.getElementById('root')).render(
  <div className='overflow-hidden'>
    <StrictMode>
      <div className='flex py-3 bg-white justify-center'>
        <div className="w-full max-w-[939px] px-4 flex items-center justify-between">
          {/* Title Section */}
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl font-bold text-green-600">$introvert</h1>
            <p className="text-sm text-red-400">coming soon</p>
          </div>

          {/* Social Icons */}
          <div className="flex space-x-3">
            <a
              href="https://t.me/theintrovertclub"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-blue-400 text-white rounded-full hover:bg-blue-700 transition transform hover:scale-110"
            >
              <Send size={16} />
            </a>
            <a
              href="https://x.com/introvertedcto"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-black text-white rounded-full hover:bg-gray-800 transition transform hover:scale-110"
            >
              <Twitter size={16} />
            </a>
            <a
              href="https://www.instagram.com/the_introvertclub/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-pink-400 text-white rounded-full hover:bg-gray-800 transition transform hover:scale-110"
            >
              <Instagram size={16} />
            </a>
          </div>
        </div>
      </div>
      <App />
    </StrictMode>
  </div>
), document.getElementById('root')