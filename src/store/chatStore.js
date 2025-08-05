import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useChatStore = create(
  persist(
    (set, get) => ({
      chatrooms: [],
      messages: {},
      
      addChatroom: (chatroom) => {
        const { chatrooms } = get()
        const newChatroom = {
          id: Date.now().toString(),
          title: chatroom.title || `Chat ${chatrooms.length + 1}`,
          createdAt: new Date().toISOString(),
          lastMessage: null,
          ...chatroom
        }
        set({
          chatrooms: [newChatroom, ...chatrooms],
          messages: {
            ...get().messages,
            [newChatroom.id]: []
          }
        })
        return newChatroom
      },
      
      deleteChatroom: (chatId) => {
        const { chatrooms, messages } = get()
        const updatedChatrooms = chatrooms.filter(chat => chat.id !== chatId)
        const updatedMessages = { ...messages }
        delete updatedMessages[chatId]
        
        set({
          chatrooms: updatedChatrooms,
          messages: updatedMessages
        })
      },
      
      addMessage: (chatId, message) => {
        const { messages } = get()
        const chatMessages = messages[chatId] || []
        const newMessage = {
          id: Date.now().toString(),
          timestamp: new Date().toISOString(),
          ...message
        }
        
        set({
          messages: {
            ...messages,
            [chatId]: [...chatMessages, newMessage]
          }
        })
        
        // Update last message in chatroom
        const { chatrooms } = get()
        const updatedChatrooms = chatrooms.map(chat => 
          chat.id === chatId 
            ? { ...chat, lastMessage: newMessage.content || 'Image sent' }
            : chat
        )
        set({ chatrooms: updatedChatrooms })
        
        return newMessage
      },
      
      getMessages: (chatId) => {
        const { messages } = get()
        return messages[chatId] || []
      },
      
      getChatroom: (chatId) => {
        const { chatrooms } = get()
        return chatrooms.find(chat => chat.id === chatId)
      },
      
      searchChatrooms: (query) => {
        const { chatrooms } = get()
        if (!query) return chatrooms
        return chatrooms.filter(chat => 
          chat.title.toLowerCase().includes(query.toLowerCase())
        )
      }
    }),
    {
      name: 'chat-storage',
      partialize: (state) => ({ chatrooms: state.chatrooms, messages: state.messages })
    }
  )
) 