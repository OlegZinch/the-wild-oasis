import styled from 'styled-components'
import { useRecentBookings } from './useRecentBookings'
import Spinner from '../../ui/Spinner'
import { useRecentStays } from './useRecentStays'
import Stats from './Stats'
import { useCabins } from '../cabins/useCabins'

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`
function DashboardLayout() {
  const { isPending: isPendingBookings, bookings } = useRecentBookings()
  const {
    isPending: isPendingStays,
    // stays,
    confirmedStays,
    numDays,
  } = useRecentStays()
  const { cabins, isPending: isPendingCabins } = useCabins()

  if (isPendingBookings || isPendingStays || isPendingCabins) return <Spinner />

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCount={cabins?.length ?? 0}
      />
      <div>Today's activity</div>
      <div>Chart stay durations</div>
      <div>Chart sales</div>
    </StyledDashboardLayout>
  )
}

export default DashboardLayout
