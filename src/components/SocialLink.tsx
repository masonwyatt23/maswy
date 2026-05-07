import { ArrowUpRight } from 'lucide-react'

export function SocialLink({
  href,
  label,
  icon,
  textIcon,
}: {
  href: string
  label: string
  icon?: React.ReactNode
  textIcon?: string
}) {
  const isExternal = href.startsWith('http')
  return (
    <a
      className="social-link"
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
    >
      {icon ?? <span className="text-icon">{textIcon}</span>}
      <span>{label}</span>
      <ArrowUpRight size={15} aria-hidden="true" />
    </a>
  )
}
