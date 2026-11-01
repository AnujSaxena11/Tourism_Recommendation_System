import React from "react";
import { ArrowRight, Send, Plane } from "lucide-react";

const Instagram = ({ size = 21, strokeWidth = 2.2, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const Youtube = ({ size = 21, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const Linkedin = ({ size = 21, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.44a1.64 1.64 0 0 0-1.64 1.64c0 .91.73 1.64 1.64 1.64 1 0 1.64-.73 1.64-1.64 0-.91-.64-1.64-1.64-1.64z" />
  </svg>
);

const CompassLogo = () => (
  <svg viewBox="0 0 200 200" className="h-14 w-14 sm:h-16 sm:w-16 shrink-0 drop-shadow-md">
    <defs>
      <radialGradient id="footerMedallion" cx="50%" cy="40%" r="60%">
        <stop offset="0%" stopColor="#1a4055" />
        <stop offset="65%" stopColor="#0f2937" />
        <stop offset="100%" stopColor="#081b25" />
      </radialGradient>
      <linearGradient id="footerBronzeLight" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#d8a368" />
        <stop offset="100%" stopColor="#b6844b" />
      </linearGradient>
      <linearGradient id="footerBronzeDark" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#a3713b" />
        <stop offset="100%" stopColor="#86592a" />
      </linearGradient>
      <linearGradient id="footerRingBronze" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#cca26a" />
        <stop offset="45%" stopColor="#b3824c" />
        <stop offset="85%" stopColor="#996935" />
        <stop offset="100%" stopColor="#b88851" />
      </linearGradient>
      <g id="footerStarRay">
        <polygon points="100,18 87.06,51.7 100,50" fill="url(#footerBronzeLight)" />
        <polygon points="100,18 100,50 112.94,51.7" fill="url(#footerBronzeDark)" />
        <line x1="100" y1="18" x2="100" y2="50" stroke="#7e532b" strokeWidth="0.75" />
      </g>
      <g id="footerDialRay">
        <line x1="100" y1="94" x2="100" y2="53" stroke="#ffffff" strokeWidth="0.9" opacity="0.9" />
        <path d="M 94.5 56.5 Q 98 58 100 62.5 Q 102 58 105.5 56.5 Q 102 59.5 100 64 Q 98 59.5 94.5 56.5 Z" fill="#ffffff" opacity="0.95" />
      </g>
    </defs>
    <circle cx="100" cy="100" r="95" fill="#ffffff" />
    <circle cx="100" cy="100" r="93" fill="none" stroke="#0d2735" strokeWidth="6.5" />
    <circle cx="100" cy="100" r="82" fill="none" stroke="url(#footerRingBronze)" strokeWidth="4.2" />
    {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
      <use key={deg} href="#footerStarRay" transform={`rotate(${deg} 100 100)`} />
    ))}
    <circle cx="100" cy="100" r="50" fill="url(#footerMedallion)" stroke="#091b26" strokeWidth="1.2" />
    {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
      <use key={deg} href="#footerDialRay" transform={`rotate(${deg} 100 100)`} />
    ))}
    <circle cx="100" cy="100" r="4.2" fill="#0d2735" stroke="#ffffff" strokeWidth="1.2" />
    <circle cx="100" cy="100" r="1.8" fill="#d49f63" />
  </svg>
);

const Cloud = ({ className = "" }) => (
  <svg
    viewBox="0 0 150 80"
    fill="none"
    className={`pointer-events-none absolute ${className}`}
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="cloudGradient" x1="75" y1="12" x2="75" y2="72">
        <stop stopColor="#ffffff" />
        <stop offset="1" stopColor="#dbe9fa" />
      </linearGradient>
    </defs>
    <path
      d="M20 59 C7 59 5 43 17 37 C22 34 28 34 33 37 C34 20 49 11 63 18 C72 -1 99 5 103 25 C121 17 138 29 135 44 C148 48 146 62 133 63 L20 63 Z"
      fill="url(#cloudGradient)"
      stroke="#d8e6f7"
      strokeWidth="2"
    />
    <path
      d="M22 52 C42 57 62 53 79 55 C99 58 117 53 134 49"
      stroke="#ffffff"
      strokeWidth="3"
      strokeLinecap="round"
      opacity=".9"
    />
  </svg>
);

const MountainScene = () => (
  <svg
    viewBox="0 0 1440 310"
    preserveAspectRatio="xMidYMax slice"
    className="absolute inset-x-0 bottom-0 h-full w-full"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="mountainFill" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#b7cdea" />
        <stop offset="100%" stopColor="#eaf2fc" />
      </linearGradient>
      <linearGradient id="sunFill" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#ffdca5" />
        <stop offset="100%" stopColor="#fff5e6" />
      </linearGradient>
    </defs>

    <circle cx="770" cy="125" r="54" fill="url(#sunFill)" />

    <path
      d="M0 230 L90 180 L150 205 L240 140 L315 215 L400 155 L465 200 L555 115 L640 200 L710 125 L790 205 L875 105 L950 200 L1035 140 L1115 218 L1210 145 L1300 205 L1370 165 L1440 210 V310 H0Z"
      fill="url(#mountainFill)"
      opacity=".9"
    />

    <path
      d="M470 205 L555 115 L595 165 L570 153 L555 169 L544 153 L522 185 L510 178Z
         M805 195 L875 105 L923 167 L895 151 L875 128 L856 157 L840 147Z
         M1140 225 L1210 145 L1250 193 L1224 180 L1210 164 L1190 190 L1175 183Z"
      fill="#ffffff"
      opacity=".95"
    />

    <path
      d="M0 265 Q120 225 230 263 T455 245 T700 258 T950 242 T1190 258 T1440 235 V310 H0Z"
      fill="#f5f9ff"
    />
    <path
      d="M0 285 Q150 250 300 279 T620 274 T950 282 T1250 265 T1440 280 V310 H0Z"
      fill="#ffffff"
    />

    {Array.from({ length: 16 }).map((_, i) => (
      <g key={i} transform={`translate(${i * 95 - 10} ${245 + (i % 3) * 13})`}>
        <path
          d="M0 0 L-13 23 H-6 L-17 39 H17 L6 23 H13Z"
          fill="#9eb7d8"
          opacity=".65"
        />
        <rect x="-2" y="37" width="4" height="9" fill="#9eb7d8" opacity=".65" />
      </g>
    ))}
  </svg>
);

const socialLinks = [
  {
    name: "Instagram",
    href: "https://instagram.com",
    className: "bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 text-white",
    icon: Instagram,
  },
  {
    name: "YouTube",
    href: "https://youtube.com",
    className: "bg-red-600 text-white",
    icon: Youtube,
  },
  {
    name: "X",
    href: "https://x.com",
    className: "bg-black text-white",
    icon: null,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com",
    className: "bg-blue-600 text-white",
    icon: Linkedin,
  },
];

const linkGroups = [
  {
    title: "PRODUCT",
    links: [
      "Destinations",
      "AI Trip Planner",
      "Budget Estimator",
      "Itinerary Builder",
      "AI Booking Agent",
    ],
  },
  {
    title: "COMMUNITY",
    links: [
      "Public Trips",
      "Travel Stories",
      "Meet Travellers",
      "Leaderboard",
      "Events",
    ],
  },
  {
    title: "SUPPORT",
    links: [
      "Help Center",
      "Travel Guides",
      "Safety Tips",
      "FAQs",
      "Contact Us",
    ],
  },
];

const Footer = () => {
  const handleNewsletter = (e) => {
    e.preventDefault();
    const email = new FormData(e.currentTarget).get("email");

    if (!email) return;

    // Connect your newsletter API here.
    alert(`Thanks for subscribing with ${email}!`);
    e.currentTarget.reset();
  };

  return (
    <footer className="relative overflow-hidden bg-[#f4f8fd] px-4 pt-12 sm:px-6 md:pt-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,#ffffff_30%,#f1f6fc_100%)]" />

      <div className="relative mx-auto max-w-[1440px] overflow-hidden rounded-t-[36px] border border-white/90 bg-white/90 shadow-[0_-10px_60px_rgba(72,108,150,0.06)]">
        {/* Decorative clouds */}
        <Cloud className="-left-10 top-44 z-10 w-28 sm:w-36" />
        <Cloud className="left-[34%] top-5 w-24 sm:w-32" />
        <Cloud className="right-5 top-6 w-24 sm:w-32" />
        <Cloud className="-right-12 top-[58%] z-10 w-32 sm:w-40" />

        {/* Main footer columns */}
        <div className="relative z-10 grid grid-cols-1 gap-x-10 gap-y-12 px-6 py-12 sm:px-10 md:px-12 lg:grid-cols-12 lg:gap-x-8 lg:px-12 lg:py-16 xl:px-16">
          {/* Brand */}
          <div className="lg:col-span-4">
            <a
              href="/"
              aria-label="Ghummakad home"
              className="group mb-6 flex w-fit items-center gap-4"
            >
              <span className="transition-transform duration-300 group-hover:rotate-6">
                <CompassLogo />
              </span>

              <span>
                <span className="flex items-start gap-2 text-[30px] font-black leading-none tracking-tight text-[#071a30] sm:text-[36px]">
                  GHUMAKKAD
                  <span className="mt-0.5 text-xl text-amber-400">✦</span>
                </span>

                <span className="mt-2 block text-xs font-extrabold tracking-[0.3em] text-slate-400 sm:text-sm">
                  AI TRAVEL COMPANION
                </span>
              </span>
            </a>

            <p className="max-w-[390px] text-[15px] leading-7 text-slate-600">
              Your intelligent companion for seamless destination discovery,
              smart itineraries, community trips and stress-free bookings.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              {socialLinks.map(({ name, href, className, icon: Icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={name}
                  className={`flex h-11 w-11 items-center justify-center rounded-xl shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg ${className}`}
                >
                  {Icon ? (
                    <Icon size={21} strokeWidth={2.2} />
                  ) : (
                    <span className="text-lg font-black">𝕏</span>
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation groups */}
          {linkGroups.map((group) => (
            <div key={group.title} className="lg:col-span-2">
              <h3 className="mb-6 text-[14px] font-black tracking-wide text-[#071a30]">
                {group.title}
              </h3>

              <ul className="space-y-4">
                {group.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-[14px] text-slate-600 transition-colors duration-200 hover:text-amber-600"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div className="lg:col-span-2">
            <h3 className="mb-4 text-[14px] font-black tracking-wide text-[#071a30]">
              STAY IN THE LOOP
            </h3>

            <p className="mb-5 max-w-[280px] text-[14px] leading-6 text-slate-600">
              Get travel tips, new destinations and exclusive updates.
            </p>

            <form
              onSubmit={handleNewsletter}
              className="flex w-full max-w-[320px] items-center rounded-full border border-slate-200 bg-slate-50 p-1.5 transition focus-within:border-amber-400 focus-within:ring-4 focus-within:ring-amber-100"
            >
              <input
                type="email"
                name="email"
                required
                placeholder="Enter your email"
                aria-label="Email address"
                className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm text-slate-800 outline-none placeholder:text-slate-400"
              />

              <button
                type="submit"
                aria-label="Subscribe to newsletter"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#071a30] text-white transition hover:bg-amber-500"
              >
                <ArrowRight size={20} />
              </button>
            </form>

            {/* Flight path */}
            <div className="relative mt-7 hidden h-16 max-w-[300px] sm:block">
              <svg
                viewBox="0 0 300 75"
                className="h-full w-full"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M25 18 C80 2 78 72 139 54 S190 8 225 30 S258 63 286 42"
                  stroke="#b7c3d5"
                  strokeWidth="1.8"
                  strokeDasharray="5 7"
                  strokeLinecap="round"
                />
              </svg>
              <Send
                size={30}
                strokeWidth={1.5}
                className="absolute left-3 top-1 rotate-[-15deg] text-slate-400"
              />
            </div>
          </div>
        </div>

        {/* Copyright and legal links */}
        <div className="relative z-10 mx-6 border-t border-slate-200 sm:mx-10 md:mx-12 lg:mx-12 xl:mx-16">
          <div className="flex flex-col gap-5 py-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 Ghummakad. All rights reserved.</p>

            <nav
              aria-label="Legal navigation"
              className="flex flex-wrap gap-x-6 gap-y-3"
            >
              <a href="/privacy" className="transition hover:text-amber-600">
                Privacy Policy
              </a>
              <a href="/terms" className="transition hover:text-amber-600">
                Terms of Service
              </a>
              <a href="/sitemap" className="transition hover:text-amber-600">
                Sitemap
              </a>
            </nav>
          </div>
        </div>

        {/* Large illustrated brand section */}
        <div className="relative h-[190px] overflow-hidden sm:h-[240px] md:h-[290px] lg:h-[310px]">
          <MountainScene />

          <div className="pointer-events-none absolute inset-x-0 top-10 z-[1] flex justify-center px-2 sm:top-8">
            <h2
              className="select-none whitespace-nowrap text-center text-[clamp(2.4rem,10vw,9rem)] font-black italic leading-none tracking-[-0.065em] text-transparent"
              style={{
                WebkitTextStroke: "1.5px #8fa9cc",
                backgroundImage:
                  "linear-gradient(180deg, #8da9cf 0%, #b6c9e2 48%, #eef4fc 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
              }}
            >
              GHUMAKKAD
            </h2>
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-12 bg-gradient-to-t from-white/80 to-transparent" />
        </div>
      </div>

      {/* Bottom breathing space */}
      <div className="h-5 sm:h-8" />
    </footer>
  );
};

export default Footer;
