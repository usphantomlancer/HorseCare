import { cva } from 'class-variance-authority'

export const buttonVariants = cva(
  'h-10 px-4 py-2 gap-2 inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-sky-600 text-white hover:bg-sky-700',
        secondary: 'bg-gray-200 text-black hover:bg-gray-300',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  },
)
