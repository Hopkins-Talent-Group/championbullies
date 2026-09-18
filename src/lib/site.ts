// One catalog drives the gallery cards and the contact form's interest
// options, so a name/price/breed change can never drift between them.
export type PuppyCatalogEntry = {
  key: string;
  name: string;
  breed: string;
  gender: string;
  status: "available" | "reserved";
  year: number;
  price: string;
  image: string;
};

export const PUPPY_CATALOG: PuppyCatalogEntry[] = [
  { key: "daphne", name: "Daphne", image: "/images/dogs/daphne.jpg", gender: "Female", status: "available", breed: "English Bulldog", year: 2026, price: "..." },
  { key: "fred", name: "Fred", image: "/images/dogs/fred.jpg", gender: "Male", status: "available", breed: "English Bulldog", year: 2026, price: "..." },
  { key: "scooby", name: "Scooby", image: "/images/dogs/scooby.jpg", gender: "Male", status: "reserved", breed: "English Bulldog", year: 2026, price: "..." },
  { key: "scrappy", name: "Scrappy", image: "/images/dogs/scrappy.jpg", gender: "Male", status: "reserved", breed: "English Bulldog", year: 2026, price: "..." },
  { key: "shaggy", name: "Shaggy", image: "/images/dogs/shaggy.jpg", gender: "Male", status: "available", breed: "English Bulldog", year: 2026, price: "..." },
  { key: "velma", name: "Velma", image: "/images/dogs/velma.jpg", gender: "Female", status: "available", breed: "English Bulldog", year: 2026, price: "..." },
  { key: "blue-angel", name: "Blue Angel", image: "/images/dogs/blue-angel.jpg", gender: "Male", status: "available", breed: "French Bulldog", year: 2025, price: "..." },
  { key: "lolita", name: "Lolita", image: "/images/dogs/lolita.jpg", gender: "Female", status: "available", breed: "French Bulldog", year: 2024, price: "..." },
];

export function interestLabel(puppy: PuppyCatalogEntry): string {
  return `${puppy.name} — ${puppy.breed} ${puppy.gender} (${puppy.price})`;
}

// One source for the breeder's public contact details, shared by the
// reservation dialog's fallback action and the server-side notification.
export const CONTACT = {
  phoneLabel: "(321) 276-1159",
  phoneHref: "tel:+13212761159",
  email: "championbullies@aol.com",
  location: "Florida, USA",
} as const;

export const DEPOSIT_AMOUNT = "$500";
