import { useEffect, useState } from 'react'

import { ServiceItem } from '~/components/ServiceItem'
import { Spinner } from '~/components/Spinner'
import { useUserStore } from '~/hooks/use-user'
import { supabase } from '~/lib/supabase'
import type { Database } from '~/types/database'

export default function MyServices() {
  const { user, status } = useUserStore()
  const [services, setServices] = useState<
    Database['public']['Tables']['services']['Row'][] | undefined
  >(undefined)

  useEffect(() => {
    if (status === 'loaded') {
      supabase
        .from('services')
        .select()
        .eq('user_id', user?.id ?? '')
        .then(({ data }) => {
          setServices(data ?? [])
        })
    }
  }, [user, status])

  if (services === undefined) return <Spinner />

  return (
    <div className="container py-12">
      <h1 className="mb-8 text-2xl font-semibold">My Services</h1>

      <div className="grid gap-2">
        {services.map((service) => (
          <ServiceItem service={service} key={service.id} />
        ))}
      </div>
    </div>
  )
}
