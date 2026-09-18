export type Puppy = {
  key: string;
  name: string;
  breed: string;
  gender: "male" | "female";
  status: "available" | "reserved";
  year: number;
  price: string;
  image: string;
};

export const PUPPY_DATA: Puppy[] = [
  { key: "daphne", name: "Daphne", breed: "English Bulldog", gender: "female", status: "available", year: 2024, price: "$4,500", image: "/images/dogs/daphne.jpg" },
  { key: "fred", name: "Fred", breed: "English Bulldog", gender: "male", status: "available", year: 2024, price: "$4,800", image: "/images/dogs/fred.jpg" },
  { key: "scooby", name: "Scooby", breed: "English Bulldog", gender: "male", status: "reserved", year: 2024, price: "$4,200", image: "/images/dogs/scooby.jpg" },
  { key: "scrappy", name: "Scrappy", breed: "English Bulldog", gender: "female", status: "reserved", year: 2024, price: "$4,500", image: "/images/dogs/scrappy.jpg" },
  { key: "shaggy", name: "Shaggy", breed: "English Bulldog", gender: "male", status: "available", year: 2024, price: "$4,000", image: "/images/dogs/shaggy.jpg" },
  { key: "velma", name: "Velma", breed: "English Bulldog", gender: "female", status: "available", year: 2024, price: "$4,800", image: "/images/dogs/velma.jpg" },
  { key: "blue-angel", name: "Blue Angel", breed: "French Bulldog", gender: "male", status: "available", year: 2023, price: "$5,500", image: "/images/dogs/blue-angel.jpg" },
  { key: "margo", name: "Margo", breed: "French Bulldog", gender: "female", status: "available", year: 2019, price: "$5,200", image: "/images/dogs/margo.jpg" },
];