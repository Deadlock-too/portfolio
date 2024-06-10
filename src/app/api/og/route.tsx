import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const title = request.nextUrl.searchParams.get('title')
  const description = request.nextUrl.searchParams.get('description')
  const height = parseInt(request.nextUrl.searchParams.get('height') ?? '630')
  const width = parseInt(request.nextUrl.searchParams.get('width') ?? '1200')

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          position: 'relative',
          padding: '5rem',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
          background: 'black',
        }}
      >
        <p
          style={{
            fontSize: '4rem',
            lineHeight: '1',
            fontWeight: '700',
            letterSpacing: '-0.05em',
            textAlign: 'center',
            whiteSpace: 'pre-wrap',
            backgroundImage: 'linear-gradient(to bottom, #FEF08A, #FACC15, #CA8A04)',
            backgroundClip: 'text',
            color: 'transparent',
            height: '80px',
          }}
        >
          {title}
        </p>
        <p
          style={{
            fontSize: '2rem',
            lineHeight: '1',
            fontWeight: '500',
            letterSpacing: '-0.05em',
            textAlign: 'center',
            whiteSpace: 'pre-wrap',
            backgroundImage: 'linear-gradient(to bottom, #CA8A04, #FACC15, #FEF08A)',
            backgroundClip: 'text',
            color: 'transparent',
            height: '115px',
          }}
        >
          {description}
        </p>
        <p
          style={{
            position: 'absolute',
            bottom: '4.25rem',
            left: '21.5rem',
          }}
        >
          <svg
            x='0px'
            y='0px'
            viewBox='0 0 500 625'
            fill='#FACC15'
            height={625 / 10}
            width={500 / 10}
          >
            <g>
              <g>
                <g>
                  <path d='M36.8,138.4c20.4,15,40.9,30,61.3,45.1c32.5,23.9,65.1,47.8,97.6,71.7c7.4,5.5,14.8,10.9,22.2,16.4 c0-14.4,0-28.8,0-43.2c-20.4,15-40.9,30-61.3,45.1c-32.5,23.9-65.1,47.8-97.6,71.7c-7.4,5.5-14.8,10.9-22.2,16.4 c-5.4,4-9.6,8.2-11.5,14.9c-1.6,6-0.9,14,2.5,19.3c6.7,10.4,22.9,17.3,34.2,9c20.4-15,40.9-30,61.3-45.1 c32.5-23.9,65.1-47.8,97.6-71.7c7.4-5.5,14.8-10.9,22.2-16.4c7.3-5.4,12.4-12.1,12.4-21.6c0-9.5-5.1-16.2-12.4-21.6 c-20.4-15-40.9-30-61.3-45.1c-32.5-23.9-65.1-47.8-97.6-71.7c-7.4-5.5-14.8-10.9-22.2-16.4c-4.9-3.6-13.7-4.1-19.3-2.5 c-5.8,1.6-12.1,6.1-14.9,11.5C21,117.2,25.5,130.1,36.8,138.4L36.8,138.4z' />
                </g>
              </g>
              <g>
                <g>
                  <path d='M231.2,408.6c24.7,0,49.5,0,74.2,0c39.3,0,78.5,0,117.8,0c9.1,0,18.2,0,27.2,0c13.1,0,25.6-11.5,25-25 c-0.6-13.5-11-25-25-25c-24.7,0-49.5,0-74.2,0c-39.3,0-78.5,0-117.8,0c-9.1,0-18.2,0-27.2,0c-13.1,0-25.6,11.5-25,25 C206.8,397.1,217.2,408.6,231.2,408.6L231.2,408.6z' />
                </g>
              </g>
            </g>
          </svg>
        </p>
        <svg
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            fill: 'rgb(163 163 163 / 0.8)',
            maskImage: 'radial-gradient(400px circle at center,black,transparent)',
            transform: 'translate(7.5%, 20%)',
          }}
          aria-hidden='true'
        >
          <defs>
            <pattern
              id='circles'
              width={8}
              height={8}
              patternUnits='userSpaceOnUse'
              patternContentUnits='userSpaceOnUse'
              x={0}
              y={0}
            >
              <circle
                id='pattern-circle'
                cx={1}
                cy={1}
                r={0.35}
                fill='#EAB308'
              />
            </pattern>
          </defs>
          <rect
            width='200%'
            height='100%'
            strokeWidth={0}
            fill='url(#circles)'
          />
        </svg>
      </div>
    ),
    {
      width: width,
      height: height,
    },
  )
}
