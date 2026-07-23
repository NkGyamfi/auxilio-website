"use client";

import { useEffect, useRef, useState, type SVGProps } from "react";
import Link from "next/link";
import { Logo, LinkedinIcon, XIcon, InstagramIcon } from "@/components/icons";
import { NAV_MENU_LINKS, SOCIAL_LINKS } from "@/types/headroom";

type SocialIconComponent = (props: SVGProps<SVGSVGElement>) => React.JSX.Element;

function getSocialIcon(label: string): SocialIconComponent {
  const normalized = label.toLowerCase();
  if (normalized.includes("linkedin")) return LinkedinIcon;
  if (normalized.includes("instagram")) return InstagramIcon;
  return XIcon;
}

export function NavMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-8 z-[200] flex justify-center sm:top-10">
      <div ref={containerRef} className="relative flex w-max flex-col items-center pointer-events-auto">
        <div className="relative z-[200] flex h-8 items-center justify-center sm:h-10">
          <button
            type="button"
            aria-expanded={isOpen}
            aria-haspopup="dialog"
            aria-label="Headroom menu"
            onClick={() => setIsOpen((prev) => !prev)}
            className="inline-flex items-center justify-center rounded-2xl px-3 py-2 no-underline outline-none bg-transparent backdrop-blur-md transition-[backdrop-filter] hover:backdrop-blur-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            <div className="flex h-8 items-center sm:h-10">
              <Logo className="h-8 w-auto sm:h-10 text-white" />
            </div>
          </button>
        </div>

        {isOpen && (
          <div
            role="dialog"
            aria-label="Headroom"
            data-headroom-logo-menu="true"
            className="absolute left-[calc(50%-min(46vw,10rem))] top-full z-[199] mt-3 w-[min(92vw,20rem)] pt-2 sm:left-[calc(50%-11rem)] sm:w-[22rem]"
          >
            <div className="overflow-hidden rounded-xl border border-white/15 bg-white/10 shadow-[0_20px_60px_-12px_rgba(0,0,0,0.45),inset_0_1px_0_0_rgba(255,255,255,0.18)] backdrop-blur-2xl">
              <div className="flex flex-col gap-5 px-5 pb-6 pt-5">
                <p className="text-[13px] leading-[1.5] text-white/80">
                  <span className="font-medium text-white">Headroom</span> (
                  <em className="italic">n.</em>) The distance between where a business
                  operates today and where it could operate at full potential—measured in
                  revenue uncaptured, customers unserved, and hours lost to work that
                  shouldn&apos;t exist.
                </p>

                <nav className="flex flex-col">
                  {NAV_MENU_LINKS.map((link) => {
                    const isExternal = !link.href.startsWith("/");
                    const linkClassName =
                      "group flex min-h-11 items-center justify-between rounded-md px-2 py-3 no-underline transition-colors hover:bg-white/10";
                    const labelClassName = "text-xs font-medium uppercase tracking-wide text-white";
                    const arrowClassName = "text-white/50 group-hover:text-white transition-colors";

                    if (isExternal) {
                      return (
                        <a
                          key={link.href}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={linkClassName}
                        >
                          <span className={labelClassName}>{link.label}</span>
                          <span aria-hidden className={arrowClassName}>
                            &rarr;
                          </span>
                        </a>
                      );
                    }

                    return (
                      <Link key={link.href} href={link.href} className={linkClassName}>
                        <span className={labelClassName}>{link.label}</span>
                        <span aria-hidden className={arrowClassName}>
                          &rarr;
                        </span>
                      </Link>
                    );
                  })}
                </nav>

                <div className="flex flex-col gap-2">
                  <span className="text-xs uppercase tracking-wide text-white/50">Follow</span>
                  <div className="flex items-center">
                    {SOCIAL_LINKS.map((social) => {
                      const Icon = getSocialIcon(social.label);
                      return (
                        <a
                          key={social.href}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={social.label}
                          className="inline-flex size-10 items-center justify-center text-white/60 transition-colors hover:text-white"
                        >
                          <Icon className="size-5" />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
