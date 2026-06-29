import { createContext, useContext, useState, useEffect } from 'react'
import API from '../services/api'
import { useAuth } from './AuthContext'

const DataContext = createContext(null)

export function DataProvider({ children }) {
  const { user } = useAuth()
  const [tasks, setTasks] = useState([])
  const [analyses, setAnalyses] = useState([])
  const [chatMessages, setChatMessages] = useState([
    { role: 'assistant', content: 'Hello! I\'m your Deadline Guardian AI assistant. I can help you analyze your tasks, create plans, and predict deadline risks. What would you like to know?' },
  ])
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    setChatMessages([
      { role: 'assistant', content: 'Hello! I\'m your Deadline Guardian AI assistant. I can help you analyze your tasks, create plans, and predict deadline risks. What would you like to know?' },
    ])
    if (user?.token) {
      fetchTasks()
    } else {
      setInitialized(true)
    }
  }, [user])

  const fetchTasks = async () => {
    try {
      const { data } = await API.get('/tasks')
      const fetched = data.map((t) => {
        const deadline = typeof t.deadline === 'string'
          ? t.deadline.split('T')[0]
          : new Date(t.deadline).toISOString().split('T')[0]
        return { ...t, id: t._id || t.id, deadline }
      })
      setTasks(fetched)
      setAnalyses(
        fetched
          .filter((t) => t.aiAnalysis)
          .map((t) => ({
            id: t._id || t.id,
            taskId: t._id || t.id,
            task: t.title,
            ...t.aiAnalysis,
          }))
      )
    } catch {
      console.error('Failed to fetch tasks')
    }
    setInitialized(true)
  }

  const addTask = async (taskData) => {
    try {
      const { data } = await API.post('/tasks', taskData)
      const deadline = typeof data.deadline === 'string'
        ? data.deadline.split('T')[0]
        : new Date(data.deadline).toISOString().split('T')[0]
      const task = { ...data, id: data._id || data.id, deadline }
      setTasks((prev) => [task, ...prev])
      return task
    } catch (err) {
      console.error('Failed to create task:', err)
    }
  }

  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`)
      setTasks((prev) => prev.filter((t) => t.id !== id))
      setAnalyses((prev) => prev.filter((a) => a.taskId !== id))
    } catch {
      console.error('Failed to delete task')
    }
  }

  const updateTask = async (id, data) => {
    try {
      const res = await API.put(`/tasks/${id}`, data)
      const updated = { ...res.data, id: res.data._id || res.data.id, deadline: (res.data.deadline || '').split('T')[0] }
      setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)))
      setAnalyses((prev) =>
        prev.map((a) =>
          a.taskId === id
            ? { id, taskId: id, task: updated.title, ...updated.aiAnalysis }
            : a
        )
      )
      return updated
    } catch {
      console.error('Failed to update task')
    }
  }

  const analyzeTask = async (taskId) => {
    try {
      const { data } = await API.post('/ai/analyze', { taskId })
      setTasks((prev) =>
        prev.map((t) =>
          (t.id === taskId || t._id === taskId)
            ? { ...t, riskScore: data.riskScore, aiAnalysis: data }
            : t
        )
      )
      const taskTitle = tasks.find((t) => t.id === taskId || t._id === taskId)?.title
      setAnalyses((prev) => [
        { id: taskId, taskId, task: taskTitle, ...data },
        ...prev.filter((a) => a.taskId !== taskId),
      ])
      return data
    } catch {
      console.error('Analysis failed')
    }
  }

  const addChatMessage = (message) => {
    setChatMessages((prev) => [...prev, message])
  }

  const getChatResponse = async (question) => {
    try {
      const { data } = await API.post('/ai/chat', { message: question })
      return data.reply
    } catch {
      return "I'm here to help with your deadlines! Try asking me to analyze a task, prioritize your workload, or check if you're on track."
    }
  }

  return (
    <DataContext.Provider value={{ tasks, analyses, chatMessages, initialized, addTask, deleteTask, updateTask, analyzeTask, addChatMessage, getChatResponse }}>
      {children}
    </DataContext.Provider>
  )
}

export const useData = () => useContext(DataContext)
