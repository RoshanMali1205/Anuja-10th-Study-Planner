import { useLocalStorage } from './useLocalStorage'
import { useEffect } from 'react'

export function useTheme() {
  const [isDark, setIsDark] = useLocalStorage('theme-dark', false)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
  }, [isDark])

  const toggleTheme = () => setIsDark(prev => !prev)

  return { isDark, toggleTheme }
}
