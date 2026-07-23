import { InstagramIcon, LinkedinIcon, Logo, XIcon } from "@/components/icons";
import { SOCIAL_LINKS, type SocialLink } from "@/types/headroom";

const SOCIAL_ICONS: Record<SocialLink["label"], typeof InstagramIcon> = {
  Instagram: InstagramIcon,
  X: XIcon,
  LinkedIn: LinkedinIcon,
};

// Footer displays socials in Instagram, X, LinkedIn order — different from
// NavMenu's LinkedIn, X, Instagram order. Both orders are correct for their
// respective components (confirmed via live DOM query on headroom.com).
const FOOTER_SOCIAL_ORDER: SocialLink["label"][] = ["Instagram", "X", "LinkedIn"];
const FOOTER_SOCIAL_LINKS = FOOTER_SOCIAL_ORDER.map(
  (label) => SOCIAL_LINKS.find((link) => link.label === label)!,
);

export function Footer() {
  return (
    <footer className="min-w-full bg-primary text-white">
      <div className="mx-auto max-w-5xl px-6 pb-12 pt-16">
        <div className="flex items-center justify-between">
          <Logo className="h-8 w-auto text-white" />
          <div className="flex items-center gap-2">
            {FOOTER_SOCIAL_LINKS.map((social) => {
              const Icon = SOCIAL_ICONS[social.label];
              return (
                <a
                  key={social.label}
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

        <hr className="my-6 border-white/20" />

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-6">
            <a
              href="/privacy-policy"
              className="text-sm text-white/70 underline-offset-4 transition-colors hover:text-white hover:underline"
            >
              Privacy Policy
            </a>
            <a
              href="/terms-of-service"
              className="text-sm text-white/70 underline-offset-4 transition-colors hover:text-white hover:underline"
            >
              Terms of Service
            </a>
          </div>
          <p className="text-sm text-white/70">
            &copy; 2026 Archetype Labs, Inc. All rights reserved.
          </p>
        </div>

        <p className="mt-10 max-w-3xl text-sm text-white/60">
          <span className="font-medium text-white">Headroom</span> (
          <em className="italic">n.</em>) The distance between where a
          business operates today and where it could operate at full
          potential—measured in revenue uncaptured, customers unserved, and
          hours lost to work that shouldn&apos;t exist.
        </p>
      </div>
    </footer>
  );
}
