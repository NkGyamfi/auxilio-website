import type { Metadata } from "next";
import { NavMenu } from "@/components/NavMenu";
import { Footer } from "@/components/Footer";
import { ManifestoContent } from "@/components/ManifestoContent";

export const metadata: Metadata = {
  title: "Manifesto | Headroom",
};

export default function ManifestoPage() {
  return (
    <>
      <div className="relative flex min-h-dvh w-full grow flex-col items-center bg-[#123bff] px-6 pb-24 pt-24 text-white sm:px-8 sm:pb-32 sm:pt-28">
        <NavMenu />

        <div className="pointer-events-none fixed inset-x-0 top-0 z-0 flex h-[max(42svh,260px)] items-end justify-center pb-5 sm:h-[max(52svh,360px)] sm:pb-6 lg:h-[max(60svh,420px)]">
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

        <div className="relative z-10 mx-auto flex w-full max-w-screen-sm flex-col gap-4 pt-[max(42svh,260px)] sm:pt-[max(52svh,360px)] lg:pt-[max(60svh,420px)]">
          <ManifestoContent />
        </div>

        <div className="relative z-10 h-[60svh] sm:h-[90svh]" />
      </div>
      <Footer />
    </>
  );
}
