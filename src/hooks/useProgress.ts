import { useLocalStorage } from './useLocalStorage'

export function useProgress() {
  const [completedChapters, setCompletedChapters] = useLocalStorage<string[]>('completed-chapters', [])

  const toggleChapter = (chapterId: string) => {
    setCompletedChapters(prev =>
      prev.includes(chapterId)
        ? prev.filter(id => id !== chapterId)
        : [...prev, chapterId]
    )
  }

  const isCompleted = (chapterId: string) => completedChapters.includes(chapterId)

  const getSubjectProgress = (chapterIds: string[]) => {
    if (chapterIds.length === 0) return 0
    const completed = chapterIds.filter(id => completedChapters.includes(id)).length
    return Math.round((completed / chapterIds.length) * 100)
  }

  const getCompletedCount = (chapterIds: string[]) => {
    return chapterIds.filter(id => completedChapters.includes(id)).length
  }

  return { completedChapters, toggleChapter, isCompleted, getSubjectProgress, getCompletedCount }
}
