import { lazy, Suspense, useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

const Home = lazy(() => import('./pages/home/Home.tsx'))
const Search = lazy(() => import('./pages/Search.tsx'))
const Create = lazy(() => import('./pages/Create.tsx'))
const MyServices = lazy(() => import('./pages/MyServices.tsx'))
const ServiceDetails = lazy(() => import('./pages/ServiceDetails.tsx'))
const Login = lazy(() => import('./pages/Login.tsx'))
const Success = lazy(() => import('./pages/Success.tsx'))
const Cancel = lazy(() => import('./pages/Cancel.tsx'))

import { Layout } from './components/layout/Layout'
import { ProtectedRoutes } from './components/ProtectedRoutes.tsx'
import { Spinner } from './components/Spinner.tsx'
import { useUserStore } from './hooks/use-user.ts'
import { supabase } from './lib/supabase.ts'

export default function App() {
  const { setUser } = useUserStore()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user)
    })
  }, [setUser])

  return (
    <Suspense fallback={<Spinner />}>
      <BrowserRouter>
        <Toaster position="top-center" />

        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="search" element={<Search />} />
            <Route path="service/:id" element={<ServiceDetails />} />

            <Route element={<ProtectedRoutes />}>
              <Route path="create" element={<Create />} />
              <Route path="my-services" element={<MyServices />} />
            </Route>

            <Route path="login" element={<Login />} />

            <Route path="success" element={<Success />} />
            <Route path="cancel" element={<Cancel />} />

            {/* Using path="*"" means "match anything", so this route
          acts like a catch-all for URLs that we don't have explicit
          routes for. */}
            <Route path="not-found" element={<div>Not found</div>} />
            <Route path="*" element={<Navigate to="/not-found" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  )
}
