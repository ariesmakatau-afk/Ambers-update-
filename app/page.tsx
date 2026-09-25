import Image from "next/image";
import Link from "next/link";
import SocialLinks from "@/components/SocialLinks";
import StatsBand from "@/components/StatsBand";
import CentaurMedallion from "@/components/ornament/Centaur";
import ArchFrame from "@/components/ornament/ArchFrame";
import TrackedLink from "@/components/TrackedLink";
import TrackedAnchor from "@/components/TrackedAnchor";
import { business, heroCopy, whyYiannis } from "@/lib/content";
import { promo } from "@/lib/parea";

const featuredFood = [
  {
    label: "Yiros",
    blurb: "Off the spit, into warm pita. Lamb, chicken, pork.",
    image: "/images/food-yiros.jpg",
  },
  {
    label: "Packs & Platters",
    blurb: "Same meat, more of it, room to share.",
    image: "/images/food-platters.jpg",
  },
  {
    label: "AB Packs",
    blurb: "Chips underneath. Sauce over everything.",
    image: "/images/food-chips.jpg",
  },
  {
    label: "Greek Coffee",
    blurb: "Short, black, one sugar. As it should be.",
    image: "/images/food-drinks.jpg",
  },
];

const featuredReviews = [
  {
    quote:
      "An institution for a long time. Charcoal-roasted spit meat — best yiros in town. Highly recommend the pork and lamb, no lettuce, extra garlic sauce and onion.",
    author: "brianhissy",
    date: "April 2022",
  },
  {
    quote:
      "Lamb yiros were sensational and fully loaded with so much meat. Super delicious — the only ones as nice were when travelling around Greece.",
    author: "David Maddison",
    date: "February 2025",
  },
  {
    quote:
      "Awesome yiros, flavoured over the charcoal grill. Best I've had without a doubt. Got the lot and so worth it — good value even for the mini. Service was pretty quick considering the crowd.",
    author: "Andrew Jones",
    date: "January 2025",
  },
];

export default function HomePage() {
  return (
    <>
      {/* HERO — a blue-and-white arch on the centaur wallpaper */}
      <section className="hero-wall relative overflow-hidden">
        {/* A centaur roundel from the wallpaper, large and faint behind the medallion */}
        <CentaurMedallion
          className="pointer-events-none absolute left-1/2 top-4 h-[420px] w-[420px] -translate-x-1/2 text-cobalt opacity-[0.07] sm:h-[560px] sm:w-[560px]"
        />

        <div className="container-page relative py-14 sm:py-20">
          <ArchFrame tone="dark">
            <div className="flex flex-col items-center text-center">
              <Image
                src="/images/medallion-512.png"
                alt="Yianni's Hellenic Yiros"
                width={512}
                height={512}
                priority
                className="h-32 w-32 drop-shadow-[0_18px_30px_rgba(15,39,71,0.28)] sm:h-44 sm:w-44"
              />

              <h1 className="mt-7 max-w-3xl font-display text-[2.1rem] font-semibold leading-[1.08] text-cobalt-dark sm:text-6xl">
                {heroCopy.headline}
              </h1>
              <div className="key-divider-ember mt-6 w-28 opacity-80" aria-hidden="true" />
              <p className="mt-6 max-w-xl text-base leading-relaxed text-ink/70 sm:text-lg">
                {heroCopy.subheading}
              </p>

              <div className="mt-9">
                <TrackedLink
                  href="/order"
                  event={{ name: "order_online_click", path: "pickup" }}
                  className="btn-coal"
                >
                  Order Online
                </TrackedLink>
              </div>
            </div>
          </ArchFrame>
        </div>
      </section>

      {/* PROMO STRIP — slim, high-contrast, one line */}
      {promo.active && (
        <Link
          href="/parea"
          className="group block border-y border-cobalt/15 bg-porcelain transition-colors hover:bg-porcelain-deep"
        >
          <div className="container-page flex flex-wrap items-center justify-center gap-x-2.5 gap-y-0.5 py-2.5 text-center">
            <span className="text-sm font-bold uppercase tracking-wide text-cobalt-dark">
              {promo.title}
            </span>
            <span className="text-sm text-ink/70">{promo.strip}</span>
            <span
              aria-hidden="true"
              className="text-sm text-cobalt transition-transform group-hover:translate-x-0.5"
            >
              &rarr;
            </span>
          </div>
        </Link>
      )}

      {/* FEATURED FOOD */}
      <section className="veil-white py-16 sm:py-20">
        <div className="container-page">
          <p className="eyebrow-spark">Lamb, chicken, pork</p>
          <h2 className="mt-3 font-display text-2xl font-semibold text-cobalt-dark sm:text-3xl">
            How You Want It
          </h2>
          <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-10 sm:gap-x-7 lg:grid-cols-4">
            {featuredFood.map((item) => (
              <div key={item.label}>
                <div className="grill-ledge overflow-hidden rounded-sm">
                  <Image
                    src={item.image}
                    alt={item.label}
                    width={600}
                    height={600}
                    className="aspect-square w-full object-cover"
                  />
                </div>
                <p className="mt-4 font-display text-base font-semibold text-cobalt-dark">
                  {item.label}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-ink/60">{item.blurb}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOUSE NUMBERS — over the coals, skewers between the stats */}
      <section className="coal-bed relative bg-char py-16 sm:py-20">
        <div className="container-page relative">
          <div className="text-center">
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-ember-light">
              The house numbers
            </p>
            <h2 className="mt-3 font-display text-2xl font-semibold text-white sm:text-3xl">
              Four Decades, Briefly Summarised
            </h2>
          </div>
          <div className="mt-12">
            <StatsBand />
          </div>
        </div>
      </section>

      {/* WHY — porcelain wash, ember accents */}
      <section className="veil-porcelain border-y border-cobalt/10 py-16 sm:py-20">
        <div className="container-page">
          <p className="eyebrow-spark">Why it&rsquo;s lasted</p>
          <h2 className="mt-3 font-display text-2xl font-semibold text-cobalt-dark sm:text-3xl">
            The Short Version
          </h2>
          <ul className="mt-9 grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
            {whyYiannis.map((reason) => (
              <li key={reason.title} className="border-t border-ember/40 pt-4">
                <p className="font-display text-base font-semibold text-cobalt-dark">
                  {reason.title}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-ink/60">{reason.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* MENU PREVIEW */}
      <section className="veil-white py-16 sm:py-20">
        <div className="container-page flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="eyebrow-spark">The whole list</p>
            <h2 className="mt-3 font-display text-2xl font-semibold text-cobalt-dark sm:text-3xl">
              The Whole Menu, Three Meats Deep
            </h2>
            <p className="mt-2 max-w-md text-ink/60">
              Pick your meat, pick how it&rsquo;s served, add what you want. That&rsquo;s it.
            </p>
          </div>
          <Link href="/menu" className="btn-porcelain shrink-0">
            View Full Menu
          </Link>
        </div>
      </section>

      {/* REVIEWS + SOCIAL — one compact band instead of two tall ones */}
      <section className="veil-porcelain border-y border-cobalt/10 py-12 sm:py-14">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
            <div>
              <p className="eyebrow-spark">In their words</p>
              <h2 className="mt-2 font-display text-xl font-semibold text-cobalt-dark sm:text-2xl">
                What Adelaide Says
              </h2>
            </div>
            <a
              href={business.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-cobalt underline underline-offset-4 hover:text-cobalt-dark"
            >
              Read more reviews
            </a>
          </div>

          {/* Quotes as bas-relief lines, not cards — far less vertical room */}
          <ul className="mt-6 grid gap-x-8 gap-y-5 sm:grid-cols-3">
            {featuredReviews.map((review) => (
              <li key={review.author} className="border-t border-ember/40 pt-3.5">
                <p className="text-sm leading-relaxed text-ink/70">
                  &ldquo;{review.quote}&rdquo;
                </p>
                <p className="mt-2 text-xs font-semibold text-cobalt-dark">
                  <span className="mr-1.5 tracking-wide text-ember" aria-label="5 out of 5">
                    &#9733;&#9733;&#9733;&#9733;&#9733;
                  </span>
                  {review.author}
                  <span className="ml-1.5 font-normal text-ink/45">{review.date}</span>
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-8 border-t border-cobalt/10 pt-6">
            <SocialLinks />
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="coal-bed relative overflow-hidden bg-cobalt py-16 text-center text-white sm:py-24">
        <CentaurMedallion className="pointer-events-none absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 text-white opacity-[0.08]" />
        <div className="container-page relative">
          <p className="font-script text-2xl italic text-ember-light">Yamas!</p>
          <h2 className="mt-1 font-display text-2xl font-semibold sm:text-4xl">
            The Spit&rsquo;s Already Turning
          </h2>
          <div className="key-divider-ember mx-auto mt-6 w-28 opacity-70" aria-hidden="true" />
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <TrackedLink
              href="/order"
              event={{ name: "order_online_click", path: "pickup" }}
              className="btn-porcelain"
            >
              Order Online
            </TrackedLink>
            <TrackedAnchor
              href={business.phoneHref}
              event={{ name: "phone_click" }}
              className="btn-coal !bg-none !bg-white/10 !shadow-none ring-1 ring-inset ring-white/40 hover:!bg-white/15"
            >
              Call {business.phone}
            </TrackedAnchor>
          </div>
        </div>
      </section>
    </>
  );
}
