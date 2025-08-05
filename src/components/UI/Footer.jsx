import React from 'react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'

const Footer = () => (
  <footer className="w-full fixed bottom-0 left-0 z-50 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 py-3 px-4 flex items-center justify-between shadow-sm">
    <span className="text-sm text-gray-600 dark:text-gray-300">
      Made by Utkarsh Patidar
    </span>
    <div className="flex space-x-4">
      <a
        href="https://github.com/Utkarssh11"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
        className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors text-xl"
      >
        <FaGithub />
      </a>
      <a
        href="https://www.linkedin.com/in/utkarsh-patidar-800081221/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
        className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors text-xl"
      >
        <FaLinkedin />
      </a>
    </div>
  </footer>
)

export default Footer