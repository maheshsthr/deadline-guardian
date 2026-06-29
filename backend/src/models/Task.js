import mongoose from 'mongoose'

const taskSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true, trim: true },
  description: { type: String, default: '' },
  deadline: { type: Date, required: true },
  priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
  difficulty: { type: String, enum: ['Small', 'Medium', 'Large'], default: 'Medium' },
  status: { type: String, enum: ['pending', 'in_progress', 'completed'], default: 'pending' },
  riskScore: { type: Number, default: null },
  aiAnalysis: {
    riskLevel: String,
    reason: String,
    recommendation: String,
    plan: [String],
  },
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.model('Task', taskSchema)
