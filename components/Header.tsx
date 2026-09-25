"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { business } from "@/lib/content";

const primaryLinks = [
  { href: "/menu", label: "Menu" },
  { href: "/parea", label: "Parea Mas" },
  { href: "/about", label: "About" },
  { href: "/location", label: "Location" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="header-glass sticky top-0 z-40">
      <div className="container-page flex h-[72px] items-center justify-between gap-4">
        {/* The medallion is square, so it gets a square box — the old header
            squeezed a 815x478 wide mark into h-10 w-10, which distorted it. */}
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <Image
            src="/images/medallion-512.png"
            alt=""
            width={512}
            height={512}
            className="h-12 w-12 shrink-0 rounded-full shadow-[0_6px_14px_-8px_rgba(15,39,71,0.6)]"
            priority
          />
          <span className="min-w-0 leading-none">
            <span className="block truncate font-display text-[19px] font-semibold tracking-tight text-cobalt-dark">
              Yianni&rsquo;s
            </span>
            <span className="mt-1 block truncate font-body text-[10px] font-light uppercase tracking-[0.18em] text-cobalt/70">
              Hellenic Yiros
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          {primaryLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-normal tracking-wide text-cobalt-dark/75 transition-colors hover:text-cobalt"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link href="/order" className="btn-coal !px-6 !py-3">
            Order Online
          </Link>
        </div>

        <button
          type="button"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-cobalt-dark transition-colors hover:bg-cobalt/5 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            {open ? (
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu — blue-and-white panel with a bed of live coals along its foot */}
      {open && (
        <nav id="mobile-menu" aria-label="Mobile" className="menu-panel menu-panel--grill lg:hidden">
          <div className="key-divider-cobalt opacity-40" aria-hidden="true" />
          <div className="container-page pb-6 pt-3">
            <ul className="flex flex-col">
              {primaryLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="menu-panel-link"
                  >
                    <span className="font-display text-lg font-semibold tracking-tight">
                      {link.label}
                    </span>
                    <span aria-hidden="true" className="text-cobalt/35">
                      &rarr;
                    </span>
                  </Link>
                </li>
              ))}
              <li>
                <a href={business.phoneHref} className="menu-panel-link border-b-0">
                  <span className="font-display text-lg font-semibold tracking-tight">
                    Call {business.phone}
                  </span>
                  <span aria-hidden="true" className="text-cobalt/35">
                    &rarr;
                  </span>
                </a>
              </li>
            </ul>
            <Link
              href="/order"
              onClick={() => setOpen(false)}
              className="btn-coal mt-5 w-full"
            >
              Order Online
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
