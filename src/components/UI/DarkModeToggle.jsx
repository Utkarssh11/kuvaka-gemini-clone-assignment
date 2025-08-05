import React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useUIStore } from '../../store/uiStore'

const DarkModeToggle = () => {
  const { darkMode, toggleDarkMode } = useUIStore()

  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded-lg bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors duration-200"
      aria-label="Toggle dark mode"
    >
      {darkMode ? (
        <Sun className="h-5 w-5 text-yellow-500" />
      ) : (
        <Moon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
      )}
    </button>
  )
}

export default DarkModeToggle 