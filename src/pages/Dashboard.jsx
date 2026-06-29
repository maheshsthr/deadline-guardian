import { useMemo } from 'react'
import { ListChecks, AlertTriangle, CheckCircle, Clock, TrendingUp, Calendar, Target } from 'lucide-react'
import { useData } from '../context/DataContext'
import { useAuth } from '../context/AuthContext'

export default function Dashboard() {
  const { tasks } = useData()
  const { user } = useAuth()

  const stats = useMemo(() => {
    const total = tasks.length
    const completed = tasks.filter((t) => t.status === 'completed').length
    const pending = tasks.filter((t) => t.status === 'pending').length
    const highRisk = tasks.filter((t) => t.riskScore >= 70 && t.status !== 'completed').length
    const rate = total ? Math.round((completed / total) * 100) : 0
    return { total, completed, pending, highRisk, rate }
  }, [tasks])

  const upcomingDeadlines = useMemo(() => {
    return [...tasks]
      .filter((t) => t.status !== 'completed')
      .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
      .slice(0, 5)
  }, [tasks])

  const highRiskTasks = useMemo(() => {
    return tasks.filter((t) => t.riskScore >= 70 && t.status !== 'completed')
  }, [tasks])

  const getRiskColor = (score) => {
    if (score >= 70) return 'bg-red-50 text-red-600'
    if (score >= 40) return 'bg-yellow-50 text-yellow-600'
    return 'bg-green-50 text-green-600'
  }

  const getRiskLabel = (score) => {
    if (score >= 70) return 'High'
    if (score >= 40) return 'Medium'
    return 'Low'
  }

  const getPriorityColor = (p) => {
    switch (p) {
      case 'High': return 'text-red-600 bg-red-50'
      case 'Medium': return 'text-yellow-600 bg-yellow-50'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <div className="max-w-6xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Welcome back, {user?.name}</h1>
        <p className="text-gray-500 text-sm mt-1.5">Overview of your deadlines and tasks</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Tasks', value: stats.total, icon: ListChecks, color: 'text-primary', bg: 'bg-primary/5' },
          { label: 'Completed', value: stats.completed, icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Pending', value: stats.pending, icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-50' },
          { label: 'At Risk', value: stats.highRisk, icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-50' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200 transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest">{stat.label}</span>
              <div className={`w-8 h-8 rounded-lg ${stat.bg} flex items-center justify-center`}>
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </div>
            </div>
            <span className="text-2xl font-bold text-gray-900 tracking-tight">{stat.value}</span>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200 transition-all lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-semibold text-gray-900 tracking-tight">AI Insight</h2>
              <p className="text-xs text-gray-500 mt-0.5">Real-time risk analysis of your workload</p>
            </div>
            <div className="w-9 h-9 rounded-lg bg-primary/5 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4 text-primary" />
            </div>
          </div>
          {highRiskTasks.length > 0 ? (
            <div className="bg-red-50 rounded-lg p-5 border border-red-100">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-red-800">
                    {"You are likely to miss your project deadline. Start research today."}
                  </p>
                  <p className="text-sm text-red-600 mt-2">
                    You have {highRiskTasks.length} high-risk task{highRiskTasks.length > 1 ? 's' : ''} with over 70% chance of delay.
                  </p>
                  <ul className="mt-2 space-y-1">
                    {highRiskTasks.map((t) => (
                      <li key={t.id} className="text-sm text-red-600">
                        • {t.title} — due {new Date(t.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-green-50 rounded-lg p-4 border border-green-100">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-green-800">No high-risk tasks. You're on track!</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200 transition-all">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-semibold text-gray-900 tracking-tight">Productivity Score</h2>
              <p className="text-xs text-gray-500 mt-0.5">Success rate: {stats.rate}%</p>
            </div>
            <div className="w-9 h-9 rounded-lg bg-accent/5 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-accent" />
            </div>
          </div>
          <div className="flex items-end gap-3">
            <span className="text-5xl font-bold text-primary tracking-tight">{stats.rate}</span>
            <span className="text-sm text-gray-400 mb-1.5 font-medium">/ 100</span>
          </div>
          <div className="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full rounded-full bg-gradient-to-r from-primary to-secondary transition-all" style={{ width: `${stats.rate}%` }} />
          </div>
          <p className="text-sm text-gray-500 mt-3">{stats.completed} of {stats.total} tasks completed.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200 transition-all">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-semibold text-gray-900 tracking-tight">Upcoming Deadlines</h2>
            <Calendar className="w-4 h-4 text-gray-400" />
          </div>
          {upcomingDeadlines.length > 0 ? (
            <div className="divide-y divide-gray-50">
              {upcomingDeadlines.map((item) => (
                <div key={item.id} className="px-6 py-3.5 flex items-center justify-between hover:bg-gray-50/50 transition-colors">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900 truncate">{item.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {new Date(item.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${getPriorityColor(item.priority)}`}>
                      {item.priority}
                    </span>
                    <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${getRiskColor(item.riskScore)}`}>
                      {getRiskLabel(item.riskScore)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="px-6 py-8 text-center text-sm text-gray-400">No upcoming deadlines.</div>
          )}
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200 transition-all">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-semibold text-gray-900 tracking-tight">Goal Progress</h2>
              <p className="text-xs text-gray-500 mt-0.5">Project completion tracking</p>
            </div>
            <div className="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center">
              <Target className="w-4 h-4 text-green-600" />
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="font-medium text-gray-900">Project Report</span>
                <span className="text-xs font-semibold text-gray-500">70%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full w-[70%] bg-green-500 rounded-full" />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="font-medium text-gray-900">Database Design</span>
                <span className="text-xs font-semibold text-gray-500">45%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full w-[45%] bg-accent rounded-full" />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="font-medium text-gray-900">Frontend Integration</span>
                <span className="text-xs font-semibold text-gray-500">30%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full w-[30%] bg-yellow-500 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200 transition-all">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-semibold text-gray-900 tracking-tight">Recommended Schedule</h2>
            <p className="text-xs text-gray-500 mt-0.5">AI-optimized time slots based on your workload</p>
          </div>
          <Calendar className="w-4 h-4 text-gray-400" />
        </div>
        {(() => {
          const now = new Date()
          const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
          const pending = tasks.filter(t => t.status !== 'completed').sort((a, b) => (b.riskScore || 0) - (a.riskScore || 0))
          if (!pending.length) return <p className="text-sm text-gray-400 text-center py-4">All tasks completed! Add new tasks to get schedule recommendations.</p>
          const slots = pending.slice(0, 3).map((t, i) => {
            const date = new Date(now)
            date.setDate(date.getDate() + i)
            const day = i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : dayNames[date.getDay()]
            const hours = 7 + i
            const time = `${hours > 12 ? hours - 12 : hours} ${hours >= 12 ? 'PM' : 'AM'} - ${hours + 2 > 12 ? hours : hours + 2}:00 ${hours + 2 >= 12 ? 'PM' : 'AM'}`
            const colors = ['bg-red-50 border-red-100 text-red-700', 'bg-accent/5 border-accent/20 text-accent', 'bg-yellow-50 border-yellow-100 text-yellow-700']
            return { day, time, task: t.title, color: colors[i] || colors[0] }
          })
          return (
            <div className="grid sm:grid-cols-3 gap-3">
              {slots.map((slot) => (
                <div key={slot.day} className={`rounded-xl p-4 border ${slot.color}`}>
                  <p className="text-xs font-semibold uppercase tracking-widest mb-1">{slot.day}</p>
                  <p className="text-sm font-bold">{slot.time}</p>
                  <p className="text-xs mt-1 opacity-80">{slot.task}</p>
                </div>
              ))}
            </div>
          )
        })()}
      </div>
    </div>
  )
}
