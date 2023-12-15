import { Link } from 'react-router-dom'
import { Logo } from '../Logo'
import { NavLinks } from './NavLinks'

export function Navbar() {
  return (
    <nav className="w-full border-b bg-white">
      <div className="container flex min-h-[56px] flex-wrap items-center justify-between gap-4 py-4 lg:py-0">
        <div>
          <Link to="/">
            <Logo />
          </Link>
        </div>
        <NavLinks />
      </div>
    </nav>
  )
}
