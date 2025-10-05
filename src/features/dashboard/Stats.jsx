import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from 'react-icons/hi2'
import Stat from './Stat'
import { formatCurrency } from '../../utils/helpers'

function Stats({ bookings, confirmedStays, numDays, cabinCount }) {
  // 1.
  const numBookings = bookings?.length ?? 0
  // 2.
  const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0)
  // 3.
  const checkins = confirmedStays?.length ?? 0
  // 4.
  const occupancy =
    confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
    (numDays * (cabinCount || 1))
  // num checked ins nights / all available nights (num days * num cabins) * 100

  return (
    <>
      <Stat
        title='Bookings'
        color='blue'
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title='Sales'
        color='green'
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title='Checks ins'
        color='indigo'
        icon={<HiOutlineCalendarDays />}
        value={checkins}
      />
      <Stat
        title='Occupancy rate'
        color='yellow'
        icon={<HiOutlineChartBar />}
        value={Math.round(occupancy * 100) + '%'}
      />
    </>
  )
}

export default Stats
