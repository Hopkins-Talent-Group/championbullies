import { DEPOSIT_AMOUNT } from "./site";

/**
 * Marketing copy for the sections that frame the puppy gallery.
 *
 * Almost every sentence below is lifted verbatim from the live
 * championbullies.com page (WordPress page id 8, last modified 2026-09-15)
 * so the rebuild says exactly what the old site said. Nothing here is
 * invented: the figures that only exist in code — the deposit, the
 * spay/neuter contract, the health guarantee — are read from lib/site.ts and
 * the reservation steps instead of being restated.
 *
 * The copy lives in lib/ for the same reason PUPPY_CATALOG does: one home per
 * fact, so wording and layout cannot drift apart.
 */

export const TRUST_TAGLINE = [
  "AKC Registered",
  "Champion Bloodlines",
  "Home-Raised Bulldogs",
] as const;

export const ANNOUNCEMENT = {
  eyebrow: "Announcements",
  headline:
    "Special Offer: Buy an English or French Bulldog get 2 or 4 nights free at Treasure Cay!",
  body: "Combine your new family member with a vacation.",
  ctaLabel: "Contact Us",
  ctaHref: "#contact",
} as const;

export const WHY_US = {
  eyebrow: "Why us",
  heading: "What Makes Us Different",
  lead: "When you choose ChampionBullies.com, you're not just getting a pet — you're gaining a loyal, healthy companion bred from championship bloodlines.",
  items: [
    {
      title: "AKC Registered",
      body: "All of our puppies are registered with the American Kennel Club (AKC), ensuring that you receive a dog with verified lineage, proper documentation, and breed integrity. AKC registration reflects our commitment to ethical and responsible breeding practices.",
    },
    {
      title: "Champion Sired Puppies",
      body: "We primarily breed to Champion Sires, meaning most of our puppies are direct offspring of award-winning show dogs. This approach helps promote excellent physical traits, strong structure, and sound temperament, while supporting overall health.",
    },
    {
      title: "Health Certificate + Warranty",
      body: "Every puppy goes home with a veterinarian-issued health certificate and is backed by a comprehensive health warranty. We stand behind the health of our puppies and are committed to your peace of mind.",
    },
    {
      title: "Raised In-Home — Not a Puppy Mill",
      body: "Our puppies are born and raised inside our family home, surrounded by love and daily interaction — not in isolated kennels or commercial breeding setups. This home environment helps them develop into well-adjusted, happy companions.",
    },
  ],
} as const;

export const ABOUT = {
  eyebrow: "Who we are",
  heading: "About Us",
  lead: "At ChampionBullies.com, we're more than breeders — we're a family deeply passionate about English and French Bulldogs.",
  paragraphs: [
    "Based in sunny Florida, we've built our program on a foundation of integrity, quality, and love for the breeds we specialize in.",
    "We focus exclusively on English and French Bulldogs so we can give our full attention to perfecting these incredible companions. With only 2–3 carefully planned litters per year, our goal is never mass production — it's excellence. Each puppy is AKC registered, Champion Sired, and backed by pedigrees with over 56 champions in just five generations.",
  ],
  raised: {
    title: "But what truly sets us apart is how our puppies are raised",
    body: "All of our bullies are born and raised inside our home, where they're cared for like family and socialized daily by our children. This ensures our puppies grow up happy, confident, and ready to become part of your family.",
  },
  closing:
    "Whether you're looking for a show-quality bulldog or a loyal, loving pet, you can trust ChampionBullies.com to deliver a healthy, well-bred, and beautifully raised puppy.",
  facts: [
    { label: "Litters per year", value: "2–3" },
    { label: "Champions in five generations", value: "56+" },
    { label: "Registration", value: "AKC" },
    { label: "Raised", value: "In our home" },
  ],
  ctaLabel: "Contact Us",
  ctaHref: "#contact",
} as const;

/**
 * The three acknowledgements the last reservation step asks for, plus the
 * deposit. The wording is copied from Step4-Agreement.tsx so this section can
 * never promise something the form does not.
 */
export const GUARANTEE = {
  eyebrow: "Before you reserve",
  heading: "Health Guarantee & Deposit",
  lead: "This is what the final step of the reservation asks you to agree to, in the same words the form uses.",
  items: [
    {
      title: "One year health guarantee",
      body: "A one year guarantee against genetic conditions diagnosed by a licensed vet. Accidents, illness, and normal breed wear are not covered.",
    },
    {
      title: "Health certificate + warranty",
      body: "Every puppy goes home with a veterinarian-issued health certificate and is backed by a comprehensive health warranty.",
    },
    {
      title: "Spay or neuter",
      body: "Puppies are sold on limited AKC registration with a spay or neuter contract by 6 to 9 months of age.",
    },
    {
      title: `${DEPOSIT_AMOUNT} deposit`,
      body: `${DEPOSIT_AMOUNT} holds your puppy and comes off the price. We send payment instructions once we confirm the puppy is still available — this site never takes card details.`,
    },
  ],
  note: "Sending the reservation form reserves nothing yet: it starts the conversation and holds your place for a reply.",
} as const;

export const FAQ = {
  eyebrow: "Questions",
  heading: "Frequently Asked",
  items: [
    {
      q: "Are your puppies AKC registered?",
      a: "Yes. Every puppy is registered with the American Kennel Club (AKC), so you receive verified lineage and proper documentation with your dog.",
    },
    {
      q: "How many litters do you have each year?",
      a: "Two to three, deliberately. Keeping the program that small is what lets every puppy get individual attention.",
    },
    {
      q: "How are the puppies raised?",
      a: "Inside our family home. They are handled daily and socialized by our children — never in isolated kennels or a commercial breeding setup.",
    },
    {
      q: "What goes home with my puppy?",
      a: "A veterinarian-issued health certificate and a written health warranty, alongside the AKC paperwork.",
    },
    {
      q: `How does the ${DEPOSIT_AMOUNT} deposit work?`,
      a: `${DEPOSIT_AMOUNT} holds your puppy and comes off the price. We send payment instructions once we confirm the puppy is still available. This site never takes card details.`,
    },
    {
      q: "Do I have to spay or neuter?",
      a: "Yes. Puppies are sold on limited AKC registration with a spay or neuter contract by 6 to 9 months of age.",
    },
    {
      q: "How do I start a reservation?",
      a: "Pick a puppy in the gallery and choose Reserve. The form runs through four steps — puppy, contact details, living situation, then the agreement.",
    },
  ],
} as const;