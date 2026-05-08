import { ArrowUpRight } from 'lucide-react'
import { FaLinkedinIn } from 'react-icons/fa6'
import { SiGithub, SiInstagram, SiSubstack, SiX } from 'react-icons/si'

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
  const brandIcon = icon ?? getBrandIcon(href, label)
  return (
    <a
      className="social-link"
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
    >
      <span className="brand-icon" aria-hidden="true">
        {brandIcon ?? <span className="text-icon">{textIcon}</span>}
      </span>
      <span>{label}</span>
      <ArrowUpRight size={15} aria-hidden="true" />
    </a>
  )
}

function getBrandIcon(href: string, label: string) {
  const key = `${href} ${label}`.toLowerCase()
  if (key.includes('linkedin')) return <FaLinkedinIn />
  if (key.includes('github') || label.toLowerCase() === 'repo') return <SiGithub />
  if (key.includes('substack')) return <SiSubstack />
  if (key.includes('instagram')) return <SiInstagram />
  if (key.includes('x.com') || label.toLowerCase() === 'x') return <SiX />
  return null
}
