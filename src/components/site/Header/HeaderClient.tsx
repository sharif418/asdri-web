'use client'

import * as Accordion from '@radix-ui/react-accordion'
import * as Dialog from '@radix-ui/react-dialog'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import { ChevronDown, Mail, Menu, Phone, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionaries/bn'

import { Brand } from '@/components/site/Brand'
import { LocaleSwitcher } from '@/components/site/LocaleSwitcher'
import { Button } from '@/components/ui/button'
import { cn } from '@/utilities/ui'

export type NavItem = {
  label: string
  href: string
  newTab?: boolean
  description?: string
  children?: NavItem[]
}

type Props = {
  locale: Locale
  brand: {
    name: string
    shortName: string
    parentLine: string | null
    href: string
    logoUrl: string | null
    logoAlt: string | null
  }
  items: NavItem[]
  utility: NavItem[]
  cta: { label: string; href: string } | null
  contact: { phone: string | null; phoneNote: string | null; email: string | null }
  showAccounts: boolean
  dict: Dictionary['header']
  skipLabel: string
}

const telHref = (phone: string) => `tel:${phone.replace(/[^+\d]/g, '')}`

/**
 * Header shell, three rows on desktop like an institutional masthead:
 *   1. utility bar: contact, language, account links
 *   2. masthead: wordmark with the Foundation line, primary action
 *   3. navigation bar (sticky): eight sections with ruled dropdown panels
 * On mobile rows 1 and 3 collapse into a drawer; the masthead row is sticky instead.
 * Eight Bangla labels need room, which is why the nav has its own row rather than squeezing
 * beside the wordmark.
 */
export function HeaderClient({
  locale,
  brand,
  items,
  utility,
  cta,
  contact,
  showAccounts,
  dict,
  skipLabel,
}: Props) {
  const pathname = usePathname()
  const [open, setOpen] = React.useState(false)
  const loginHref = locale === 'bn' ? '/login' : '/en/login'

  // Close the drawer when the route changes (user navigated from inside it).
  React.useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <header className="relative z-40">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:z-50 focus:rounded-sm focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground"
      >
        {skipLabel}
      </a>

      {/* Row 1: utility bar (desktop) */}
      <div className="hidden border-b border-border bg-paper-2/60 lg:block">
        <div className="container flex h-9 items-center justify-between text-caption text-ink-muted">
          <div className="flex items-center gap-5">
            {contact.phone && (
              <a
                href={telHref(contact.phone)}
                className="inline-flex items-center gap-1.5 hover:text-foreground"
              >
                <Phone className="size-3.5" aria-hidden />
                <span dir="ltr">{contact.phone}</span>
                {contact.phoneNote && (
                  <span className="text-ink-muted/80">({contact.phoneNote})</span>
                )}
              </a>
            )}
            {contact.email && (
              <a
                href={`mailto:${contact.email}`}
                className="inline-flex items-center gap-1.5 hover:text-foreground"
              >
                <Mail className="size-3.5" aria-hidden />
                {contact.email}
              </a>
            )}
          </div>
          <div className="flex items-center gap-4">
            <LocaleSwitcher current={locale} label={dict.language} />
            {utility.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-foreground">
                {item.label}
              </Link>
            ))}
            {showAccounts && (
              <Link href={loginHref} className="hover:text-foreground">
                {dict.login}
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Row 2: masthead. Sticky on mobile (it is the only bar there); static on desktop. */}
      <div className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85 lg:static lg:border-b-0 lg:bg-background lg:backdrop-blur-none">
        <div className="container flex h-16 items-center justify-between gap-4 lg:h-24">
          <Brand
            name={brand.name}
            parentLine={brand.parentLine}
            href={brand.href}
            logoUrl={brand.logoUrl}
            logoAlt={brand.logoAlt}
            className="min-w-0 lg:[&_span]:whitespace-nowrap"
            parentLineClassName="hidden md:inline-flex"
          />
          <div className="flex shrink-0 items-center gap-2">
            {cta && (
              <Button asChild size="default" className="hidden sm:inline-flex lg:h-12 lg:px-6">
                <Link href={cta.href}>{cta.label}</Link>
              </Button>
            )}
            <MobileMenu
              open={open}
              onOpenChange={setOpen}
              items={items}
              utility={utility}
              cta={cta}
              contact={contact}
              locale={locale}
              showAccounts={showAccounts}
              dict={dict}
              brand={brand}
            />
          </div>
        </div>
      </div>

      {/* Row 3: navigation bar (desktop), sticky */}
      <div className="hidden border-y border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85 lg:sticky lg:top-0 lg:z-40 lg:block">
        <div className="container">
          <DesktopNav items={items} />
        </div>
      </div>
    </header>
  )
}

function DesktopNav({ items }: { items: NavItem[] }) {
  const pathname = usePathname()
  const isActive = (href: string) =>
    href !== '/' && href !== '/en' && Boolean(pathname?.startsWith(href))

  return (
    <NavigationMenu.Root className="relative" aria-label="Primary">
      <div className="scrollbar-none -mx-2.5 overflow-x-auto xl:-mx-3">
        <NavigationMenu.List className="flex h-12 w-max min-w-full items-stretch">
          {items.map((item) => {
            const hasChildren = (item.children?.length ?? 0) > 0
            const activeGroup = isActive(item.href) || item.children?.some((c) => isActive(c.href))
            const triggerClass = cn(
              'relative inline-flex h-12 items-center gap-1 whitespace-nowrap px-2.5 text-caption font-medium text-foreground transition-colors hover:text-primary xl:px-3 xl:text-small',
              // Active section: a 2px ink rule along the bottom edge, the manuscript's ruling line.
              'after:absolute after:inset-x-2.5 after:bottom-0 after:h-0.5 after:bg-primary after:opacity-0 after:transition-opacity',
              activeGroup && 'text-primary after:opacity-100',
            )
            return (
              <NavigationMenu.Item key={item.href} className="relative">
                {hasChildren ? (
                  <>
                    <NavigationMenu.Trigger
                      className={cn(triggerClass, 'group data-[state=open]:text-primary')}
                    >
                      {item.label}
                      <ChevronDown
                        aria-hidden
                        className="hidden size-3.5 text-ink-muted transition-transform duration-150 group-data-[state=open]:rotate-180 xl:block"
                      />
                    </NavigationMenu.Trigger>
                    <NavigationMenu.Content className="w-[23rem] p-2 data-[motion=from-end]:animate-in data-[motion=from-end]:fade-in-0 data-[motion=from-start]:animate-in data-[motion=from-start]:fade-in-0">
                      <ul className="divide-y divide-border">
                        {item.children!.map((child) => (
                          <li key={child.href}>
                            <NavigationMenu.Link asChild active={isActive(child.href)}>
                              <Link
                                href={child.href}
                                target={child.newTab ? '_blank' : undefined}
                                rel={child.newTab ? 'noopener noreferrer' : undefined}
                                className="block rounded-sm px-3 py-2.5 hover:bg-paper-2 data-[active]:text-primary"
                              >
                                <span className="block text-small font-medium">{child.label}</span>
                                {child.description && (
                                  <span className="mt-0.5 block text-caption text-ink-muted">
                                    {child.description}
                                  </span>
                                )}
                              </Link>
                            </NavigationMenu.Link>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenu.Content>
                  </>
                ) : (
                  <NavigationMenu.Link asChild active={isActive(item.href)}>
                    <Link href={item.href} className={triggerClass}>
                      {item.label}
                    </Link>
                  </NavigationMenu.Link>
                )}
              </NavigationMenu.Item>
            )
          })}
          <NavigationMenu.Indicator className="top-full z-50 flex h-0.5 items-end justify-center overflow-hidden transition-[width,transform] duration-200 data-[state=hidden]:animate-out data-[state=hidden]:fade-out-0 data-[state=visible]:animate-in data-[state=visible]:fade-in-0">
            <span className="h-0.5 w-full bg-primary" />
          </NavigationMenu.Indicator>
        </NavigationMenu.List>
      </div>
      {/* The open panel lives here, outside the scrollable list, left-aligned under the bar. */}
      <div className="absolute left-0 top-full z-50 flex justify-start">
        <NavigationMenu.Viewport className="relative mt-0 h-[var(--radix-navigation-menu-viewport-height)] w-[var(--radix-navigation-menu-viewport-width)] origin-top-left overflow-hidden rounded-b-md border border-t-0 border-border bg-card shadow-[0_12px_28px_-16px_rgba(15,41,32,0.35)] transition-[width,height] duration-200 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0" />
      </div>
    </NavigationMenu.Root>
  )
}

function MobileMenu({
  open,
  onOpenChange,
  items,
  utility,
  cta,
  contact,
  locale,
  showAccounts,
  dict,
  brand,
}: Omit<Props, 'skipLabel'> & { open: boolean; onOpenChange: (open: boolean) => void }) {
  const loginHref = locale === 'bn' ? '/login' : '/en/login'
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden" aria-label={dict.openMenu}>
          <Menu className="size-5" aria-hidden />
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-foreground/30 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <Dialog.Content
          className="fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col bg-background shadow-xl duration-200 data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:animate-in data-[state=open]:slide-in-from-right"
          aria-describedby={undefined}
        >
          <Dialog.Title className="sr-only">{dict.menu}</Dialog.Title>
          <div className="flex h-16 items-center justify-between border-b border-border px-4">
            <Brand name={brand.shortName} href={brand.href} compact />
            <Dialog.Close asChild>
              <Button variant="ghost" size="icon" aria-label={dict.closeMenu}>
                <X className="size-5" aria-hidden />
              </Button>
            </Dialog.Close>
          </div>

          <div className="flex-1 overflow-y-auto px-4 pb-6">
            {cta && (
              <Button asChild className="mt-4 w-full">
                <Link href={cta.href}>{cta.label}</Link>
              </Button>
            )}

            <Accordion.Root
              type="multiple"
              className="mt-4 divide-y divide-border border-y border-border"
            >
              {items.map((item) =>
                item.children && item.children.length > 0 ? (
                  <Accordion.Item key={item.href} value={item.href}>
                    <Accordion.Header>
                      <Accordion.Trigger className="group flex w-full items-center justify-between py-3.5 text-left text-body font-medium">
                        {item.label}
                        <ChevronDown
                          aria-hidden
                          className="size-4 text-ink-muted transition-transform duration-150 group-data-[state=open]:rotate-180"
                        />
                      </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                      <ul className="mb-3 ml-3 border-l border-border">
                        <li>
                          <Link
                            href={item.href}
                            className="block py-2 pl-4 text-small text-ink-muted hover:text-primary"
                          >
                            {item.label}
                          </Link>
                        </li>
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              className="block py-2 pl-4 text-small hover:text-primary"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </Accordion.Content>
                  </Accordion.Item>
                ) : (
                  <div key={item.href}>
                    <Link
                      href={item.href}
                      className="block py-3.5 text-body font-medium hover:text-primary"
                    >
                      {item.label}
                    </Link>
                  </div>
                ),
              )}
            </Accordion.Root>

            <div className="mt-6 space-y-3 text-small">
              <div className="flex items-center justify-between">
                <span className="text-caption text-ink-muted">{dict.language}</span>
                <LocaleSwitcher current={locale} label={dict.language} />
              </div>
              {utility.map((item) => (
                <Link key={item.href} href={item.href} className="block hover:text-primary">
                  {item.label}
                </Link>
              ))}
              {showAccounts && (
                <Link href={loginHref} className="block hover:text-primary">
                  {dict.login}
                </Link>
              )}
              {contact.phone && (
                <a
                  href={telHref(contact.phone)}
                  className="flex items-center gap-2 hover:text-primary"
                >
                  <Phone className="size-4 text-ink-muted" aria-hidden />
                  <span dir="ltr">{contact.phone}</span>
                </a>
              )}
              {contact.email && (
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-2 hover:text-primary"
                >
                  <Mail className="size-4 text-ink-muted" aria-hidden />
                  {contact.email}
                </a>
              )}
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
