import { useEffect } from 'react'
import styled from 'styled-components'
import { useUser } from '../features/authentication/useUser'
import Spinner from './Spinner'
import { useNavigate } from 'react-router'

const FullPage = styled.div`
  height: 100dvh;
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  align-items: center;
`

function ProtectedRoute({ children }) {
  const navigate = useNavigate()

  // 1. Load the authenticated user
  const { isPending, isAuthenticated } = useUser()

  // 2. If there NO authenticated user, redirect to /login
  useEffect(() => {
    if (!isAuthenticated && !isPending) navigate('/login')
  }, [isAuthenticated, isPending, navigate])

  // 3. While loading, show a spinner
  if (isPending)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    )

  // 4. If there IS a user, render the app
  if (isAuthenticated) return children
}

export default ProtectedRoute
