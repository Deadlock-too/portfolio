import NavBar from '@/components/nav-bar'

export default async function Header() {
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
      <NavBar settings={
        {
          data: {
            name: 'Stefan Gabriel Craescu',
            nav_item: pages.map(({ title, href }) => ({ link: href, label: title })),
            cta_label: 'Contact',
            cta_link: 'mailto:craescu.stefangabriel@gmail.com?subject=Contact%20from%20portfolio%20website&body=Hi%20Stefan%2C%0A%0AI%20am%20contacting%20you%20from%20your%20portfolio%20website'
          }
        }
      } />
    </header>
  )
}