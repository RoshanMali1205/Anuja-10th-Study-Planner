import { useLocalStorage } from './useLocalStorage'

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useLocalStorage<string[]>('bookmarked-chapters', [])

  const toggleBookmark = (chapterId: string) => {
    setBookmarks(prev =>
      prev.includes(chapterId)
        ? prev.filter(id => id !== chapterId)
        : [...prev, chapterId]
    )
  }

  const isBookmarked = (chapterId: string) => bookmarks.includes(chapterId)

  return { bookmarks, toggleBookmark, isBookmarked }
}
