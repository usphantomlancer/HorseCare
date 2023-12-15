import { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'

import { CheckoutButton } from '~/components/CheckoutButton'
import { Spinner } from '~/components/Spinner'
import { buttonVariants } from '~/components/ui/buttonVariants'
import { useUserStore } from '~/hooks/use-user'
import { supabase } from '~/lib/supabase'
import type { Database } from '~/types/database'

export default function ServiceDetails() {
  const { id } = useParams()
  const { isAuthenticated } = useUserStore()
  const [service, setService] = useState<
    Database['public']['Tables']['services']['Row'] | undefined | null
  >(undefined)

  useEffect(() => {
    supabase
      .from('services')
      .select()
      .eq('id', id ?? '')
      .maybeSingle()
      .then(({ data }) => {
        setService(data)
      })
  }, [id])

  if (service === undefined) return <Spinner />
  if (service === null) return <Navigate to="/not-found" replace />

  return (
    <div className="container py-12">
      <h1 className="mb-4 text-2xl font-semibold">{service.title}</h1>
      <p>{service.description}</p>

      <div className="mt-4">
        {isAuthenticated ? (
          <CheckoutButton price={service.price} serviceId={id!} />
        ) : (
          <Link
            to="/login"
            className={buttonVariants({ variant: 'secondary' })}
          >
            Login to Purchase
          </Link>
        )}
      </div>
    </div>
  )
}
