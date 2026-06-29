import { useState } from 'react'
import { Plus, X, Clock, Flag, Trash2, AlertTriangle, Pencil, CheckCircle2 } from 'lucide-react'
import { useData } from '../context/DataContext'

export default function Tasks() {
  const { tasks, addTask, deleteTask, updateTask } = useData()
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({
    title: '', description: '', deadline: '', priority: 'Medium', difficulty: 'Medium',
  })

  const openCreate = () => {
    setForm({ title: '', description: '', deadline: '', priority: 'Medium', difficulty: 'Medium' })
    setEditing(null)
    setShowForm(true)
  }

  const openEdit = (task) => {
    setForm({
      title: task.title,
      description: task.description || '',
      deadline: task.deadline,
      priority: task.priority,
      difficulty: task.difficulty,
    })
    setEditing(task)
    setShowForm(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editing) {
      updateTask(editing.id, form)
    } else {
      addTask(form)
    }
    setShowForm(false)
    setEditing(null)
  }

  const handleComplete = async (task) => {
    const newStatus = task.status === 'completed' ? 'pending' : 'completed'
    await updateTask(task.id, { status: newStatus })
  }

  const getRiskColor = (score) => {
    if (score >= 70) return 'text-red-600 bg-red-50'
    if (score >= 40) return 'text-yellow-600 bg-yellow-50'
    return 'text-green-600 bg-green-50'
  }

  const getPriorityColor = (p) => {
    switch (p) {
      case 'High': return 'text-red-600 bg-red-50'
      case 'Medium': return 'text-yellow-600 bg-yellow-50'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusColor = (s) => {
    switch (s) {
      case 'completed': return 'text-green-600 bg-green-50'
      case 'in_progress': return 'text-accent bg-accent/5'
      default: return 'text-gray-500 bg-gray-50'
    }
  }

  return (
    <div className="max-w-6xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Tasks</h1>
          <p className="text-gray-500 text-sm mt-1.5">Manage and track your deadlines</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2.5 rounded-xl font-medium text-sm hover:bg-primary/90 transition-all shadow-sm hover:shadow-md"
        >
          <Plus className="w-4 h-4" />
          New task
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/20 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-lg border border-gray-100 shadow-lg">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-900 tracking-tight">{editing ? 'Edit task' : 'Create task'}</h2>
              <button onClick={() => { setShowForm(false); setEditing(null) }}>
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1.5">Title</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Task name"
                  required
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1.5">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Add details..."
                  rows={3}
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1.5">Deadline</label>
                <input
                  type="date"
                  value={form.deadline}
                  onChange={(e) => setForm({ ...form, deadline: e.target.value })}
                  required
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1.5">Priority</label>
                  <select
                    value={form.priority}
                    onChange={(e) => setForm({ ...form, priority: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  >
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1.5">Difficulty</label>
                  <select
                    value={form.difficulty}
                    onChange={(e) => setForm({ ...form, difficulty: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  >
                    <option>Small</option>
                    <option>Medium</option>
                    <option>Large</option>
                  </select>
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-white py-2.5 rounded-xl font-medium text-sm hover:bg-primary/90 transition-all shadow-sm hover:shadow-md"
              >
                {editing ? 'Save changes' : 'Create task'}
              </button>
            </form>
          </div>
        </div>
      )}

      {tasks.length > 0 ? (
        <div className="grid gap-3">
          {tasks.map((task) => (
            <div key={task.id} className="group bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200 transition-all">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h3 className="font-semibold text-gray-900 tracking-tight">{task.title}</h3>
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${getRiskColor(task.riskScore)}`}>
                      {task.riskScore}% Risk
                    </span>
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${getStatusColor(task.status)}`}>
                      {task.status === 'completed' ? 'Done' : task.status === 'in_progress' ? 'In Progress' : 'Pending'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1.5 line-clamp-1">{task.description}</p>
                  <div className="flex items-center gap-4 mt-3 text-xs text-gray-400">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {new Date(task.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Flag className="w-3.5 h-3.5" />
                      {task.difficulty}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => openEdit(task)}
                    className="opacity-0 group-hover:opacity-100 text-gray-300 hover:text-primary transition-all p-1.5 hover:bg-primary/5 rounded-lg"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleComplete(task)}
                    className={`opacity-0 group-hover:opacity-100 transition-all p-1.5 rounded-lg ${
                      task.status === 'completed'
                        ? 'text-green-500 hover:bg-green-50'
                        : 'text-gray-300 hover:text-green-500 hover:bg-green-50'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="opacity-0 group-hover:opacity-100 text-gray-300 hover:text-red-500 transition-all p-1.5 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-12 text-center">
          <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-5 h-5 text-gray-300" />
          </div>
          <p className="text-gray-400 text-sm font-medium">No tasks yet</p>
          <p className="text-gray-400 text-xs mt-1">Create your first task to get started.</p>
        </div>
      )}
    </div>
  )
}
