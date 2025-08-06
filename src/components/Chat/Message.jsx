import React, { useState } from 'react'
import { Copy, Check } from 'lucide-react'

const Message = ({ message }) => {
  const [copied, setCopied] = useState(false)
  const isAI = message.sender === 'ai'

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  return (
    <div className={`flex ${isAI ? 'justify-start' : 'justify-end'} mb-4`}>
      <div className={`max-w-xs lg:max-w-md xl:max-w-lg ${isAI ? 'bg-white dark:bg-gray-800' : 'bg-primary-600 text-white'} rounded-lg p-3 shadow-sm relative group`}>
        {message.image ? (
          <div className="space-y-2">
            <img 
              src={message.image.url} 
              alt="Uploaded content"
              className="max-w-full h-auto rounded-lg"
            />
            {message.content && (
              <p className="text-sm">{message.content}</p>
            )}
          </div>
        ) : (
          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
        )}
        
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs opacity-70">
            {formatTime(message.timestamp)}
          </span>
          
          {message.content && (
            <button
              onClick={() => copyToClipboard(message.content)}
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1 hover:bg-black/10 rounded"
              title="Copy message"
            >
              {copied ? (
                <Check className="h-3 w-3" />
              ) : (
                <Copy className="h-3 w-3" />
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Message 
