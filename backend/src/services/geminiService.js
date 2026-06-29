import OpenAI from 'openai'

const openai = new OpenAI({
  baseURL: 'https://api.groq.com/openai/v1',
  apiKey: process.env.GROQ_API_KEY,
})

export async function analyzeTask(task) {
  try {
    const deadline = new Date(task.deadline)
    const now = new Date()
    const daysRemaining = Math.max(1, Math.ceil((deadline - now) / (1000 * 60 * 60 * 24)))
    const planDays = Math.min(daysRemaining, 5)

    const prompt = `You are a deadline risk analyst. Analyze this task and return ONLY valid JSON:
{
  "title": "${task.title}",
  "deadline": "${task.deadline}",
  "difficulty": "${task.difficulty}",
  "priority": "${task.priority}"
}

Respond with JSON: { "riskScore": 0-95, "riskLevel": "LOW|MEDIUM|HIGH", "reason": "why", "recommendation": "what to do", "plan": ["Day 1: ...", "Day 2: ...", ...] }
Risk factors: difficulty, priority, time remaining. Generate a realistic day-by-day plan with exactly ${planDays} day${planDays > 1 ? 's' : ''}.`

    const res = await openai.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.3,
      max_tokens: 500,
    })

    const text = res.choices[0].message.content
    const json = JSON.parse(text.replace(/```json|```/g, '').trim())
    return json
  } catch (err) {
    return fallbackAnalysis(task)
  }
}

export async function chatWithAI(message, tasks = []) {
  try {
    const taskContext = tasks.length
      ? tasks.map(t =>
          `- "${t.title}" (${t.priority} priority, ${t.difficulty}, ${t.status || 'pending'}, risk: ${t.riskScore || '?'}%, deadline: ${t.deadline})`
        ).join('\n')
      : 'No tasks yet.'

    const res = await openai.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'system',
          content: 'You are Deadline Guardian AI, a helpful assistant for deadline management. Be concise, practical, and supportive. Use the user\'s actual task data to give specific advice. Keep responses under 200 words.',
        },
        {
          role: 'user',
          content: `My tasks:\n${taskContext}\n\nQuestion: ${message}`,
        },
      ],
      temperature: 0.5,
      max_tokens: 400,
    })

    return res.choices[0].message.content
  } catch (err) {
    return fallbackChat(message, tasks)
  }
}

function fallbackAnalysis(task) {
  const deadline = new Date(task.deadline)
  const now = new Date()
  const daysRemaining = Math.ceil((deadline - now) / (1000 * 60 * 60 * 24))
  const diff = { Small: 1, Medium: 2, Large: 3 }[task.difficulty] || 2
  const pri = { Low: 1, Medium: 2, High: 3 }[task.priority] || 2
  let riskScore = Math.min(95, Math.round((diff * pri * 10) / Math.max(daysRemaining, 1)))
  if (daysRemaining <= 1) riskScore = Math.min(95, riskScore + 30)
  else if (daysRemaining <= 3) riskScore = Math.min(90, riskScore + 15)
  else if (daysRemaining <= 7) riskScore = Math.min(80, riskScore + 5)
  const riskLevel = riskScore >= 70 ? 'HIGH' : riskScore >= 40 ? 'MEDIUM' : 'LOW'
  const safeDays = Math.max(daysRemaining, 1)
  const dailyMin = { Small: 30, Medium: 60, Large: 90 }[task.difficulty] || 60
  const plan = Array.from({ length: Math.min(safeDays, 5) }, (_, i) =>
    `Day ${i + 1}: Focus on ${task.title} — ${dailyMin} min`
  )
  return {
    riskScore,
    riskLevel,
    reason: `${task.difficulty.toLowerCase()} task with ${safeDays} day${safeDays > 1 ? 's' : ''} remaining`,
    recommendation: `Work ${dailyMin} minutes daily for the next ${safeDays} day${safeDays > 1 ? 's' : ''}`,
    plan,
  }
}

function fallbackChat(message, tasks) {
  const msg = message.toLowerCase()
  const pending = tasks.filter(t => t.status !== 'completed')
  const completed = tasks.filter(t => t.status === 'completed')

  if (msg.includes('prioritize')) {
    if (!pending.length) return "No pending tasks to prioritize."
    const sorted = [...pending].sort((a, b) => {
      const order = { High: 0, Medium: 1, Low: 2 }
      return (order[a.priority] || 1) - (order[b.priority] || 1)
    })
    let reply = "Based on your current tasks, here's what I recommend prioritizing:\n\n"
    sorted.slice(0, 4).forEach((t, i) => {
      reply += `${i + 1}. **${t.title}** (${t.priority} priority`
      if (t.riskScore) reply += `, ${t.riskScore}% risk`
      reply += ')\n'
    })
    if (completed.length) reply += `\n✅ ${completed.length} task${completed.length > 1 ? 's' : ''} already completed.`
    return reply
  }
  if (msg.includes('on track') || msg.includes('deadline') || msg.includes('behind')) {
    if (!pending.length) {
      let reply = "✅ All tasks completed! Great work."
      if (completed.length) reply += ` You've finished ${completed.length} task${completed.length > 1 ? 's' : ''}.`
      return reply
    }
    const highRisk = pending.filter(t => t.riskScore >= 70)
    const onTrack = pending.filter(t => t.riskScore < 40)
    let reply = "Here's your deadline status:\n\n"
    if (highRisk.length) {
      reply += `🚨 **At risk** — ${highRisk.length} task${highRisk.length > 1 ? 's' : ''} need attention\n`
      highRisk.forEach(t => reply += `  • ${t.title} (${t.riskScore}% risk)\n`)
    }
    reply += `✅ **On track** — ${onTrack.length} pending task${onTrack.length > 1 ? 's' : ''} looking good\n`
    if (completed.length) reply += `🎉 **Completed** — ${completed.length} task${completed.length > 1 ? 's' : ''} done\n`
    if (highRisk.length) reply += `\nFocus on high-risk tasks first.`
    return reply
  }
  if (msg.includes('plan') || msg.includes('schedule')) {
    return "Here's a recommended weekly plan:\n\n" +
      "**Mon-Wed**: High-priority tasks (2-3 hrs/day)\n" +
      "**Thu**: Review & adjust (1-2 hrs)\n" +
      "**Fri**: Complete pending items (2 hrs)\n" +
      "**Weekend**: Light catch-up or rest"
  }
  if (!tasks.length) {
    return "I'm your Deadline Guardian AI! Ask me to prioritize, check your deadlines, or create a study plan."
  }
  const top = [...pending].sort((a, b) => (b.riskScore || 0) - (a.riskScore || 0))[0]
  if (!top) return `✅ All ${completed.length} task${completed.length > 1 ? 's' : ''} completed! Create new tasks to analyze.`
  return `You have ${pending.length} pending task${pending.length > 1 ? 's' : ''} and ${completed.length} completed. Top priority: "${top?.title}" (${top?.riskScore || '?'}% risk). Ask me to prioritize, check progress, or plan your schedule.`
}
