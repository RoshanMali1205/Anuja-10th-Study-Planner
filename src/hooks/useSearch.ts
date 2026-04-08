import { useMemo, useState } from 'react'

interface SearchableChapter {
  id: string
  subject: string
  section?: string
  title: string
  searchText: string
}

export function useSearch(chapters: SearchableChapter[]) {
  const [query, setQuery] = useState('')

  const results = useMemo(() => {
    if (!query.trim() || query.length < 2) return []
    const lower = query.toLowerCase()
    return chapters.filter(ch =>
      ch.title.toLowerCase().includes(lower) ||
      ch.searchText.toLowerCase().includes(lower)
    )
  }, [query, chapters])

  return { query, setQuery, results }
}

export type { SearchableChapter }
