import { Link } from 'react-router-dom'
import { usePageTitle } from '@/lib/usePageTitle'

export function NotFound() {
  usePageTitle('Page not found · Articulate')
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-[1240px] flex-col items-start justify-center px-5 py-24 sm:px-8">
      <p className="font-display text-[clamp(3rem,8vw,5.5rem)] font-bold leading-none">nonexistent</p>
      <p className="mt-3 text-ink-soft">
        <em>adjective</em>: not existing or not real, like the page at this address.
      </p>
      <Link to="/" className="btn btn-ink mt-10">
        Go to the home page
      </Link>
    </div>
  )
}
