import { useState, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, BookOpen } from 'lucide-react'
import ChapterAccordion from './ChapterAccordion'
import { useProgress } from '../hooks/useProgress'
import { useBookmarks } from '../hooks/useBookmarks'
import type { Subject } from '../types'

interface Props {
  subjects: Subject[]
}

const panelHeaderClass: Record<string, string> = {
  mathematics: 'panel-header-math',
  science: 'panel-header-science',
  'social-science': 'panel-header-social',
  english: 'panel-header-english',
  sanskrit: 'panel-header-sanskrit',
}

export default function SubjectPage({ subjects }: Props) {
  const { subjectId } = useParams<{ subjectId: string }>()
  const subject = subjects.find(s => s.id === subjectId)
  const { isCompleted, toggleChapter, getSubjectProgress, getCompletedCount } = useProgress()
  const { isBookmarked, toggleBookmark } = useBookmarks()
  const [activeTab, setActiveTab] = useState(0)

  if (!subject) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <BookOpen className="w-16 h-16 text-gray-300" />
        <p className="text-gray-500">Subject not found</p>
        <Link to="/" className="text-[#FF6B35] font-heading font-bold">← Back to Home</Link>
      </div>
    )
  }

  const hasSections = !!subject.sections && subject.sections.length > 0
  const currentChapters = hasSections
    ? subject.sections![activeTab]?.chapters ?? []
    : subject.chapters ?? []

  const allChapterIds = useMemo(() => {
    if (hasSections) {
      return subject.sections!.flatMap(s => s.chapters.map(c => c.id))
    }
    return (subject.chapters ?? []).map(c => c.id)
  }, [subject, hasSections])

  const progress = getSubjectProgress(allChapterIds)
  const completedCount = getCompletedCount(allChapterIds)
  const headerClass = panelHeaderClass[subject.id] || 'panel-header-math'

  return (
    <div className="min-h-screen pb-8">
      {/* Back button bar */}
      <div className="sticky top-0 z-30 bg-[#FFF8F3]/80 dark:bg-[#1a1a2e]/80 backdrop-blur-lg border-b border-[#FFE0CC] dark:border-gray-800">
        <div className="max-w-[940px] mx-auto px-3.5 py-2.5 flex items-center gap-2">
          <Link to="/" className="p-1.5 -ml-1 rounded-lg hover:bg-[#FFE0CC] dark:hover:bg-gray-800 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <span className="font-heading font-bold text-sm truncate">{subject.icon} {subject.name}</span>
          <span className="ml-auto text-xs font-heading font-bold" style={{ color: subject.color }}>{progress}%</span>
        </div>
      </div>

      <div className="max-w-[940px] mx-auto px-3.5 mt-4">
        {/* Subject Panel Header */}
        <div className={`${headerClass} rounded-t-2xl px-5 py-4 flex items-center gap-3`}>
          <span className="text-4xl">{subject.icon}</span>
          <div className="flex-1 min-w-0">
            <h1 className="font-heading text-white font-extrabold text-xl truncate">{subject.name}</h1>
            <p className="text-white/75 text-xs mt-0.5">
              {completedCount}/{allChapterIds.length} chapters completed
            </p>
          </div>
          <div className="bg-white/20 text-white px-3 py-1 rounded-full text-xs font-heading font-bold whitespace-nowrap">
            Target: 90+
          </div>
        </div>

        {/* Subject Panel Body */}
        <div className="warm-card border-t-0 rounded-t-none rounded-b-2xl p-4">
          {/* Progress bar */}
          <div className="mb-4">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-500">Progress</span>
              <span className="font-heading font-bold" style={{ color: subject.color }}>{progress}%</span>
            </div>
            <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: `${subject.color}20` }}>
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${progress}%`, backgroundColor: subject.color }}
              />
            </div>
          </div>

          {/* Section tabs */}
          {hasSections && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {subject.sections!.map((section, idx) => (
                <button
                  key={section.id}
                  onClick={() => setActiveTab(idx)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-heading font-semibold whitespace-nowrap border transition-all ${
                    activeTab === idx
                      ? 'text-white border-transparent'
                      : 'text-gray-500 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 hover:border-gray-300'
                  }`}
                  style={activeTab === idx ? { backgroundColor: subject.color } : undefined}
                >
                  {section.title} ({section.chapters.length})
                </button>
              ))}
            </div>
          )}

          {/* Chapters Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 items-start animate-fade-in">
            {currentChapters.map(chapter => (
              <ChapterAccordion
                key={chapter.id}
                chapter={chapter}
                isCompleted={isCompleted(chapter.id)}
                isBookmarked={isBookmarked(chapter.id)}
                onToggleComplete={() => toggleChapter(chapter.id)}
                onToggleBookmark={() => toggleBookmark(chapter.id)}
                accentColor={subject.color}
                subjectId={subject.id}
              />
            ))}
          </div>
          {currentChapters.length === 0 && (
            <p className="text-center text-gray-400 py-12 font-heading">No chapters available</p>
          )}
        </div>
      </div>
    </div>
  )
}
