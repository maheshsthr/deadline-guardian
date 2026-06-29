import { useState } from 'react'
import { User, Mail, Save, X, Edit3 } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function Profile() {
  const { user, updateProfile } = useAuth()
  const [editing, setEditing] = useState(false)
  const [name, setName] = useState(user?.name || '')
  const [email, setEmail] = useState(user?.email || '')

  const handleSave = (e) => {
    e.preventDefault()
    updateProfile({ name, email })
    setEditing(false)
  }

  const handleCancel = () => {
    setName(user?.name || '')
    setEmail(user?.email || '')
    setEditing(false)
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Profile</h1>
        <p className="text-gray-500 text-sm mt-1.5">Manage your account settings</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200 transition-all">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-semibold text-gray-900 tracking-tight">Account details</h2>
          {!editing && (
            <button
              onClick={() => setEditing(true)}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
            >
              <Edit3 className="w-4 h-4" />
              Edit
            </button>
          )}
        </div>

        {editing ? (
          <form onSubmit={handleSave} className="p-6 space-y-5">
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1.5">Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1.5">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 bg-primary text-white px-4 py-2.5 rounded-xl font-medium text-sm hover:bg-primary/90 transition-all shadow-sm hover:shadow-md"
              >
                <Save className="w-4 h-4" />
                Save changes
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="inline-flex items-center gap-1.5 text-gray-500 px-4 py-2.5 rounded-xl font-medium text-sm hover:bg-gray-50 transition-colors border border-gray-200 hover:border-gray-300"
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="p-6 space-y-5">
            <div className="flex items-center gap-4 pb-5 border-b border-gray-50">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-xl font-bold shadow-sm">
                {user?.name?.charAt(0) || 'U'}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-lg tracking-tight">{user?.name}</h3>
                <p className="text-sm text-gray-500">{user?.email}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest">Name</span>
                <p className="text-sm text-gray-900 mt-1 font-medium">{user?.name}</p>
              </div>
              <div>
                <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest">Email</span>
                <p className="text-sm text-gray-900 mt-1 font-medium">{user?.email}</p>
              </div>
              <div>
                <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest">Member since</span>
                <p className="text-sm text-gray-900 mt-1 font-medium">June 2026</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
