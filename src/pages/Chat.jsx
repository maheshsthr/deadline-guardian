import { useState, useRef, useEffect } from 'react'
import { Send, Bot, User } from 'lucide-react'
import { useData } from '../context/DataContext'

const suggestions = [
  'Can I complete my project report in 3 days?',
  'What tasks should I prioritize today?',
  'Create a study plan for this week',
  'Am I on track to meet my deadlines?',
]

export default function Chat() {
  const { chatMessages, addChatMessage, getChatResponse } = useData()
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatMessages])

  const handleSend = async (text) => {
    const message = text || input
    if (!message.trim() || loading) return

    addChatMessage({ role: 'user', content: message })
    setInput('')
    setLoading(true)

    const reply = await getChatResponse(message)

    setTimeout(() => {
      addChatMessage({ role: 'assistant', content: reply })
      setLoading(false)
    }, 300)
  }

  const showSuggestions = chatMessages.length === 1

  return (
    <div className="max-w-4xl mx-auto flex flex-col" style={{ height: 'calc(100vh - 8rem)' }}>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">AI Assistant</h1>
        <p className="text-gray-500 text-sm mt-1.5">Chat with your personal deadline guardian</p>
      </div>

      <div className="flex-1 bg-white rounded-xl border border-gray-100 shadow-sm hover:border-gray-200 transition-all flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {chatMessages.map((msg, i) => (
            <div key={i} className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm ${
                msg.role === 'assistant' ? 'bg-primary/5' : 'bg-gray-100'
              }`}>
                {msg.role === 'assistant' ? (
                  <Bot className="w-4 h-4 text-primary" />
                ) : (
                  <User className="w-4 h-4 text-gray-500" />
                )}
              </div>
              <div className={`max-w-[80%] rounded-xl px-4 py-3 ${
                msg.role === 'assistant'
                  ? 'bg-gray-50 text-gray-700 border border-gray-100'
                  : 'bg-primary text-white'
              }`}>
                <p className="text-sm leading-relaxed whitespace-pre-line">{msg.content}</p>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-primary/5 flex items-center justify-center flex-shrink-0 shadow-sm">
                <Bot className="w-4 h-4 text-primary" />
              </div>
              <div className="bg-gray-50 rounded-xl px-4 py-3 border border-gray-100">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {showSuggestions && (
          <div className="px-5 pb-5">
            <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-3 text-center">Try asking</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => handleSend(s)}
                  className="text-xs text-gray-500 bg-gray-50 hover:bg-gray-100 border border-gray-200 px-3 py-1.5 rounded-full transition-all hover:border-gray-300"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="border-t border-gray-100 p-4">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about your deadlines..."
              className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || loading}
              className="bg-primary text-white p-2.5 rounded-xl hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
