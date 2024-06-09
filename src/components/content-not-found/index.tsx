import Boundary from '@/components/boundary'
import Button from '@/components/button'

export default function ContentNotFound({
  contentType
}: {
  contentType: 'blog' | 'project'
}) {
  const content = contentType === 'blog' ? 'blog post' : 'project'

  return (
    <Boundary className="min-h-[50vh]">
      <div className="jello-horizontal overflow-hidden flex flex-col min-h-[50vh] items-center justify-center px-4 text-center gap-16">
        <div className="space-y-4">
          <h1 className="text-white text-3xl font-bold tracking-tighter sm:text-5xl">Oops! That { content } doesn’t exist.</h1>
          <p
            className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400"
          >
            We can’t seem to find the { content } you’re looking for. Try going back to the previous page.
          </p>
        </div>
        <Button
          url={ '/' + contentType }
          label={ 'Go back' }
          showIcon={false}
          target={ '_self' }
        />
      </div>
    </Boundary>
  )
}