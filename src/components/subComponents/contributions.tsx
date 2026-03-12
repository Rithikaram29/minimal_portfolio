import { useEffect, useState, useMemo } from "react"
import { GitHubCalendar } from "react-github-calendar"

type LeetCodeDay = {
  date: string
  count: number
  level: 0 | 1 | 2 | 3 | 4
}

type LeetCodeCalendarProps = {
  username: string
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function LeetCodeCalendar({ username }: LeetCodeCalendarProps) {
  const [days, setDays] = useState<LeetCodeDay[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const query = `
      query userProfileCalendar($username: String!, $year: Int) {
        matchedUser(username: $username) {
          userCalendar(year: $year) {
            submissionCalendar
          }
        }
      }
    `
    const year = new Date().getFullYear()

    fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables: { username, year } }),
    })
      .then(res => res.json())
      .then(data => {
        const calendar = JSON.parse(
          data.data.matchedUser.userCalendar.submissionCalendar
        ) as Record<string, number>

        const entries: LeetCodeDay[] = Object.entries(calendar).map(([ts, count]) => {
          const d = new Date(Number(ts) * 1000)
          const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
          let level: 0 | 1 | 2 | 3 | 4 = 0
          if (count >= 8) level = 4
          else if (count >= 5) level = 3
          else if (count >= 2) level = 2
          else if (count >= 1) level = 1
          return { date: dateStr, count, level }
        })

        setDays(entries)
        setLoading(false)
      })
      .catch(() => {
        setError(true)
        setLoading(false)
      })
  }, [username])

  const { weeks, monthLabels } = useMemo(() => {
    if (days.length === 0) return { weeks: [], monthLabels: [] }

    const now = new Date()
    const start = new Date(now)
    start.setDate(start.getDate() - 364)
    // Align to Sunday
    start.setDate(start.getDate() - start.getDay())

    const dayMap = new Map(days.map(d => [d.date, d]))

    const weeks: (LeetCodeDay | null)[][] = []
    const labels: { month: string; weekIndex: number }[] = []
    let lastMonth = -1
    const current = new Date(start)

    while (current <= now) {
      const week: (LeetCodeDay | null)[] = []
      for (let d = 0; d < 7; d++) {
        const dateStr = `${current.getFullYear()}-${String(current.getMonth() + 1).padStart(2, '0')}-${String(current.getDate()).padStart(2, '0')}`

        if (current > now) {
          week.push(null)
        } else {
          const entry = dayMap.get(dateStr)
          week.push(entry ?? { date: dateStr, count: 0, level: 0 })
        }

        if (current.getMonth() !== lastMonth && d === 0) {
          lastMonth = current.getMonth()
          labels.push({ month: MONTHS[lastMonth], weekIndex: weeks.length })
        }

        current.setDate(current.getDate() + 1)
      }
      weeks.push(week)
    }

    return { weeks, monthLabels: labels }
  }, [days])

  const levelColors = [
    'var(--bg-tertiary)',
    '#ffa1161a',
    '#ffa11650',
    '#ffa11690',
    '#ffa116',
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8 text-(--text-tertiary) text-sm">
        Loading LeetCode activity...
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-8 text-(--text-tertiary) text-sm">
        Unable to load LeetCode data.{' '}
        <a
          href={`https://leetcode.com/u/Rithika_29`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent ml-1 hover:underline"
        >
          View on LeetCode
        </a>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[700px]">
        {/* Month labels */}
        <div className="flex text-xs text-(--text-tertiary) mb-1 ml-8">
          {monthLabels.map((label, i) => (
            <span
              key={i}
              className="absolute"
              style={{ marginLeft: label.weekIndex * 14 }}
            >
              {label.month}
            </span>
          ))}
        </div>

        <div className="flex gap-0.5 mt-5">
          {/* Day labels */}
          <div className="flex flex-col gap-0.5 text-xs text-(--text-tertiary) mr-1 shrink-0">
            <span className="h-[10px]" />
            <span className="h-[10px] text-[10px] leading-[10px]">Mon</span>
            <span className="h-[10px]" />
            <span className="h-[10px] text-[10px] leading-[10px]">Wed</span>
            <span className="h-[10px]" />
            <span className="h-[10px] text-[10px] leading-[10px]">Fri</span>
            <span className="h-[10px]" />
          </div>

          {/* Grid */}
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-0.5">
              {week.map((day, di) => (
                <div
                  key={di}
                  className="w-[10px] h-[10px] rounded-[2px] transition-colors duration-200"
                  style={{
                    backgroundColor: day ? levelColors[day.level] : 'transparent',
                  }}
                  title={day ? `${day.date}: ${day.count} submission${day.count !== 1 ? 's' : ''}` : ''}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-end gap-1 mt-2 text-xs text-(--text-tertiary)">
          <span>Less</span>
          {levelColors.map((color, i) => (
            <div
              key={i}
              className="w-[10px] h-[10px] rounded-[2px]"
              style={{ backgroundColor: color }}
            />
          ))}
          <span>More</span>
        </div>
      </div>
    </div>
  )
}

function useDarkMode() {
  const [isDark, setIsDark] = useState(() =>
    document.documentElement.classList.contains('dark')
  )
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'))
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])
  return isDark
}

export const Contributions = () => {
  const isDark = useDarkMode()

  return (
    <div className="space-y-10">
      {/* GitHub */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <svg className="w-5 h-5 text-(--text-primary)" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
          <h3 className="text-sm font-semibold text-(--text-primary) font-heading uppercase tracking-wide">GitHub</h3>
          <a
            href="https://github.com/Rithikaram29"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-accent hover:underline ml-auto"
          >
            @Rithikaram29
          </a>
        </div>
        <div className="overflow-x-auto">
          <GitHubCalendar
            username="Rithikaram29"
            colorScheme={isDark ? 'dark' : 'light'}
            fontSize={12}
            blockSize={10}
            blockMargin={2}
          />
        </div>
      </div>

      {/* LeetCode */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <svg className="w-5 h-5 text-(--text-primary)" viewBox="0 0 24 24" fill="currentColor">
            <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l.842.655a1.378 1.378 0 0 0 1.913-.167 1.378 1.378 0 0 0-.165-1.913l-.842-.657a4.89 4.89 0 0 0-1.825-.858zM20.5 13.122a1.38 1.38 0 0 0-1.255.791 1.38 1.38 0 0 0 .283 1.528l.679.667a2.673 2.673 0 0 1 .076 3.722l-.042.042-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263.006-.177.033-.353.077-.525a2.545 2.545 0 0 1 .608-1.163l.038-.04 5.036-5.392c.004-.005.01-.008.014-.013a1.38 1.38 0 0 0-.069-1.949 1.378 1.378 0 0 0-1.949.069l-5.037 5.392-.038.04a5.272 5.272 0 0 0-1.243 2.137 5.357 5.357 0 0 0-.156.6 5.527 5.527 0 0 0 .07 2.368 5.833 5.833 0 0 0 .358 1.023 5.938 5.938 0 0 0 1.283 1.83l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392.042-.042a5.413 5.413 0 0 0-.148-7.59l-.679-.667a1.378 1.378 0 0 0-.697-.385z" />
          </svg>
          <h3 className="text-sm font-semibold text-(--text-primary) font-heading uppercase tracking-wide">LeetCode</h3>
          <a
            href="https://leetcode.com/u/Rithika_29"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-accent hover:underline ml-auto"
          >
            @Rithika_29
          </a>
        </div>
        <LeetCodeCalendar username="Rithika_29" />
      </div>
    </div>
  )
}
