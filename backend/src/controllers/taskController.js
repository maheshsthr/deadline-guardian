import Task from '../models/Task.js'
import { analyzeTask } from '../services/geminiService.js'

export async function getTasks(req, res) {
  try {
    const tasks = await Task.find({ userId: req.userId }).sort({ createdAt: -1 })
    res.json(tasks)
  } catch {
    res.status(500).json({ error: 'Server error' })
  }
}

export async function createTask(req, res) {
  try {
    const { title, description, deadline, priority, difficulty } = req.body
    if (!title || !deadline) {
      return res.status(400).json({ error: 'Title and deadline are required' })
    }

    const task = await Task.create({
      userId: req.userId,
      title,
      description,
      deadline,
      priority,
      difficulty,
    })

    const analysis = await analyzeTask(task)
    task.riskScore = analysis.riskScore
    task.aiAnalysis = {
      riskLevel: analysis.riskLevel,
      reason: analysis.reason,
      recommendation: analysis.recommendation,
      plan: analysis.plan,
    }
    await task.save()

    res.status(201).json(task)
  } catch {
    res.status(500).json({ error: 'Server error' })
  }
}

export async function updateTask(req, res) {
  try {
    let task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true }
    )
    if (!task) return res.status(404).json({ error: 'Task not found' })

    const analysis = await analyzeTask(task)
    task.riskScore = analysis.riskScore
    task.aiAnalysis = {
      riskLevel: analysis.riskLevel,
      reason: analysis.reason,
      recommendation: analysis.recommendation,
      plan: analysis.plan,
    }
    await task.save()

    res.json(task)
  } catch {
    res.status(500).json({ error: 'Server error' })
  }
}

export async function deleteTask(req, res) {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.userId })
    if (!task) return res.status(404).json({ error: 'Task not found' })
    res.json({ message: 'Task deleted' })
  } catch {
    res.status(500).json({ error: 'Server error' })
  }
}
