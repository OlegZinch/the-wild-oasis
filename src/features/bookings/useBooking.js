import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router'
import { getBooking } from '../../services/apiBookings'

export function useBooking() {
  const { bookingId } = useParams()

  const {
    data: booking,
    isPending,
    error,
  } = useQuery({
    queryKey: ['booking'],
    queryFn: () => getBooking(bookingId),
    retry: false,
  })

  return { isPending, error, booking }
}
