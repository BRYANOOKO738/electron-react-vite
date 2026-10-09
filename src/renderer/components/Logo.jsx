import { useId } from 'react';

// The app logo: an app window with a </> code mark, matching assets/icons/icon.png.
// With `animated`, the window and code mark draw themselves in, then the logo floats.
export default function Logo({ size = 120, animated = true, className = '' }) {
  // Unique gradient id, so several logos on one page do not clash.
  const gradientId = `logo-gradient-${useId().replace(/:/g, '')}`;

  // Each stroke has pathLength="1" so the draw animation works for any length.
  const draw = (delayMs) =>
    animated
      ? {
          className: 'animate-draw',
          strokeDasharray: 1,
          style: { animationDelay: `${delayMs}ms` },
        }
      : {};
  const pop = (delayMs) =>
    animated
      ? {
          className: 'animate-pop',
          style: {
            animationDelay: `${delayMs}ms`,
            transformBox: 'fill-box',
            transformOrigin: 'center',
          },
        }
      : {};

  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      {/* Soft coloured glow behind the logo */}
      <div
        aria-hidden="true"
        className={`absolute inset-2 rounded-[30%] bg-gradient-to-br from-sky-400 to-indigo-500 blur-2xl ${
          animated ? 'animate-glow' : 'opacity-50'
        }`}
      />
      <svg
        viewBox="0 0 120 120"
        width={size}
        height={size}
        role="img"
        aria-label="Electron React Vite logo"
        className={`relative ${animated ? 'animate-float' : ''}`}
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0ea5e9" />
            <stop offset="100%" stopColor="#4f46e5" />
          </linearGradient>
        </defs>
        <rect x="10" y="10" width="100" height="100" rx="24" fill={`url(#${gradientId})`} />
        <g fill="none" stroke="#fff" strokeWidth="4.8" strokeLinecap="round" strokeLinejoin="round">
          <rect
            x="26.4"
            y="32.4"
            width="67.2"
            height="55.2"
            rx="7.2"
            pathLength="1"
            {...draw(150)}
          />
          <path d="M26.4 45.6H93.6" pathLength="1" {...draw(700)} />
          <path d="M48 56.4 39.6 66.6 48 76.8" pathLength="1" {...draw(1000)} />
          <path d="M63.6 54.9 56.4 78.3" pathLength="1" {...draw(1150)} />
          <path d="M72 56.4 80.4 66.6 72 76.8" pathLength="1" {...draw(1300)} />
        </g>
        <g fill="#fff">
          <circle cx="36" cy="41.4" r="1.9" {...pop(900)} />
          <circle cx="42.6" cy="41.4" r="1.9" {...pop(980)} />
          <circle cx="49.2" cy="41.4" r="1.9" {...pop(1060)} />
        </g>
      </svg>
    </div>
  );
}
