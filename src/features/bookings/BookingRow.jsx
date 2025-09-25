import { useNavigate, useSearchParams } from 'react-router'
import styled from 'styled-components'
import { format, isToday } from 'date-fns'
import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiEye,
  HiTrash,
} from 'react-icons/hi2'

import Tag from '../../ui/Tag'
import Table from '../../ui/Table'
import Menus from '../../ui/Menus'
import Modal from '../../ui/Modal'
import ConfirmDelete from '../../ui/ConfirmDelete'

import { formatCurrency } from '../../utils/helpers'
import { formatDistanceFromNow } from '../../utils/helpers'
import { useCheckout } from '../check-in-out/useCheckout'
import { useDeleteBooking } from './useDeleteBooking'
import { PAGE_SIZE } from '../../utils/constants'

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`

const Amount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
`

function BookingRow({
  booking: {
    id: bookingId,
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    totalPrice,
    status,
    guests: { fullName: guestName, email },
    cabins: { name: cabinName },
  },
  count,
}) {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const { checkout, isCheckingOut } = useCheckout()
  const { deleteBooking, isDeleting } = useDeleteBooking()

  const statusToTagName = {
    unconfirmed: 'blue',
    'checked-in': 'green',
    'checked-out': 'silver',
  }

  const deleteBookingHandler = () => {
    const page = +searchParams.get('page') || 1
    if (page > 1 && count % PAGE_SIZE === 1) {
      // We have the last item on the page, so we need to go back one page
      searchParams.set('page', page - 1)
      setSearchParams(searchParams)
    }
    deleteBooking(bookingId)
  }

  return (
    <Table.Row>
      <Cabin>{cabinName}</Cabin>

      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(startDate))
            ? 'Today'
            : formatDistanceFromNow(startDate)}
          &nbsp;&rarr;&nbsp;{numNights} night stay
        </span>
        <span>
          {format(new Date(startDate), 'MMM dd yyyy')}&nbsp;&mdash;&nbsp;
          {format(new Date(endDate), 'MMM dd yyyy')}
        </span>
      </Stacked>

      <Tag type={statusToTagName[status]}>{status.replace('-', ' ')}</Tag>

      <Amount>{formatCurrency(totalPrice)}</Amount>

      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={bookingId} />
          <Menus.List id={bookingId}>
            <Menus.Button
              icon={<HiEye />}
              onClick={() => navigate(`/bookings/${bookingId}`)}
            >
              See details
            </Menus.Button>

            {status === 'unconfirmed' && (
              <Menus.Button
                icon={<HiArrowDownOnSquare />}
                onClick={() => navigate(`/checkin/${bookingId}`)}
              >
                Check in
              </Menus.Button>
            )}

            {status === 'checked-in' && (
              <Menus.Button
                icon={<HiArrowUpOnSquare />}
                onClick={() => checkout(bookingId)}
                disabled={isCheckingOut}
              >
                Check out
              </Menus.Button>
            )}

            <Modal.Open opens='delete'>
              <Menus.Button icon={<HiTrash />}>Delete booking</Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>

        <Modal.Window name='delete'>
          <ConfirmDelete
            resourceName='booking'
            // onConfirm={() => {
            //   // navigate('/bookings')
            //   deleteBooking(bookingId)
            // }}
            onConfirm={deleteBookingHandler}
            disabled={isDeleting}
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  )
}

export default BookingRow
