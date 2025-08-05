import React, { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ArrowLeft, Send } from 'lucide-react'
import { useChatStore } from '../store/chatStore'
import { useUIStore } from '../store/uiStore'
import { getAIResponse } from '../utils/api'
import { useInfiniteScroll } from '../hooks/useInfiniteScroll'
import Message from '../components/Chat/Message'
import TypingIndicator from '../components/Chat/TypingIndicator'
import MessageInput from '../components/Chat/MessageInput'
import Button from '../components/UI/Button'
import DarkModeToggle from '../components/UI/DarkModeToggle'

const Chatroom = () => {
  const { chatId } = useParams()
  const navigate = useNavigate()
  const messagesEndRef = useRef(null)
  const chatContainerRef = useRef(null)
  
  const [isTyping, setIsTyping] = useState(false)
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  
  const { getChatroom, getMessages, addMessage } = useChatStore()
  const { initializeDarkMode } = useUIStore()
  
  const chatroom = getChatroom(chatId)
  const messages = getMessages(chatId)
  
  // Pagination: show 20 messages per page
  const messagesPerPage = 20
  const displayedMessages = messages.slice(-page * messagesPerPage)
  
  useEffect(() => {
    initializeDarkMode()
  }, [initializeDarkMode])
  
  useEffect(() => {
    if (!chatroom) {
      toast.error('Chatroom not found')
      navigate('/dashboard')
      return
    }
  }, [chatroom, navigate])
  
  useEffect(() => {
    scrollToBottom()
  }, [messages])
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }
  
  const handleSendMessage = async (messageData) => {
    if (!messageData.content && !messageData.image) return
    
    // Add user message
    const userMessage = addMessage(chatId, messageData)
    
    // Show typing indicator
    setIsTyping(true)
    
    // Simulate AI response
    try {
      const aiResponse = await getAIResponse(messageData.content || 'Image sent', chatId)
      addMessage(chatId, aiResponse)
    } catch (error) {
      console.error('Error getting AI response:', error)
      toast.error('Failed to get AI response')
    } finally {
      setIsTyping(false)
    }
  }
  
  const loadMoreMessages = () => {
    if (messages.length > page * messagesPerPage) {
      setPage(prev => prev + 1)
    } else {
      setHasMore(false)
    }
  }
  
  const lastMessageRef = useInfiniteScroll(loadMoreMessages, hasMore, loading)
  
  if (!chatroom) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }
  
  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/dashboard')}
              className="flex items-center space-x-1"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </Button>
            <div>
              <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                {chatroom.title}
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {messages.length} messages
              </p>
            </div>
          </div>
          
          <DarkModeToggle />
        </div>
      </header>
      
      {/* Messages Container */}
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4"
      >
        {/* Load more indicator */}
        {hasMore && messages.length > messagesPerPage && (
          <div className="text-center py-2">
            <div className="inline-flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-600"></div>
              <span>Loading more messages...</span>
            </div>
          </div>
        )}
        
        {/* Messages */}
        {displayedMessages.map((message, index) => {
          if (index === 0 && hasMore) {
            return (
              <div key={message.id} ref={lastMessageRef}>
                <Message message={message} />
              </div>
            )
          }
          return <Message key={message.id} message={message} />
        })}
        
        {/* Typing indicator */}
        {isTyping && <TypingIndicator />}
        
        {/* Scroll anchor */}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Message Input */}
      <MessageInput 
        onSendMessage={handleSendMessage}
        disabled={isTyping}
      />
    </div>
  )
}

export default Chatroom 