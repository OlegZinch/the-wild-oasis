import { useSearchParams } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import { getBookings } from '../../services/apiBookings'

export function useBookings() {
  const [searchParams] = useSearchParams()

  // FILTER
  const filterValue = searchParams.get('status') || 'all'
  const filter =
    !filterValue || filterValue === 'all'
      ? null
      : { field: 'status', value: filterValue }
  // { field: 'totalPrice', value: 5000, method: 'gte' }

  const {
    data: bookings,
    isPending,
    error,
  } = useQuery({
    queryKey: ['bookings', filter],
    queryFn: () => getBookings({ filter }),
  })

  return { isPending, error, bookings }
}
