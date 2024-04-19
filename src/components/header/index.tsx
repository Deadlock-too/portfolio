import NavBar from '@/components/nav-bar'

export default async function Header({
  currentLanguage,
}: {
  currentLanguage: string
}) {
  const pages = [
    {
      title: 'About',
      href: '/about',
    },
    {
      title: 'Blog',
      href: '/blog',
    },
    {
      title: 'Projects',
      href: '/project',
    }
  ]

  return (
    <header className="top-0 z-50 mx-auto max-w-7xl md:sticky md:top-4">
      <NavBar currentLanguage={currentLanguage} settings={
        {
          data: {
            name: 'Stefan Gabriel Craescu',
            nav_item: pages.map(({ title, href }) => ({ link: href, label: title })),
            cta_label: 'Contact',
            cta_link: 'mailto:craescu.stefangabriel@gmail.com',
          },
          languages: [
            { code: 'en', label: 'English' },
            { code: 'it', label: 'Italiano' },
          ]
        }
      } />
    </header>
  )
}