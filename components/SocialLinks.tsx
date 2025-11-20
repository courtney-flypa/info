'use client';

interface SocialLink {
  name: string;
  url: string;
  icon: React.ReactNode;
  hoverColor: string;
}

// Instagram Icon
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

// X (Twitter) Icon
const XIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

// Threads Icon
const ThreadsIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12.186 8.302c.208 0 .404.024.61.036v3.821a5.5 5.5 0 0 1-.61.036c-2.916 0-5.301-2.385-5.301-5.301 0-2.916 2.385-5.301 5.301-5.301 1.188 0 2.27.4 3.162 1.062l1.532-1.532A7.784 7.784 0 0 0 12.186.5C7.303.5 3.336 4.467 3.336 9.35c0 4.883 3.967 8.85 8.85 8.85a7.784 7.784 0 0 0 5.19-1.968l-1.532-1.532a5.3 5.3 0 0 1-3.658 1.47c-2.916 0-5.301-2.385-5.301-5.301 0-2.916 2.385-5.301 5.301-5.301zm7.789-1.86h1.94c.05.33.076.666.076 1.008 0 5.523-4.477 10-10 10S2 13.997 2 8.474 6.477-1.526 12-1.526c1.662 0 3.22.405 4.594 1.11l-1.619 1.619zm-1.94 2.868v1.94h-1.94v-1.94zm-5.849 2.892c-1.188 0-2.27-.4-3.162-1.062l-1.532 1.532A7.784 7.784 0 0 0 12.186 18.2c4.883 0 8.85-3.967 8.85-8.85 0-1.662-.405-3.22-1.11-4.594l-1.619 1.619a5.3 5.3 0 0 1 1.47 3.658c0 2.916-2.385 5.301-5.301 5.301z" />
  </svg>
);

// GitHub Icon
const GitHubIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const socialLinks: SocialLink[] = [
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/teresa._.0712/',
    icon: <InstagramIcon className="w-6 h-6" />,
    hoverColor: 'hover:bg-gradient-to-br hover:from-pink-500 hover:via-purple-500 hover:to-orange-500',
  },
  {
    name: 'X (Twitter)',
    url: 'https://x.com/home',
    icon: <XIcon className="w-5 h-5" />,
    hoverColor: 'hover:bg-black',
  },
  {
    name: 'Threads',
    url: 'https://www.threads.com/',
    icon: <ThreadsIcon className="w-6 h-6" />,
    hoverColor: 'hover:bg-black',
  },
  {
    name: 'GitHub',
    url: 'https://github.com/courtney-flypa',
    icon: <GitHubIcon className="w-6 h-6" />,
    hoverColor: 'hover:bg-gray-800',
  },
];

export default function SocialLinks() {
  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-3">
      {socialLinks.map((link) => (
        <a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative"
          aria-label={link.name}
        >
          <div className={`w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center border-2 border-white/50 hover:scale-110 active:scale-95 ${link.hoverColor} group-hover:text-white`}>
            <div className="text-gray-700 group-hover:text-white transition-colors">
              {link.icon}
            </div>
          </div>
          {/* 工具提示 */}
          <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
            <div className="bg-gray-800 text-white text-sm px-3 py-1.5 rounded-lg shadow-lg">
              {link.name}
              <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-gray-800"></div>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}

