import Boundary from '@/components/boundary'
import Heading from '@/components/heading'
import ContentList from '@/components/content-index/content-list'
import { Content } from '@/types'

type ContentIndexProps = {
  heading: string
  description: string
  contentType: string
  viewMoreText: string
  items: Content[]
}

export default async function ContentIndex({
  heading,
  description,
  contentType,
  viewMoreText,
  items,
}: ContentIndexProps) {
  return (
    <Boundary className='h-screen w-screen'>
      <Heading
        size='xl'
        className='focus-in-expand mb-8'
      >
        {heading}
      </Heading>
      <div className='text-focus-in prose prose-xl prose-invert mb-10'>{description}</div>
      <ContentList
        items={items}
        contentType={contentType}
        viewMoreText={viewMoreText}
      />
    </Boundary>
  )
}
