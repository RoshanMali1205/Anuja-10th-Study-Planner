import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Search, Moon, Sun, X, Bookmark } from 'lucide-react'
import WeeklyTimetable from './WeeklyTimetable'
import { useTheme } from '../hooks/useTheme'
import { useProgress } from '../hooks/useProgress'
import { useBookmarks } from '../hooks/useBookmarks'
import { useSearch } from '../hooks/useSearch'
import type { Subject } from '../types'
import type { SearchableChapter } from '../hooks/useSearch'

interface Props {
  subjects: Subject[]
}

const subjectGradients: Record<string, string> = {
  mathematics: 'from-[#1565C0] to-[#0D47A1]',
  science: 'from-[#2E7D32] to-[#1B5E20]',
  'social-science': 'from-[#E65100] to-[#BF360C]',
  english: 'from-[#6A1B9A] to-[#4A148C]',
  sanskrit: 'from-[#00695C] to-[#004D40]',
}

const subjectBgColors: Record<string, string> = {
  mathematics: '#E3F2FD',
  science: '#E8F5E9',
  'social-science': '#FBE9E7',
  english: '#F3E5F5',
  sanskrit: '#E0F2F1',
}

export default function HomePage({ subjects }: Props) {
  const { isDark, toggleTheme } = useTheme()
  const { getSubjectProgress, getCompletedCount } = useProgress()
  const { bookmarks } = useBookmarks()
  const [showSearch, setShowSearch] = useState(false)

  // Build searchable index
  const allChapters: SearchableChapter[] = useMemo(() => {
    const chapters: SearchableChapter[] = []
    subjects.forEach(sub => {
      const addChapter = (ch: { id: string; title: string; topics: string[]; formulas?: string[]; keywords?: string[] }, section?: string) => {
        chapters.push({
          id: ch.id,
          subject: sub.name,
          section,
          title: ch.title,
          searchText: [ch.title, ...(ch.topics || []), ...(ch.formulas || []), ...(ch.keywords || [])].join(' ')
        })
      }
      if (sub.sections) {
        sub.sections.forEach(sec => sec.chapters.forEach(ch => addChapter(ch, sec.title)))
      } else if (sub.chapters) {
        sub.chapters.forEach(ch => addChapter(ch))
      }
    })
    return chapters
  }, [subjects])

  const { query, setQuery, results } = useSearch(allChapters)

  // Exam countdown
  const examDate = new Date('2027-02-15')
  const today = new Date()
  const daysLeft = Math.max(0, Math.ceil((examDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)))

  // Overall stats
  const allChapterIds = useMemo(() => {
    return subjects.flatMap(sub => {
      if (sub.sections) return sub.sections.flatMap(sec => sec.chapters.map(ch => ch.id))
      return (sub.chapters ?? []).map(ch => ch.id)
    })
  }, [subjects])

  const totalProgress = getSubjectProgress(allChapterIds)
  const totalCompleted = getCompletedCount(allChapterIds)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden hero-gradient px-5 pt-6 pb-12 text-center">
        {/* Decorative floating elements */}
        <div className="hero-circle-1" />
        <div className="hero-circle-2" />
        <span className="hero-float hero-float-1">✨</span>
        <span className="hero-float hero-float-2">💖</span>
        <span className="hero-float hero-float-3">⭐</span>
        <span className="hero-float hero-float-4">🌸</span>
        <span className="hero-float hero-float-5">✿</span>
        
        {/* Top bar */}
        <div className="relative z-10 flex items-center justify-between mb-4">
          <button
            onClick={() => setShowSearch(true)}
            className="p-2 rounded-full bg-white/15 hover:bg-white/25 transition-colors backdrop-blur-sm"
            aria-label="Search"
          >
            <Search className="w-5 h-5 text-white" />
          </button>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-white/15 hover:bg-white/25 transition-colors backdrop-blur-sm"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="w-5 h-5 text-white" /> : <Moon className="w-5 h-5 text-white" />}
          </button>
        </div>

        <div className="relative z-10">
          <span className="inline-block bg-white/20 backdrop-blur-sm text-white px-4 py-1 rounded-full text-xs font-medium mb-3 border border-white/20">
            🏫 CBSE Class X • 2025-26
          </span>
          <h1 className="font-heading text-2xl md:text-3xl text-white font-extrabold leading-tight mb-1">
            Anuja's Study Planner
          </h1>
          <p className="text-white/70 text-lg mb-1">📚 ✨ 🌸</p>
          <p className="text-white/85 text-sm mb-5">
            Complete Chapter-wise Study Guide • Click any chapter to learn!
          </p>

          {/* Score Jump Badge */}
          <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm border border-white/30 px-5 py-2.5 rounded-full text-white font-heading font-bold text-base shadow-lg">
            <span>9th: 60%</span>
            <span>💫</span>
            <span>10th: 85%</span>
          </div>
        </div>
      </div>

      <div className="max-w-[940px] mx-auto px-3.5 pb-16">
        {/* Stats Section */}
        <div className="grid grid-cols-3 gap-3 -mt-6 relative z-10 mb-6">
          <div className="warm-card rounded-2xl p-4 text-center">
            <p className="text-3xl font-heading font-bold text-[#E91E8C]">{daysLeft}</p>
            <p className="text-xs text-gray-500 mt-0.5">Days to Exam</p>
          </div>
          <div className="warm-card rounded-2xl p-4 text-center">
            <p className="text-3xl font-heading font-bold" style={{ color: totalProgress > 70 ? '#27AE60' : totalProgress > 40 ? '#E65100' : '#C0392B' }}>
              {totalProgress}%
            </p>
            <p className="text-xs text-gray-500 mt-0.5">Progress</p>
          </div>
          <div className="warm-card rounded-2xl p-4 text-center">
            <p className="text-3xl font-heading font-bold text-[#1565C0]">{totalCompleted}</p>
            <p className="text-xs text-gray-500 mt-0.5">of {allChapterIds.length} Done</p>
          </div>
        </div>

        {/* Problems Section */}
        <h2 className="font-heading font-bold text-lg text-[#1A1A2E] dark:text-white flex items-center gap-2 mb-3">
          <span className="w-8 h-8 rounded-lg bg-[#FCE4EC] flex items-center justify-center text-sm">⚠️</span>
          Common Problems — Solutions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4">
          {[
            { icon: '🔄', problem: 'Consistency problem in studies', solution: 'Fix 30 min daily routine for each subject' },
            { icon: '📅', problem: "Can't remember History dates", solution: 'Use Story + Timeline method' },
            { icon: '🧠', problem: "Forget what I've studied", solution: 'Revision: 1 day \u2192 1 week \u2192 1 month' },
            { icon: '💪', problem: 'Hard to maintain confidence', solution: 'Victory Diary + small daily goals' },
          ].map((item, i) => (
            <div key={i} className="warm-card rounded-xl p-3 flex gap-2 border-l-4 border-l-[#E91E8C]">
              <span className="text-lg shrink-0">{item.icon}</span>
              <div>
                <p className="text-[0.82rem] font-medium leading-snug">{item.problem}</p>
                <p className="text-xs text-[#27AE60] font-medium mt-0.5">✅ {item.solution}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-[#FCE4EC] dark:bg-[#3d2035] border border-[#F48FB1] border-l-4 border-l-[#E91E8C] rounded-xl px-3.5 py-3 text-[0.82rem] mb-6">
          <strong className="text-[#C2185B]">🌟 Remember:</strong> You're already capable! Just <strong>strategy + consistency</strong> — 85% is guaranteed!
        </div>

        {/* Subject Navigation */}
        <h2 className="font-heading font-bold text-lg text-[#1A1A2E] dark:text-white flex items-center gap-2 mb-3">
          <span className="w-8 h-8 rounded-lg bg-[#F3E5F5] flex items-center justify-center text-sm">📖</span>
          Choose Your Subject
        </h2>
        <div className="warm-card rounded-2xl p-3.5 mb-6">
          <p className="font-heading text-xs text-gray-400 text-center mb-3 font-medium">
            👇 Click on any subject to start studying
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {subjects.map(subject => {
              const chapterIds = subject.sections
                ? subject.sections.flatMap(s => s.chapters.map(c => c.id))
                : (subject.chapters ?? []).map(c => c.id)
              const progress = getSubjectProgress(chapterIds)
              const completed = getCompletedCount(chapterIds)
              const gradient = subjectGradients[subject.id] || 'from-gray-600 to-gray-800'
              const bgColor = subjectBgColors[subject.id] || '#f0f0f0'

              return (
                <Link
                  key={subject.id}
                  to={`/subject/${subject.id}`}
                  className="group relative rounded-2xl overflow-hidden hover:shadow-lg hover:scale-[1.03] active:scale-[0.98] transition-all duration-200"
                  style={{ backgroundColor: bgColor }}
                >
                  {/* Top gradient stripe */}
                  <div className={`bg-gradient-to-r ${gradient} h-2`} />
                  <div className="p-3.5 text-center">
                    <div className="text-3xl mb-1">{subject.icon}</div>
                    <h3 className="font-heading font-bold text-sm" style={{ color: subject.color }}>
                      {subject.name}
                    </h3>
                    <p className="text-[0.7rem] text-gray-500 mt-0.5">{completed}/{chapterIds.length} chapters</p>
                    {/* Progress bar */}
                    <div className="mt-2 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: `${subject.color}20` }}>
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${progress}%`, backgroundColor: subject.color }}
                      />
                    </div>
                    <p className="text-[0.7rem] font-bold mt-1" style={{ color: subject.color }}>{progress}%</p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Weekly Timetable */}
        <WeeklyTimetable />

        {/* Bookmarked count */}
        {bookmarks.length > 0 && (
          <div className="warm-card rounded-xl p-3 flex items-center gap-2 mb-6">
            <span className="text-lg">⭐</span>
            <span className="text-sm text-gray-600 dark:text-gray-300">
              You have <strong className="text-[#E91E8C]">{bookmarks.length}</strong> bookmarked chapter{bookmarks.length !== 1 ? 's' : ''}
            </span>
          </div>
        )}

        {/* Study Tips */}
        <div className="tips-section rounded-2xl p-4 mb-6">
          <h3 className="font-heading font-bold text-[0.92rem] text-[#27AE60] mb-3">🎯 Daily Study Tips</h3>
          {[
            'Study 3 hours daily with focused attention \u2014 quality over quantity!',
            'Maths must be practiced EVERY day \u2014 minimum 5 problems.',
            'Science diagrams should be drawn and labeled \u2014 4 marks guaranteed!',
            'Weekly revision: What you studied this week, revise on Sunday.',
          ].map((tip, i) => (
            <div key={i} className="flex gap-2 mb-1.5 items-start text-[0.84rem]">
              <span className="w-5 h-5 bg-[#27AE60] text-white rounded-full flex items-center justify-center text-[0.62rem] font-bold shrink-0 mt-0.5">
                {i + 1}
              </span>
              <span>{tip}</span>
            </div>
          ))}
        </div>

        {/* Motivation Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-[#1A1A2E] to-[#16213E] rounded-2xl p-6 text-center mb-6">
          <span className="absolute -top-2 -right-2 text-[6rem] opacity-5">⭐</span>
          <h3 className="font-heading text-[#FFB347] text-xl font-bold mb-2">✨ Remember This ✨</h3>
          <p className="text-white/80 text-[0.86rem] leading-relaxed">
            The difference between 60% and 85% is just <strong className="text-[#FFB347]">one good habit</strong>.<br />
            3 hours focused study + weekly revision + positive attitude \u2014<br />
            <strong className="text-[#FFB347]">these three things will get you to 85%!</strong>
          </p>
          <div className="inline-block mt-4 bg-[rgba(255,179,71,0.15)] border border-[rgba(255,179,71,0.4)] text-[#FFB347] px-4 py-1.5 rounded-full font-heading font-semibold text-sm">
            🏆 "Hard work always pays off!" 🏆
          </div>
        </div>

        {/* Exam Day Tips */}
        <h2 className="font-heading font-bold text-lg text-[#1A1A2E] dark:text-white flex items-center gap-2 mb-3">
          <span className="w-8 h-8 rounded-lg bg-[#D5F5E3] flex items-center justify-center text-sm">✍️</span>
          Exam Day Quick Tips
        </h2>
        <div className="warm-card rounded-2xl p-4 mb-6">
          <ul className="space-y-1.5">
            {[
              'First 15 minutes \u2014 read the question paper carefully. No rush!',
              'Solve easy questions first \u2014 builds confidence, saves time',
              'Maths numericals \u2014 write steps clearly, always mention units',
              'Science Biology \u2014 labeled diagrams = guaranteed marks',
              'SST long answers \u2014 Introduction + 4-5 points + Conclusion',
              "Don't know the answer? \u2014 Never leave it blank! Write what you know",
              '3 hours = 15 min reading + 2:15 writing + 15 min revision',
            ].map((tip, i) => (
              <li key={i} className="flex gap-2 items-start text-[0.84rem] border-b border-dashed border-[#F8BBD0] last:border-0 pb-1.5">
                <span className="text-[0.72rem] mt-0.5">✅</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer */}
        <footer className="text-center text-xs text-gray-400 mt-8">
          <p>� Made with love for Anuja's Board Exam preparation</p>
          <p className="mt-1"><strong className="text-gray-600 dark:text-gray-300">CBSE Class X • 2025-26</strong></p>
          <p className="mt-1">Mathematics · Science · Social Science · English · Sanskrit</p>
        </footer>
      </div>

      {/* Search Modal */}
      {showSearch && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" onClick={() => setShowSearch(false)}>
          <div
            className="warm-card m-4 mt-16 rounded-2xl max-w-lg mx-auto max-h-[70vh] flex flex-col shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 p-4 border-b border-[#F8BBD0]">
              <Search className="w-5 h-5 text-[#E91E8C]" />
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search chapters, topics, formulas..."
                className="flex-1 bg-transparent outline-none text-sm"
                autoFocus
              />
              <button onClick={() => setShowSearch(false)}>
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <div className="overflow-y-auto flex-1 p-2">
              {results.length > 0 ? results.map(r => (
                <Link
                  key={r.id}
                  to={`/subject/${r.id.split('-')[0]}`}
                  onClick={() => setShowSearch(false)}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#FFF0F5]"
                >
                  <Bookmark className="w-4 h-4 text-[#E91E8C] shrink-0" />
                  <div>
                    <p className="text-sm font-medium">{r.title}</p>
                    <p className="text-xs text-gray-500">{r.subject}{r.section ? ` \u203A ${r.section}` : ''}</p>
                  </div>
                </Link>
              )) : query.length >= 2 ? (
                <p className="text-center text-gray-400 text-sm py-8">No results found</p>
              ) : (
                <p className="text-center text-gray-400 text-sm py-8">Type at least 2 characters to search</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
