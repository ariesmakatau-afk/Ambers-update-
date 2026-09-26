import Image from "next/image";
import Link from "next/link";
import SocialLinks from "@/components/SocialLinks";
import StatsBand from "@/components/StatsBand";
import CentaurMedallion from "@/components/ornament/Centaur";
import ArchFrame from "@/components/ornament/ArchFrame";
import TrackedLink from "@/components/TrackedLink";
import TrackedAnchor from "@/components/TrackedAnchor";
import CentaurWallpaper from "@/components/theme/CentaurWallpaper";
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
      {/* HERO — night in the shop: the centaur wallpaper in the dark, a
          blue-and-white arch, and the coals glowing underneath it all, live
          sparks rising off them (EmberField streams from .hero-fire). */}
      <section className="hero-fire relative isolate overflow-hidden">
        <div aria-hidden="true" className="hero-fire__sky" />
        <CentaurWallpaper id="hero-wallpaper" className="hero-fire__paper" />
        <div aria-hidden="true" className="hero-fire__glow" />
        <div aria-hidden="true" className="hero-fire__coals" />

        <div className="container-page relative flex min-h-[calc(100svh-72px)] flex-col items-center justify-center pb-[20vh] pt-10 sm:pt-14">
          <ArchFrame tone="light" className="arch-frame--night w-full max-w-4xl">
            <div className="flex flex-col items-center text-center">
              <div className="hero-rise hero-medallion" style={{ "--rise-delay": "0ms" } as React.CSSProperties}>
                <Image
                  src="/images/medallion-512.png"
                  alt="Yianni's Hellenic Yiros"
                  width={512}
                  height={512}
                  priority
                  className="h-28 w-28 sm:h-40 sm:w-40"
                />
              </div>

              <p
                className="hero-rise eyebrow-spark mt-7 !text-ember-light"
                style={{ "--rise-delay": "120ms" } as React.CSSProperties}
              >
                270 Hindley Street &middot; Adelaide
              </p>

              <h1
                className="hero-rise hero-title mt-4 max-w-3xl font-display text-[2.4rem] font-semibold leading-[1.04] text-white sm:text-7xl"
                style={{ "--rise-delay": "220ms" } as React.CSSProperties}
              >
                {heroCopy.headline}
              </h1>
              <div
                className="hero-rise key-divider-ember mt-6 w-28"
                aria-hidden="true"
                style={{ "--rise-delay": "320ms" } as React.CSSProperties}
              />
              <p
                className="hero-rise mt-6 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg"
                style={{ "--rise-delay": "400ms" } as React.CSSProperties}
              >
                {heroCopy.subheading}
              </p>

              <div
                className="hero-rise mt-9 flex flex-wrap justify-center gap-3"
                style={{ "--rise-delay": "520ms" } as React.CSSProperties}
              >
                <TrackedLink
                  href="/order"
                  event={{ name: "order_online_click", path: "pickup" }}
                  className="btn-coal"
                >
                  Order Online
                </TrackedLink>
                <Link href="/menu" className="btn-glass">
                  See the Menu
                </Link>
              </div>
            </div>
          </ArchFrame>

          <a href="#featured" aria-label="Scroll to the food" className="hero-scroll-cue">
            <span />
          </a>
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
      <section id="featured" className="veil-white scroll-mt-16 py-16 sm:py-24">
        <div className="container-page">
          <div data-reveal>
            <p className="eyebrow-spark">Lamb, chicken, pork</p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-cobalt-dark sm:text-5xl">
              How You Want It
            </h2>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-10 sm:gap-x-7 lg:grid-cols-4">
            {featuredFood.map((item, i) => (
              <div
                key={item.label}
                data-reveal
                style={{ "--reveal-delay": `${i * 110}ms` } as React.CSSProperties}
                className="food-card group"
              >
                <div className="grill-ledge">
                  <div className="food-card__frame">
                    <Image
                      src={item.image}
                      alt={item.label}
                      width={600}
                      height={600}
                      className="food-card__img aspect-square w-full object-cover"
                    />
                  </div>
                </div>
                <p className="mt-4 font-display text-lg font-semibold text-cobalt-dark">
                  {item.label}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-ink/60">{item.blurb}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOUSE NUMBERS — over the coals, skewers between the stats */}
      <section className="coal-bed relative bg-char pb-28 pt-16 sm:pb-32 sm:pt-24">
        <div className="container-page relative">
          <div data-reveal className="text-center">
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-ember-light">
              The house numbers
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-white sm:text-5xl">
              Four Decades, Briefly Summarised
            </h2>
          </div>
          <div className="mt-12">
            <StatsBand />
          </div>
        </div>
      </section>

      {/* WHY — porcelain wash, ember accents */}
      <section className="veil-porcelain border-y border-cobalt/10 py-16 sm:py-24">
        <div className="container-page">
          <div data-reveal>
            <p className="eyebrow-spark">Why it&rsquo;s lasted</p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-cobalt-dark sm:text-5xl">
              The Short Version
            </h2>
          </div>
          <ul className="mt-9 grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
            {whyYiannis.map((reason, i) => (
              <li
                key={reason.title}
                data-reveal
                style={{ "--reveal-delay": `${(i % 3) * 110}ms` } as React.CSSProperties}
                className="why-item border-t border-ember/40 pt-4"
              >
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
        <div
          data-reveal
          className="container-page flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <p className="eyebrow-spark">The whole list</p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-cobalt-dark sm:text-4xl">
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
      <section className="veil-porcelain border-y border-cobalt/10 py-14 sm:py-20">
        <div className="container-page">
          <div data-reveal className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
            <div>
              <p className="eyebrow-spark">In their words</p>
              <h2 className="mt-2 font-display text-2xl font-semibold text-cobalt-dark sm:text-4xl">
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
            {featuredReviews.map((review, i) => (
              <li
                key={review.author}
                data-reveal
                style={{ "--reveal-delay": `${i * 120}ms` } as React.CSSProperties}
                className="review-quote border-t border-ember/40 pt-3.5"
              >
                <p className="text-sm leading-relaxed text-ink/70 sm:text-base">
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
      <section className="coal-bed relative overflow-hidden bg-cobalt pb-32 pt-20 text-center text-white sm:pb-40 sm:pt-28">
        <CentaurMedallion className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 text-white opacity-[0.08] sm:h-[560px] sm:w-[560px]" />
        <div data-reveal className="container-page relative">
          <p className="font-script text-3xl italic text-ember-light">Yamas!</p>
          <h2 className="hero-title mt-1 font-display text-3xl font-semibold sm:text-6xl">
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
              className="btn-glass"
            >
              Call {business.phone}
            </TrackedAnchor>
          </div>
        </div>
      </section>
    </>
  );
}
