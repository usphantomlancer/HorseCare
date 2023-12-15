import { Link } from 'react-router-dom'
import { formatMoney } from '~/lib/utils'
import type { Database } from '~/types/database'

export function ServiceItem({
  service,
}: {
  service: Database['public']['Tables']['services']['Row']
}) {
  return (
    <Link
      to={`/service/${service.id}`}
      className="rounded border-b bg-white px-6 py-4"
    >
      <h3 className="text-lg font-semibold">{service.title}</h3>
      <p className="mt-1 text-sm font-medium text-gray-600">
        Price: {formatMoney(service.price)}
      </p>
      <p className="mt-4">
        {service.description.length > 380
          ? service.description.substring(0, 380) + '...'
          : service.description}
      </p>
    </Link>
  )
}
