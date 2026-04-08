import { useState } from 'react'
import { ChevronDown, CheckCircle2, Circle, Bookmark, BookmarkCheck } from 'lucide-react'
import type { Chapter } from '../types'

interface Props {
  chapter: Chapter
  isCompleted: boolean
  isBookmarked: boolean
  onToggleComplete: () => void
  onToggleBookmark: () => void
  accentColor: string
  subjectId: string
}

// Light background + badge background per subject
const subjectStyles: Record<string, { headerBg: string; badgeBg: string; nameColor: string; marksBg: string; marksColor: string }> = {
  mathematics: { headerBg: '#E3F2FD', badgeBg: '#1565C0', nameColor: '#1565C0', marksBg: '#BBDEFB', marksColor: '#1565C0' },
  science: { headerBg: '#E8F5E9', badgeBg: '#2E7D32', nameColor: '#2E7D32', marksBg: '#C8E6C9', marksColor: '#2E7D32' },
  'social-science': { headerBg: '#FBE9E7', badgeBg: '#E65100', nameColor: '#E65100', marksBg: '#FFCCBC', marksColor: '#E65100' },
  english: { headerBg: '#F3E5F5', badgeBg: '#6A1B9A', nameColor: '#6A1B9A', marksBg: '#E1BEE7', marksColor: '#6A1B9A' },
  sanskrit: { headerBg: '#E0F2F1', badgeBg: '#00695C', nameColor: '#00695C', marksBg: '#B2DFDB', marksColor: '#00695C' },
}

export default function ChapterAccordion({
  chapter, isCompleted, isBookmarked,
  onToggleComplete, onToggleBookmark, accentColor, subjectId
}: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const styles = subjectStyles[subjectId] || subjectStyles.mathematics

  return (
    <div className={`chapter-card rounded-xl border overflow-hidden cursor-pointer ${
      isCompleted
        ? 'border-green-300 dark:border-green-800'
        : 'border-[#eee] dark:border-gray-700'
    }`}>
      {/* Color-coded header */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center px-3 py-2.5"
        style={{ backgroundColor: isCompleted ? '#E8F5E9' : styles.headerBg }}
      >
        {/* Complete toggle */}
        <button
          onClick={(e) => { e.stopPropagation(); onToggleComplete() }}
          className="shrink-0 mr-2"
          aria-label={isCompleted ? 'Mark incomplete' : 'Mark complete'}
        >
          {isCompleted
            ? <CheckCircle2 className="w-4 h-4 text-green-600" />
            : <Circle className="w-4 h-4" style={{ color: styles.badgeBg + '60' }} />
          }
        </button>

        {/* Chapter number badge */}
        <span
          className="text-[0.68rem] font-bold px-2 py-0.5 rounded-2xl text-white mr-2 shrink-0 whitespace-nowrap"
          style={{ backgroundColor: styles.badgeBg }}
        >
          Ch {chapter.number}
        </span>

        {/* Chapter name */}
        <span
          className={`font-semibold text-[0.83rem] flex-1 leading-snug ${isCompleted ? 'line-through opacity-60' : ''}`}
          style={{ color: isCompleted ? '#666' : styles.nameColor }}
        >
          {chapter.title}
        </span>

        {/* Marks badge */}
        {chapter.weightage && (
          <span
            className="text-[0.68rem] font-bold px-2 py-0.5 rounded-lg shrink-0 whitespace-nowrap ml-1"
            style={{ backgroundColor: styles.marksBg, color: styles.marksColor }}
          >
            {chapter.weightage}
          </span>
        )}

        {/* Bookmark */}
        <button
          onClick={(e) => { e.stopPropagation(); onToggleBookmark() }}
          className="shrink-0 ml-1.5"
          aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
        >
          {isBookmarked
            ? <BookmarkCheck className="w-4 h-4 text-yellow-500" />
            : <Bookmark className="w-4 h-4 text-gray-400" />
          }
        </button>

        {/* Arrow */}
        <ChevronDown
          className={`w-4 h-4 shrink-0 ml-1.5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          style={{ color: styles.badgeBg }}
        />
      </div>

      {/* Content */}
      {isOpen && (
        <div className="px-3 pb-3 pt-2 space-y-2.5 border-t border-[#f0f0f0] dark:border-gray-700 bg-white dark:bg-[#1e2237] animate-fade-in">
            {chapter.summary && (
              <ContentBlock title="📋 Summary" items={[chapter.summary]} />
            )}
            {chapter.topics.length > 0 && (
              <ContentBlock title="📚 Topics" items={chapter.topics} accentColor={accentColor} />
            )}
            {chapter.formulas && chapter.formulas.length > 0 && (
              <ContentBlock title="📐 Formulas" items={chapter.formulas} isCode />
            )}
            {chapter.equations && chapter.equations.length > 0 && (
              <ContentBlock title="⚗️ Equations" items={chapter.equations} isCode />
            )}
            {chapter.rules && chapter.rules.length > 0 && (
              <ContentBlock title="📏 Rules" items={chapter.rules} accentColor={accentColor} />
            )}
            {chapter.examples && chapter.examples.length > 0 && (
              <ContentBlock title="✏️ Examples" items={chapter.examples} isCode />
            )}
            {chapter.shlokas && chapter.shlokas.length > 0 && (
              <ContentBlock title="📜 Shlokas" items={chapter.shlokas} isCode />
            )}
            {chapter.meanings && chapter.meanings.length > 0 && (
              <ContentBlock title="📖 Meanings" items={chapter.meanings} accentColor={accentColor} />
            )}
            {chapter.diagrams && chapter.diagrams.length > 0 && (
              <ContentBlock title="🖼️ Important Diagrams" items={chapter.diagrams} accentColor={accentColor} />
            )}
            {chapter.dates && chapter.dates.length > 0 && (
              <ContentBlock title="📅 Important Dates" items={chapter.dates} accentColor={accentColor} />
            )}
            {chapter.timeline && chapter.timeline.length > 0 && (
              <ContentBlock title="⏳ Timeline" items={chapter.timeline} accentColor={accentColor} />
            )}
            {chapter.keywords && chapter.keywords.length > 0 && (
              <ContentBlock title="🔑 Keywords" items={chapter.keywords} accentColor={accentColor} />
            )}
            {chapter.importantQuestions && chapter.importantQuestions.length > 0 && (
              <ContentBlock title="⭐ Important Questions" items={chapter.importantQuestions} accentColor={accentColor} />
            )}
            {chapter.tips && chapter.tips.length > 0 && (
              <div className="tip-box">
                <strong className="text-[#E65100] text-xs">💡 Tips:</strong>
                <ul className="mt-1 space-y-0.5">
                  {chapter.tips.map((tip, i) => (
                    <li key={i} className="text-[0.78rem] text-gray-700 dark:text-gray-300">{tip}</li>
                  ))}
                </ul>
              </div>
            )}
        </div>
      )}
    </div>
  )
}

function ContentBlock({ title, items, isCode, accentColor }: {
  title: string, items: string[], isCode?: boolean, accentColor?: string
}) {
  return (
    <div>
      <h4 className="text-[0.7rem] font-heading font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
        {title}
      </h4>
      <ul className="space-y-0.5">
        {items.map((item, i) => (
          <li key={i} className={`text-[0.8rem] ${
            isCode
              ? 'font-mono bg-gray-50 dark:bg-gray-800 px-2 py-1 rounded text-[0.75rem] border border-gray-100 dark:border-gray-700'
              : 'text-gray-600 dark:text-gray-300 pl-4 relative border-b border-dashed border-[#f5f0f0] dark:border-gray-700 py-0.5 leading-snug'
          }`}>
            {!isCode && (
              <span className="absolute left-0 text-[0.52rem] top-[7px]" style={{ color: accentColor || '#FF6B35' }}>✦</span>
            )}
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
