import { ChevronDownIcon } from "@/components/icons";
import { NavMenu } from "@/components/NavMenu";
import { GetStartedForm } from "@/components/GetStartedForm";

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

      {/* 3. tall hero text container — height creates the scroll runway, content sits near the top via normal flow */}
      <div className="relative h-[220svh] lg:h-[125svh]">
        <div className="flex flex-col items-center px-6 pt-32 text-center sm:pt-40">
          <h1 className="mx-auto text-balance font-heading sm:max-w-6xl">
            <span className="block !text-[36px] font-bold leading-[1.05] tracking-[-0.02em] sm:!text-[88px] sm:leading-[100%]">
              You built your business by hand.
            </span>
            <span className="relative mx-auto mt-4 block max-w-[20ch] overflow-visible !text-[26px] font-normal leading-[1.15] tracking-[-0.02em] sm:mt-8 sm:min-h-[1.2em] sm:max-w-none sm:!text-[56px] sm:leading-[100%]">
              <span className="animate-hero-line-in flex origin-bottom flex-wrap items-baseline justify-center gap-x-[0.25em] text-balance">
                <span>We&apos;ll help you run it with</span>
                <span className="relative z-20 inline-block h-[1.12em] origin-center overflow-visible whitespace-nowrap text-left align-baseline">
                  <span className="invisible inline-block whitespace-nowrap">
                    AI.
                  </span>
                  <span className="animate-ai-blur-in absolute left-0 top-0 inline-block origin-bottom whitespace-nowrap">
                    AI.
                  </span>
                  <span className="pointer-events-none absolute inset-0">
                    <span
                      aria-hidden
                      className="animate-ai-glitch-top absolute inset-0 text-white"
                      style={{
                        clipPath: "inset(0px 0px 58%)",
                        textShadow: "rgba(255, 255, 255, 0.32) 8px 0px 0px",
                      }}
                    >
                      AI.
                    </span>
                    <span
                      aria-hidden
                      className="animate-ai-glitch-bottom absolute inset-0 text-white"
                      style={{
                        clipPath: "inset(48% 0px 0px)",
                        textShadow: "rgba(255, 255, 255, 0.28) -7px 0px 0px",
                      }}
                    >
                      AI.
                    </span>
                  </span>
                </span>
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
          <ChevronDownIcon className="mt-16 h-5 w-5 text-white/55" />
        </div>
      </div>

      <GetStartedForm />

      {/* trailing spacer — lets the fixed runner show through before the footer */}
      <div className="relative z-10 h-[60svh] sm:h-[90svh]" />
    </main>
  );
}
