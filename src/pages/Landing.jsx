import { Link } from 'react-router-dom'
import { Shield, Brain, Clock, BarChart3, ArrowRight, Check, AlertTriangle, Lightbulb } from 'lucide-react'

const features = [
  {
    icon: Brain,
    title: 'Predictive AI Analysis',
    desc: 'Gemini AI analyzes your deadlines, workload, and difficulty to predict risks before they happen.',
  },
  {
    icon: Clock,
    title: 'Smart Task Breakdown',
    desc: 'Large tasks are automatically broken into manageable daily steps with personalized plans.',
  },
  {
    icon: BarChart3,
    title: 'Real-time Risk Scoring',
    desc: 'Every task gets a risk score. Know which deadlines need attention before it\'s too late.',
  },
  {
    icon: Shield,
    title: 'Proactive Guardian',
    desc: 'No more reactive reminders. Get alerts and action plans early enough to make a difference.',
  },
]

export default function Landing() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-sm">DG</span>
            </div>
            <span className="font-semibold text-gray-900 tracking-tight">Deadline Guardian AI</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">Sign in</Link>
            <Link to="/register" className="text-sm font-medium bg-primary text-white px-4 py-2 rounded-xl hover:bg-primary/90 transition-all shadow-sm hover:shadow-md">Get started</Link>
          </div>
        </div>
      </nav>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/5 border border-primary/10 rounded-full text-[11px] font-semibold text-primary tracking-wider mb-6">
            AI-Powered Deadline Management
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight">
            Stop missing deadlines{' '}
            <span className="text-primary">before they happen.</span>
          </h1>
          <p className="mt-5 text-lg text-gray-500 leading-relaxed max-w-2xl mx-auto">
            AI that predicts your deadline risks and creates a plan before you fall behind.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/register"
              className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-medium text-sm hover:bg-primary/90 transition-all shadow-sm hover:shadow-md"
            >
              Start free trial
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-gray-500 px-6 py-3 rounded-xl font-medium text-sm hover:bg-gray-50 transition-colors border border-gray-200 hover:border-gray-300"
            >
              Sign in
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-gray-100 bg-gray-50/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 border border-red-100 rounded-full text-[11px] font-semibold text-red-600 tracking-wider mb-4">
                <AlertTriangle className="w-3 h-3" />
                The Problem
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight tracking-tight">
                Existing tools only remind you after you fail.
              </h2>
              <p className="mt-4 text-gray-500 leading-relaxed">
                Students, professionals, and entrepreneurs miss important deadlines because 
                productivity tools only react after problems occur. By the time you get 
                a reminder, it's often too late to take meaningful action.
              </p>
              <ul className="mt-6 space-y-2">
                {[
                  'Reactive reminders instead of proactive alerts',
                  'No early warning system for deadline risks',
                  'Generic task lists without personalized planning',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-red-600">
                    <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 border border-green-100 rounded-full text-[11px] font-semibold text-green-600 tracking-wider mb-4">
                <Lightbulb className="w-3 h-3" />
                Our Solution
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight tracking-tight">
                AI that predicts risk early and creates a plan.
              </h2>
              <p className="mt-4 text-gray-500 leading-relaxed">
                Deadline Guardian AI analyzes your tasks against workload, difficulty, and 
                time remaining. It predicts which deadlines are at risk and builds a 
                personalized action plan before you fall behind.
              </p>
              <ul className="mt-6 space-y-2">
                {[
                  'Predictive risk analysis for every deadline',
                  'Personalized daily action plans',
                  'Proactive alerts with time to act',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-green-600">
                    <Check className="w-4 h-4 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">Key Features</h2>
          <p className="mt-2 text-gray-500">Everything you need to stay ahead of deadlines.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feature) => (
            <div key={feature.title} className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200 transition-all">
              <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center mb-4">
                <feature.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2 tracking-tight">{feature.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-gray-100 bg-gray-50/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight tracking-tight">
                Know your risk score before you start.
              </h2>
              <p className="mt-4 text-gray-500 leading-relaxed">
                Every task gets analyzed against your workload, deadline, and difficulty. 
                Our AI calculates a precise risk score and builds a step-by-step plan 
                to keep you on track.
              </p>
              <ul className="mt-8 space-y-3">
                {[
                  'Real-time risk analysis for every task',
                  'Personalized daily action plans',
                  'Smart workload balancing',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-gray-600">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200 transition-all">
              <div className="flex items-center justify-between mb-6">
                <span className="text-sm font-semibold text-gray-900">Task Risk Analysis</span>
                <span className="text-[11px] font-semibold bg-red-50 text-red-600 px-2.5 py-0.5 rounded-full">HIGH RISK</span>
              </div>
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-gray-500 font-medium">Risk Score</span>
                  <span className="font-bold text-gray-900">82%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full w-[82%] bg-red-500 rounded-full" />
                </div>
              </div>
              <div className="text-sm text-gray-600 space-y-1">
                <p><span className="font-semibold text-gray-900">Reason:</span> Large task with limited time remaining</p>
                <p><span className="font-semibold text-gray-900">Plan:</span> Work 90 minutes daily for next 5 days</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Ready to never miss a deadline again?</h2>
          <p className="mt-3 text-primary/80 text-lg">Join Deadline Guardian and take control of your schedule.</p>
          <Link
            to="/register"
            className="mt-8 inline-flex items-center gap-2 bg-white text-primary px-6 py-3 rounded-xl font-medium text-sm hover:bg-gray-50 transition-all shadow-sm hover:shadow-md"
          >
            Get started free
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <footer className="border-t border-gray-100 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
              <span className="text-white font-bold text-[10px]">DG</span>
            </div>
            <span className="text-sm text-gray-400">Deadline Guardian AI</span>
          </div>
          <span className="text-sm text-gray-400">&copy; 2026 Deadline Guardian. All rights reserved.</span>
        </div>
      </footer>
    </div>
  )
}
