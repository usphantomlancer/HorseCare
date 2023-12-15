import { Link } from 'react-router-dom'

import { buttonVariants } from '~/components/ui/buttonVariants'

export function HeroSection() {
  return (
    <section>
      <div className="container flex flex-col items-center justify-center gap-10 py-8 md:flex-row md:gap-20 lg:min-h-[700px]">
        <div className="max-w-xl text-center md:text-start">
          <h1 className="text-4xl font-semibold leading-tight xl:text-6xl">
            Tailored Services for Happy, Healthy Horses 🔥
          </h1>
          <p className="mx-auto mt-6 max-w-sm text-xl font-medium text-gray-600 md:mx-0">
            Discover horse specialists dedicated to the well-being of your
            equine companion, fostering joy and health at HorseCare Connect.
          </p>
          <div className="mt-6 flex items-center justify-center gap-2 md:justify-start">
            <Link
              to="/search"
              className={buttonVariants()}
              data-testid="search-button"
            >
              Find Professionals
            </Link>
          </div>
        </div>

        <img
          src="/hero.png"
          className="aspect-square w-[300px] rounded-full object-cover lg:w-[600px]"
        />
      </div>
    </section>
  )
}
