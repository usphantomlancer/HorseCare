import debounce from 'lodash.debounce'
import { useEffect, useState } from 'react'

import { ServiceItem } from '~/components/ServiceItem'
import { Spinner } from '~/components/Spinner'
import { Input } from '~/components/ui/Input'
import { supabase } from '~/lib/supabase'
import type { Database } from '~/types/database'

export default function Search() {
  const [services, setServices] = useState<
    Database['public']['Tables']['services']['Row'][] | undefined
  >(undefined)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    supabase
      .from('services')
      .select()
      .then(({ data }) => {
        setServices(data ?? [])
      })
  }, [])

  useEffect(() => {
    const debouncedSearch = debounce(handleSearch, 1000)
    function handleSearch() {
      supabase
        .from('services')
        .select()
        .ilike('title', `%${searchQuery.toLocaleLowerCase()}%`)
        .then(({ data }) => {
          setServices(data ?? [])
        })
    }

    debouncedSearch()
  }, [searchQuery])

  if (services === undefined) return <Spinner />

  return (
    <div className="container py-12">
      <h1 className="mb-8 text-2xl font-semibold">Services</h1>

      <div>
        <Input
          type="text"
          placeholder="Search here..."
          className="mb-4"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid gap-2">
        {services.map((service) => (
          <ServiceItem service={service} key={service.id} />
        ))}
      </div>
    </div>
  )
}
