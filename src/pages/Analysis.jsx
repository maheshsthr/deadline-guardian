import { useState } from 'react'
import { AlertTriangle, CheckCircle, Clock, Lightbulb, BarChart3 } from 'lucide-react'
import { useData } from '../context/DataContext'

export default function Analysis() {
  const { tasks } = useData()
  const analysedTasks = tasks.filter(t => t.aiAnalysis?.riskLevel)
  const [selected, setSelected] = useState(analysedTasks[0] || null)

  if (!analysedTasks.length) {
    return (
      <div className="max-w-6xl">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">AI Deadline Analysis</h1>
          <p className="text-gray-500 text-sm mt-1.5">AI-powered risk analysis for your tasks</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-12 text-center">
          <p className="text-gray-400 text-sm">No analyses yet. Create a task to get AI-powered risk analysis.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">AI Deadline Analysis</h1>
        <p className="text-gray-500 text-sm mt-1.5">AI-powered risk analysis for your tasks</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-2">
          <h2 className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-3">Tasks analyzed</h2>
          {analysedTasks.map((t) => (
            <button
              key={t._id}
              onClick={() => setSelected(t)}
              className={`w-full text-left bg-white rounded-xl p-4 border shadow-sm transition-all ${
                selected?._id === t._id ? 'border-primary ring-1 ring-primary/20' : 'border-gray-100 hover:border-gray-200 hover:shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-sm font-medium text-gray-900 tracking-tight">{t.title}</span>
                <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                  t.aiAnalysis.riskLevel === 'HIGH' ? 'bg-red-50 text-red-600' :
                  t.aiAnalysis.riskLevel === 'MEDIUM' ? 'bg-yellow-50 text-yellow-600' :
                  'bg-green-50 text-green-600'
                }`}>
                  {t.aiAnalysis.riskLevel}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      t.riskScore >= 70 ? 'bg-red-500' : t.riskScore >= 40 ? 'bg-yellow-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${t.riskScore}%` }}
                  />
                </div>
                <span className="text-xs font-semibold text-gray-500">{t.riskScore}%</span>
              </div>
            </button>
          ))}
        </div>

        <div className="lg:col-span-2">
          {selected && (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 hover:shadow-md hover:border-gray-200 transition-all">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-gray-900 tracking-tight">{selected.title}</h2>
                    <p className="text-xs text-gray-400 mt-0.5">Risk Analysis Report</p>
                  </div>
                </div>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                  selected.aiAnalysis.riskLevel === 'HIGH' ? 'bg-red-50 text-red-600' :
                  selected.aiAnalysis.riskLevel === 'MEDIUM' ? 'bg-yellow-50 text-yellow-600' :
                  'bg-green-50 text-green-600'
                }`}>
                  {selected.aiAnalysis.riskLevel} RISK
                </span>
              </div>

              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-500 font-medium">Risk Score</span>
                  <span className="text-3xl font-bold text-gray-900 tracking-tight">{selected.riskScore}%</span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      selected.riskScore >= 70 ? 'bg-red-500' : selected.riskScore >= 40 ? 'bg-yellow-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${selected.riskScore}%` }}
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2.5">
                    <AlertTriangle className="w-4 h-4 text-gray-400" />
                    <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest">Analysis</span>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">{selected.aiAnalysis.reason}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2.5">
                    <Lightbulb className="w-4 h-4 text-gray-400" />
                    <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest">Recommendation</span>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">{selected.aiAnalysis.recommendation}</p>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest">Action Plan</span>
                </div>
                <div className="space-y-2">
                  {selected.aiAnalysis.plan.map((step, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm text-gray-600 bg-gray-50 rounded-lg px-4 py-3 hover:bg-gray-100/50 transition-colors">
                      <CheckCircle className="w-4 h-4 text-gray-300 flex-shrink-0" />
                      <span className="leading-relaxed">{step.replace(/^Day \d+:\s*/i, '')}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
