import { useState } from 'react'
import { Outlet, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { LayoutDashboard, ListChecks, BarChart3, MessageSquare, Settings, Menu, X, LogOut } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/tasks', label: 'Tasks', icon: ListChecks },
  { to: '/analysis', label: 'Analysis', icon: BarChart3 },
  { to: '/chat', label: 'Assistant', icon: MessageSquare },
  { to: '/profile', label: 'Settings', icon: Settings },
]

export default function AppLayout() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden">
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out flex flex-col
        lg:translate-x-0
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="h-16 flex items-center px-5 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-sm">DG</span>
            </div>
            <span className="font-semibold text-gray-900 text-sm tracking-tight">Deadline Guardian</span>
          </div>
          <button onClick={() => setMobileOpen(false)} className="ml-auto lg:hidden">
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.to
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className={`relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-primary/8 text-primary'
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-primary rounded-full" />
                )}
                <item.icon className={`w-5 h-5 ${isActive ? 'text-primary' : 'text-gray-400'}`} />
                {item.label}
              </NavLink>
            )
          })}
        </nav>
        <div className="p-3 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-500 hover:text-red-600 hover:bg-red-50 w-full transition-all"
          >
            <LogOut className="w-5 h-5" />
            Sign out
          </button>
        </div>
      </aside>

      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col min-h-0 lg:ml-64">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center px-4 lg:px-8 shrink-0">
          <button onClick={() => setMobileOpen(true)} className="lg:hidden mr-4">
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
          <div className="flex-1" />
          <NavLink to="/profile" className="flex items-center gap-3 rounded-lg hover:bg-gray-50 transition-colors px-2 py-1.5 -mr-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-xs font-semibold shadow-sm">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <span className="text-sm font-medium text-gray-700 hidden sm:block">{user?.name || 'User'}</span>
          </NavLink>
        </header>
        <main className="flex-1 overflow-y-auto p-5 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
