import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { Navigate } from 'react-router-dom'
import { z } from 'zod'

import { Logo } from '~/components/Logo'
import { Button } from '~/components/ui/Button'
import { Input } from '~/components/ui/Input'
import { useUserStore } from '~/hooks/use-user'
import { supabase } from '~/lib/supabase'

const formSchema = z.object({
  email: z
    .string({ required_error: 'Email is required.' })
    .email('Enter a valid email.')
    .min(1, 'Email is required.'),
})
type FormSchema = z.infer<typeof formSchema>

export default function Login() {
  const { isAuthenticated } = useUserStore()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  })
  const [loading, setLoading] = useState(false)

  async function onSubmit({ email }: FormSchema) {
    setLoading(true)

    const loginPromise = supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: import.meta.env.VITE_AUTH_REDIRECT_URL,
      },
    })

    toast.promise(loginPromise, {
      loading: 'Sending confirmation email...',
      success: (response) => {
        if (response.error) return 'Something went wrong. Please try again.'

        return 'Please check your email to login.'
      },
      error: 'Something went wrong. Please try again.',
    })

    loginPromise.then(() => {
      setLoading(false)
    })
  }

  if (isAuthenticated) return <Navigate to="/search" />

  return (
    <div className="container flex flex-col items-center justify-center py-8 lg:min-h-[600px]">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm">
        <Logo className="justify-center" />
        <div className="mt-6 space-y-2">
          <Input
            placeholder="Email Address"
            {...register('email')}
            error={errors.email?.message}
          />
          <Button className="w-full" disabled={loading}>
            Send Magic Link
          </Button>
        </div>
      </form>
    </div>
  )
}
