import { useMutation } from '@tanstack/react-query'
import { signup as signupApi } from '../../services/apiAuth'
import toast from 'react-hot-toast'

export function useSignup() {
  const { mutate: signup, isPending } = useMutation({
    mutationFn: signupApi,
    onSuccess: (user) => {
      console.log(user)
      toast.success(
        "Account succefuly created! Please verify the new account from user's email address."
      )
    },
    onError: (err) => {
      toast.error(err.message || 'An error occurred during sign up')
    },
  })

  return { signup, isPending }
}
