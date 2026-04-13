import { Clock, Sunrise, Sunset } from 'lucide-react'

interface TimeSlot {
  subject: string
  icon: string
  color: string
}

interface DaySchedule {
  day: string
  shortDay: string
  morning: TimeSlot
  evening: TimeSlot
}

const schedule: DaySchedule[] = [
  {
    day: 'Monday', shortDay: 'Mon',
    morning: { subject: 'Mathematics', icon: '📐', color: '#1565C0' },
    evening: { subject: 'Science', icon: '🔬', color: '#2E7D32' },
  },
  {
    day: 'Tuesday', shortDay: 'Tue',
    morning: { subject: 'Science', icon: '🔬', color: '#2E7D32' },
    evening: { subject: 'Social Science', icon: '🌍', color: '#E65100' },
  },
  {
    day: 'Wednesday', shortDay: 'Wed',
    morning: { subject: 'English', icon: '📝', color: '#6A1B9A' },
    evening: { subject: 'Mathematics', icon: '📐', color: '#1565C0' },
  },
  {
    day: 'Thursday', shortDay: 'Thu',
    morning: { subject: 'Social Science', icon: '🌍', color: '#E65100' },
    evening: { subject: 'Science', icon: '🔬', color: '#2E7D32' },
  },
  {
    day: 'Friday', shortDay: 'Fri',
    morning: { subject: 'Mathematics', icon: '📐', color: '#1565C0' },
    evening: { subject: 'Sanskrit', icon: '📜', color: '#00695C' },
  },
  {
    day: 'Saturday', shortDay: 'Sat',
    morning: { subject: 'Science', icon: '🔬', color: '#2E7D32' },
    evening: { subject: 'English', icon: '📝', color: '#6A1B9A' },
  },
  {
    day: 'Sunday', shortDay: 'Sun',
    morning: { subject: 'Revision', icon: '🔄', color: '#E91E8C' },
    evening: { subject: 'Revision', icon: '🔄', color: '#E91E8C' },
  },
]

const todayIndex = new Date().getDay()
// getDay() returns 0=Sun, convert to Mon=0 based
const todayScheduleIndex = todayIndex === 0 ? 6 : todayIndex - 1

export default function WeeklyTimetable() {
  return (
    <div>
      <h2 className="font-heading font-bold text-lg text-[#1A1A2E] dark:text-white flex items-center gap-2 mb-3">
        <span className="w-8 h-8 rounded-lg bg-[#F3E5F5] flex items-center justify-center text-sm">🗓️</span>
        Weekly Study Timetable
      </h2>

      <div className="warm-card rounded-2xl overflow-hidden mb-6">
        {/* Header */}
        <div className="grid grid-cols-[1fr_1.5fr_1.5fr] bg-gradient-to-r from-[#E91E8C] to-[#C2185B] text-white text-xs font-heading font-bold">
          <div className="px-3 py-2.5 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" /> Day
          </div>
          <div className="px-3 py-2.5 flex items-center gap-1.5 border-l border-white/20">
            <Sunrise className="w-3.5 h-3.5" /> Morning
            <span className="font-normal text-white/70 text-[0.6rem] ml-auto hidden sm:block">6:00 – 8:00 AM</span>
          </div>
          <div className="px-3 py-2.5 flex items-center gap-1.5 border-l border-white/20">
            <Sunset className="w-3.5 h-3.5" /> Evening
            <span className="font-normal text-white/70 text-[0.6rem] ml-auto hidden sm:block">5:00 – 7:00 PM</span>
          </div>
        </div>

        {/* Time labels for mobile */}
        <div className="grid grid-cols-[1fr_1.5fr_1.5fr] sm:hidden text-[0.6rem] text-gray-400 dark:text-gray-500 font-medium bg-gray-50 dark:bg-[#1e2237]">
          <div className="px-3 py-1" />
          <div className="px-3 py-1 border-l border-[#F8BBD0] dark:border-gray-700">6:00 – 8:00 AM</div>
          <div className="px-3 py-1 border-l border-[#F8BBD0] dark:border-gray-700">5:00 – 7:00 PM</div>
        </div>

        {/* Rows */}
        {schedule.map((day, i) => {
          const isToday = i === todayScheduleIndex
          return (
            <div
              key={day.day}
              className={`grid grid-cols-[1fr_1.5fr_1.5fr] border-t text-sm ${
                isToday
                  ? 'bg-[#FCE4EC] dark:bg-[#3d2035] border-t-[#F48FB1]'
                  : 'border-t-[#F8BBD0] dark:border-t-gray-700 even:bg-[#FFFAFC] dark:even:bg-[#1e2237]'
              }`}
            >
              {/* Day column */}
              <div className={`px-3 py-2.5 font-heading font-bold text-[0.82rem] flex items-center gap-1.5 ${
                isToday ? 'text-[#E91E8C]' : 'text-gray-700 dark:text-gray-300'
              }`}>
                <span className="hidden sm:inline">{day.day}</span>
                <span className="sm:hidden">{day.shortDay}</span>
                {isToday && (
                  <span className="text-[0.55rem] bg-[#E91E8C] text-white px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                    Today
                  </span>
                )}
              </div>

              {/* Morning */}
              <div className="px-3 py-2.5 border-l border-[#F8BBD0] dark:border-gray-700 flex items-center gap-2">
                <span className="text-base">{day.morning.icon}</span>
                <span
                  className="text-[0.8rem] font-semibold"
                  style={{ color: day.morning.color }}
                >
                  {day.morning.subject}
                </span>
              </div>

              {/* Evening */}
              <div className="px-3 py-2.5 border-l border-[#F8BBD0] dark:border-gray-700 flex items-center gap-2">
                <span className="text-base">{day.evening.icon}</span>
                <span
                  className="text-[0.8rem] font-semibold"
                  style={{ color: day.evening.color }}
                >
                  {day.evening.subject}
                </span>
              </div>
            </div>
          )
        })}

        {/* Footer note */}
        <div className="px-3 py-2.5 bg-[#FFF0F5] dark:bg-[#2a2540] border-t border-[#F8BBD0] dark:border-gray-700 text-[0.72rem] text-gray-500 dark:text-gray-400 text-center">
          💡 <strong>Tip:</strong> Morning = Fresh topics &amp; problem solving • Evening = Revision &amp; reading • Sunday = Full revision day
        </div>
      </div>
    </div>
  )
}
