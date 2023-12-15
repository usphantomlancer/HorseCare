import { Link, useLocation, type LinkProps } from 'react-router-dom'

import { cn } from '~/lib/utils'
import { AuthButton } from '../AuthButton'

export function NavLinks() {
  return (
    <ul className="flex items-center gap-4 overflow-auto text-center lg:justify-center lg:overflow-visible">
      <NavItem to="/">Home</NavItem>
      <NavItem to="/search">Find Professionals</NavItem>
      <AuthButton />
    </ul>
  )
}

function NavItem({ className, to, ...props }: LinkProps) {
  const { pathname } = useLocation()

  return (
    <li className="flex-[0_0_auto]">
      <Link
        to={to}
        className={cn(
          'block rounded-lg px-2.5 py-1 font-medium transition duration-200',
          pathname === to ? 'bg-gray-100 text-sky-600' : 'hover:opacity-60',
          className,
        )}
        {...props}
      />
    </li>
  )
}
