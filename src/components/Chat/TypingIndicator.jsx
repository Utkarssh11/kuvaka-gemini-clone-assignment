import React from 'react'

const TypingIndicator = () => {
  return (
    <div className="flex justify-start mb-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Gemini is typing...
          </span>
        </div>
      </div>
    </div>
  )
}

export default TypingIndicator 