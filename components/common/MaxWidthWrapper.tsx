import { cn } from '@/lib/utils'  // Utility function for conditional class names
import { ReactNode } from 'react' // Type for acceptable children elements

// MaxWidthWrapper component to apply consistent max-width and centering styles
const MaxWidthWrapper = ({
  className,  // Optional additional class names
  children,   // Content or elements to be wrapped
}: {
  className?: string
  children: ReactNode
}) => {
  return (
    <div
      className={cn(
        'mx-auto w-full max-w-screen-xl px-2.5 md:px-20', // Centering, full width, max-width, and padding
        className // Merges with any additional class names
      )}
    >
      {children} {/* Renders the wrapped content */}
    </div>
  )
}

export default MaxWidthWrapper // Allows other files to use MaxWidthWrapper
