import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const title = request.nextUrl.searchParams.get('title')
  const description = request.nextUrl.searchParams.get('description')

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
      width: 1200,
      height: 630,
    },
  )
}
