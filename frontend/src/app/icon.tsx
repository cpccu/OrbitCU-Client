import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#DC2626',
          borderRadius: '8px',
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 70 70"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M35 16L55 27L35 38L15 27L35 16Z" fill="#FFFFFF" />
          <path
            d="M23 44L35 52L47 44"
            stroke="#09090B"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="35" cy="35" r="3.5" fill="#DC2626" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
