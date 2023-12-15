import { Link } from 'react-router-dom'

import { buttonVariants } from '~/components/ui/buttonVariants'
import { cn } from '~/lib/utils'

export function CTASection() {
  return (
    <section className="bg-white py-12">
      <div className="container">
        <div className="flex flex-col justify-center rounded-2xl bg-[url(/cta-bg.png)] bg-cover bg-no-repeat py-8 lg:min-h-[600px]">
          <div className="w-full max-w-xl p-4 md:pl-8 lg:pl-20">
            <h2 className="text-2xl font-bold text-black md:text-4xl">
              Make Your Horse Happy Now!
            </h2>
            <p className="mt-4 font-medium text-gray-700 md:text-lg">
              Indulge your equine companion in joyous moments and exceptional
              care. Unlock happiness for your horse with our dedicated horsecare
              professionals. Make your horse happy now and cherish the journey
              of well-being together!
            </p>
            <Link to="/search" className={cn(buttonVariants(), 'mt-6')}>
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
