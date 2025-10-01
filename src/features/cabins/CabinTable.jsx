import Spinner from '../../ui/Spinner'
import CabinRow from './CabinRow'
import { useCabins } from './useCabins'
import Table from '../../ui/Table'
import Menus from '../../ui/Menus'
import { useSearchParams } from 'react-router'
import Empty from '../../ui/Empty'

function CabinTable() {
  const { isPending, cabins } = useCabins()
  const [searchParams] = useSearchParams()

  if (isPending) return <Spinner />
  if (!cabins.length) return <Empty resourceName='cabins' />
  // 1) FILTER
  const filterValue = searchParams.get('discount') || 'all'

  let filteredCabins
  if (filterValue === 'all') filteredCabins = cabins
  if (filterValue === 'no-discount')
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0)
  if (filterValue === 'with-discount')
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0)

  // 2) SORT
  const sortBy = searchParams.get('sortBy') || 'created_at-asc'
  const [field, direction] = sortBy.split('-')
  const modifire = direction === 'asc' ? 1 : -1
  const sortCabins =
    field === 'name'
      ? filteredCabins.sort((a, b) => a.name.localeCompare(b.name) * modifire)
      : field === 'created_at'
      ? filteredCabins.sort(
          (a, b) => (new Date(a.created_at) - new Date(b.created_at)) * modifire
        )
      : filteredCabins.sort((a, b) => (a[field] - b[field]) * modifire)

  return (
    <Menus>
      <Table columns='0.6fr 1.8fr 2.2fr 1fr 1fr 1fr'>
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={sortCabins}
          render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
        />
      </Table>
    </Menus>
  )
}

export default CabinTable
