import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useUIStore = create(
  persist(
    (set) => ({
      darkMode: false,
      toggleDarkMode: () => {
        set((state) => ({ darkMode: !state.darkMode }))
        const isDark = !document.documentElement.classList.contains('dark')
        if (isDark) {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
      },
      
      initializeDarkMode: () => {
        const { darkMode } = useUIStore.getState()
        if (darkMode) {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
      }
    }),
    {
      name: 'ui-storage',
      partialize: (state) => ({ darkMode: state.darkMode })
    }
  )
) 
