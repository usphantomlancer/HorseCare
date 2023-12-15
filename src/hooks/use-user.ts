import type { User } from '@supabase/supabase-js'
import { create } from 'zustand'

interface UserState {
  user: User | null
  status: 'loading' | 'loaded'
  isAuthenticated: boolean
  setUser: (user?: User | null) => void
}

export const useUserStore = create<UserState>()((set) => ({
  user: null,
  status: 'loading',
  isAuthenticated: false,
  setUser: (user) =>
    set(() => ({ user, status: 'loaded', isAuthenticated: !!user })),
}))
