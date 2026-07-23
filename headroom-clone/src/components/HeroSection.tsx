import { ChevronDownIcon } from "@/components/icons";
import { NavMenu } from "@/components/NavMenu";
import { GetStartedForm } from "@/components/GetStartedForm";
import { RotatingWord } from "@/components/RotatingWord";

export function HeroSection() {
  return (
    <main
      id="top"
      className="relative bg-[#123bff] text-white selection:bg-white selection:text-[#123bff]"
    >
      {/* 1. fixed decorative background runner — always mounted, opacity is a constant 0.3, never changes with scroll */}
      <div className="pointer-events-none fixed inset-x-0 top-0 z-0 flex h-[min(100svh,100dvh)] items-center justify-center">
        <div className="opacity-30">
          <div className="relative aspect-video w-[min(74vw,360px)] sm:w-[min(72vw,560px)] lg:w-[min(80vw,800px)]">
            <img
              src="/images/runner.gif"
              alt=""
              className="absolute inset-0 h-full w-full object-contain"
            />
          </div>
        </div>
      </div>

      <NavMenu />

      {/* 3. tall scroll-runway wrapper: an inner sticky, full-viewport section stays pinned
          (perfectly centered) while this outer box scrolls past underneath it, then releases
          once the outer box's bottom edge arrives — NOT plain document flow. */}
      <div className="relative h-[220svh] lg:h-[125svh]">
        <section className="sticky top-0 box-border flex h-[100svh] min-h-[100svh] overflow-visible px-6 pb-[max(20px,4svh)] pt-24 text-white sm:px-8 sm:pb-[max(24px,4svh)] sm:pt-28">
          <div className="relative z-10 mx-auto flex min-h-[calc(100svh-8.5rem)] w-full max-w-6xl flex-col items-center justify-center text-center sm:min-h-[calc(100svh-10rem)]">
            <div className="w-full max-w-[22rem] sm:max-w-6xl">
              <h1 className="mx-auto text-balance font-heading sm:max-w-6xl">
                <span className="block !text-[36px] font-bold leading-[1.05] tracking-[-0.02em] sm:!text-[88px] sm:leading-[100%]">
                  You built your business by hand.
                </span>
                <span className="relative mx-auto mt-4 block max-w-[20ch] overflow-visible !text-[26px] font-normal leading-[1.15] tracking-[-0.02em] sm:mt-8 sm:min-h-[1.2em] sm:max-w-none sm:!text-[56px] sm:leading-[100%]">
                  <span className="animate-hero-line-in flex origin-bottom flex-wrap items-baseline justify-center gap-x-[0.25em] text-balance">
                    <span>We&apos;ll help you run it with</span>
                    <RotatingWord />
                  </span>
                </span>
              </h1>
              <div className="mt-8 flex flex-col-reverse items-center justify-center gap-4 sm:mt-10 sm:flex-row sm:gap-x-6 sm:gap-y-3">
                <a
                  href="#get-started"
                  className="border-white bg-white text-[#123bff] hover:bg-white/[0.92] focus:bg-white focus:text-[#123bff] active:bg-white/[0.85] relative inline-flex select-none items-center justify-center gap-x-1.5 rounded-md border transition-colors h-10 px-4 py-2 font-medium text-lg min-h-12"
                >
                  Get started
                </a>
                <a
                  href="/manifesto"
                  className="inline-flex min-h-11 shrink-0 items-center px-1 text-sm text-white underline underline-offset-4 opacity-80 transition-opacity hover:opacity-100"
                >
                  Read the manifesto
                </a>
              </div>
            </div>
          </div>
          <ChevronDownIcon className="pointer-events-none absolute inset-x-0 bottom-6 mx-auto h-5 w-5 text-white/55" />
        </section>
      </div>

      <GetStartedForm />

      {/* trailing spacer — lets the fixed runner show through before the footer */}
      <div className="relative z-10 h-[60svh] sm:h-[90svh]" />
    </main>
  );
}
