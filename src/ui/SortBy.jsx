import { useSearchParams } from 'react-router'
import Select from './Select'

function SortBy({ options }) {
  const [serchParams, setSerchParams] = useSearchParams()
  const sortBy = serchParams.get('sortBy') || ''

  const handleChange = (e) => {
    serchParams.set('sortBy', e.target.value)
    setSerchParams(serchParams)
  }

  return (
    <Select
      options={options}
      type='white'
      value={sortBy}
      onChange={handleChange}
    />
  )
}

export default SortBy
