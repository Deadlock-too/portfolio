import Boundary from '@/components/boundary'
import ContentNotFound from '@/components/content-not-found'

export default function NotFound() {
  return (
    <Boundary>
      <ContentNotFound contentType="project" />
    </Boundary>
  )
}