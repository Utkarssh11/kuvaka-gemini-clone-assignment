import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Plus, Search, Trash2, MessageSquare, LogOut } from 'lucide-react'
import { useAuthStore } from '../store/authStore'
import { useChatStore } from '../store/chatStore'
import { useUIStore } from '../store/uiStore'
import { useDebounce } from '../hooks/useDebounce'
import { chatroomSchema } from '../utils/validation'
import Button from '../components/UI/Button'
import Input from '../components/UI/Input'
import DarkModeToggle from '../components/UI/DarkModeToggle'

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newChatTitle, setNewChatTitle] = useState('')
  const [creating, setCreating] = useState(false)
  const navigate = useNavigate()
  
  const { user, logout } = useAuthStore()
  const { chatrooms, addChatroom, deleteChatroom, searchChatrooms } = useChatStore()
  const { initializeDarkMode } = useUIStore()
  
  const debouncedSearch = useDebounce(searchQuery, 300)
  const filteredChatrooms = searchChatrooms(debouncedSearch)

  React.useEffect(() => {
    initializeDarkMode()
  }, [initializeDarkMode])

  const handleCreateChat = async (e) => {
    e.preventDefault()
    if (!newChatTitle.trim()) return

    try {
      const validatedData = chatroomSchema.parse({ title: newChatTitle })
      setCreating(true)
      const newChat = addChatroom(validatedData)
      toast.success('Chatroom created successfully!')
      setNewChatTitle('')
      setShowCreateForm(false)
      navigate(`/chat/${newChat.id}`)
    } catch (error) {
      toast.error(error.errors?.[0]?.message || 'Invalid chat title')
    } finally {
      setCreating(false)
    }
  }

  const handleDeleteChat = (chatId, chatTitle) => {
    if (window.confirm(`Are you sure you want to delete "${chatTitle}"?`)) {
      deleteChatroom(chatId)
      toast.success('Chatroom deleted successfully!')
    }
  }

  const handleLogout = () => {
    logout()
    toast.success('Logged out successfully!')
    navigate('/login')
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now - date)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 1) return 'Today'
    if (diffDays === 2) return 'Yesterday'
    if (diffDays <= 7) return `${diffDays - 1} days ago`
    return date.toLocaleDateString()
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                Gemini Clone
              </h1>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Welcome, {user?.name}
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <DarkModeToggle />
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="flex items-center space-x-1"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Your Chats
          </h2>
          <Button
            onClick={() => setShowCreateForm(true)}
            className="flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>New Chat</span>
          </Button>
        </div>

        {}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            placeholder="Search chats..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {}
        {showCreateForm && (
          <div className="card p-6 mb-6">
            <form onSubmit={handleCreateChat} className="space-y-4">
              <Input
                label="Chat Title"
                placeholder="Enter chat title..."
                value={newChatTitle}
                onChange={(e) => setNewChatTitle(e.target.value)}
                maxLength={50}
              />
              <div className="flex space-x-3">
                <Button
                  type="submit"
                  loading={creating}
                  disabled={!newChatTitle.trim()}
                >
                  Create Chat
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowCreateForm(false)
                    setNewChatTitle('')
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        )}

        {}
        {filteredChatrooms.length === 0 ? (
          <div className="text-center py-12">
            <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
              No chats found
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {searchQuery ? 'Try adjusting your search terms.' : 'Get started by creating a new chat.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredChatrooms.map((chat) => (
              <div
                key={chat.id}
                className="card p-4 hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                onClick={() => navigate(`/chat/${chat.id}`)}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white truncate">
                      {chat.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {chat.lastMessage || 'No messages yet'}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                      {formatDate(chat.createdAt)}
                    </p>
                  </div>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDeleteChat(chat.id, chat.title)
                    }}
                    className="ml-2 p-1 text-gray-400 hover:text-red-500 transition-colors duration-200"
                    title="Delete chat"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

export default Dashboard 
