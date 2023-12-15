import { Link } from 'react-router-dom'

import { useUserStore } from '~/hooks/use-user'
import { UserDropdown } from './UserDropdown'
import { buttonVariants } from './ui/buttonVariants'

export function AuthButton() {
  const { isAuthenticated } = useUserStore()

  return isAuthenticated ? (
    <UserDropdown />
  ) : (
    <Link to="/login" className={buttonVariants({ variant: 'secondary' })}>
      Continue with Email
    </Link>
  )
}
