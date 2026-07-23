import { GetStartedForm } from "@/components/GetStartedForm";
import { MANIFESTO_BELIEFS, TEAM_MEMBERS } from "@/types/manifesto";

const BODY_TEXT_CLASSES = "font-heading text-xl sm:text-2xl";
const SUBHEAD_CLASSES =
  "font-heading text-5xl font-semibold leading-[1.1] tracking-[-1px] md:text-6xl md:leading-[1.1]";

export function ManifestoContent() {
  return (
    <div className="prose-invert selection:bg-white selection:text-[#123bff] font-heading">
      <div className="flex flex-col gap-4">
        <div className="w-min rounded-full border border-white px-2.5 py-1 text-xs font-semibold uppercase tracking-widest">
          Manifesto
        </div>
        <h1 className="whitespace-normal text-7xl font-bold leading-[100%] tracking-[-0.02em] sm:text-9xl md:whitespace-nowrap">
          Big energy for small business
        </h1>
        <h3 className={SUBHEAD_CLASSES}>
          It&apos;s time someone finally delivers real technology to the real
          economy.
        </h3>
        <p className={BODY_TEXT_CLASSES}>
          The truth is: Silicon Valley was designed and built for the big
          guys. Companies like Monday, Notion, and Airtable who claim to care
          about your small business, have long ago moved to enterprise
          customers, where they can extract enormous value on the backs of a
          massive sales force. Where the majority of their resources go into
          sales and marketing, instead of back into the product.
        </p>
        <p className={BODY_TEXT_CLASSES}>
          We all understand firsthand the hard work it takes to build a
          business from scratch, and the sacrifices made to keep it running.
        </p>
        <p className={BODY_TEXT_CLASSES}>
          While big enterprises benefit from decades of investment from
          Silicon Valley and the tech elites, you don&apos;t have access to
          the software you need to run a modern operation.
        </p>

        <div className="mb-0 mt-12 flex flex-col-reverse items-start justify-between gap-4 sm:flex-row">
          <h3 className={SUBHEAD_CLASSES}>It&apos;s personal to us</h3>
        </div>
        <p className={BODY_TEXT_CLASSES}>
          These hard-working business owners are our parents, brothers,
          sisters and friends. This is not a problem we&apos;re solving for
          giant abstract corporations, but for real people and real
          businesses.
        </p>
        <p className={BODY_TEXT_CLASSES}>
          Silicon Valley might doubt you, but we know you are smart, lean and
          innovative. You&apos;re resilient, you don&apos;t take crap from
          anyone. You are not easily sold on marketing bullshit. Unlike the
          big guys, you can&apos;t spend money carelessly. Every investment is
          highly considered and calculated.
        </p>

        <ol className="flex flex-col gap-y-10">
          {MANIFESTO_BELIEFS.map((belief) => (
            <li
              key={belief.slice(0, 30)}
              className="flex list-none items-start gap-4 sm:gap-6"
            >
              <div className="mt-3 h-1 w-2.5 shrink-0 bg-white" />
              <p className={BODY_TEXT_CLASSES}>{belief}</p>
            </li>
          ))}
        </ol>

        <div className="my-10">
          <GetStartedForm />
        </div>

        <h3 className={SUBHEAD_CLASSES}>
          We&apos;re building that future with Headroom
        </h3>
        <p className={BODY_TEXT_CLASSES}>
          We see a future where small businesses are run with the efficiency
          of the big guys, giving you more time for yourself, your family,
          and all the other things that matter most.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:mt-24 sm:grid-cols-2 lg:grid-cols-3">
          {TEAM_MEMBERS.map((member) => (
            <div key={member.name} className="flex flex-col items-start">
              <span className="mt-2 font-bold text-white">{member.name}</span>
              <span className="text-white">{member.role}</span>
            </div>
          ))}
        </div>

        <p className="relative z-10">
          Follow us on{" "}
          <a
            href="https://www.linkedin.com/company/headroomai"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 hover:opacity-80"
          >
            LinkedIn
          </a>
          ,{" "}
          <a
            href="https://www.twitter.com/headroomai"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 hover:opacity-80"
          >
            Twitter
          </a>
          , and{" "}
          <a
            href="https://www.instagram.com/headroomai"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 hover:opacity-80"
          >
            Instagram
          </a>
          .
        </p>
      </div>
    </div>
  );
}
