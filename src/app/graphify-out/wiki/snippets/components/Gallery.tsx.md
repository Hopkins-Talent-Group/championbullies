"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ReservationProvider, useReservation } from "@/context/ReservationContext";
import { ReservationModal } from "@/components/ReservationModal";
import type { PuppyData } from "@/context/ReservationContext";

type Pup = {
  key: string;
  name: string;
  image: string;
  gender: string;
  breed: string;
  year: number;
  price: string;
};

const pups: Pup[] = [
  { key: "daphne", name: "Daphne", image: "/images/dogs/daphne.jpg", gender: "Female", breed: "English Bulldog", year: 2024, price: "$4,500" },
  { key: "fred", name: "Fred", image: "/images/dogs/fred.jpg", gender: "Male", breed: "English Bulldog", year: 2024, price: "$4,800" },
  { key: "scooby", name: "Scooby", image: "/images/dogs/scooby.jpg", gender: "Male", breed: "English Bulldog", year: 2024, price: "$4,200" },
------ snippet (first lines) ------