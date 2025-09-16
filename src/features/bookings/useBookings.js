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

  // SORT
  const sortByRaw = searchParams.get('sortBy') || 'startDate-desc'
  const [field, direction] = sortByRaw.split('-')
  const sortBy = { field, direction }

  const {
    data: bookings,
    isPending,
    error,
  } = useQuery({
    queryKey: ['bookings', filter, sortBy],
    queryFn: () => getBookings({ filter, sortBy }),
  })

  return { isPending, error, bookings }
}
