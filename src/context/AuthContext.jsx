import { createContext, useContext, useState, useEffect } from 'react'
import API from '../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem('dg_user')
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        if (parsed.token) setUser(parsed)
      } catch {
        localStorage.removeItem('dg_user')
      }
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    try {
      const { data } = await API.post('/auth/login', { email, password })
      const userData = { ...data.user, token: data.token }
      localStorage.setItem('dg_user', JSON.stringify(userData))
      setUser(userData)
      return { success: true }
    } catch (err) {
      return { success: false, error: err.response?.data?.error || 'Invalid email or password' }
    }
  }

  const register = async (name, email, password) => {
    try {
      const { data } = await API.post('/auth/register', { name, email, password })
      const userData = { ...data.user, token: data.token }
      localStorage.setItem('dg_user', JSON.stringify(userData))
      setUser(userData)
      return { success: true }
    } catch (err) {
      return { success: false, error: err.response?.data?.error || 'Registration failed' }
    }
  }

  const updateProfile = (data) => {
    const updated = { ...user, ...data }
    localStorage.setItem('dg_user', JSON.stringify(updated))
    setUser(updated)
    return { success: true }
  }

  const logout = () => {
    localStorage.removeItem('dg_user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, updateProfile, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
