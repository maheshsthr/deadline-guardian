import Task from '../models/Task.js'
import { analyzeTask, chatWithAI } from '../services/geminiService.js'

export async function analyze(req, res) {
  try {
    const { taskId } = req.body
    if (!taskId) return res.status(400).json({ error: 'taskId is required' })

    const task = await Task.findOne({ _id: taskId, userId: req.userId })
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

    res.json(analysis)
  } catch {
    res.status(500).json({ error: 'Analysis failed' })
  }
}

export async function chat(req, res) {
  try {
    const { message } = req.body
    if (!message) return res.status(400).json({ error: 'Message is required' })

    const tasks = await Task.find({ userId: req.userId }).lean()
    const reply = await chatWithAI(message, tasks)
    res.json({ reply })
  } catch {
    res.status(500).json({ error: 'Chat failed' })
  }
}
