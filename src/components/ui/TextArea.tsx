import { forwardRef, type TextareaHTMLAttributes } from 'react'
import { cn } from '~/lib/utils'

export interface TextAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, label, error, id, ...props }, ref) => {
    return (
      <div>
        {label && (
          <label htmlFor={id} className="mb-1 block text-sm font-medium">
            {label}
          </label>
        )}
        <textarea
          className={cn(
            'flex w-full rounded-lg border bg-white px-3 py-2 placeholder:text-gray-600 focus-visible:border-sky-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 disabled:cursor-not-allowed disabled:opacity-50',
            className,
          )}
          id={id}
          ref={ref}
          {...props}
        />

        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    )
  },
)
