"use client";

import { useRef, useEffect } from "react";
import { useReservation } from "@/context/ReservationContext";
import { Step1 } from "./ReservationSteps/Step1-Puppy";
import { Step2 } from "./ReservationSteps/Step2-Contact";
import { Step3 } from "./ReservationSteps/Step3-Living";
import { Step4 } from "./ReservationSteps/Step4-Agreement";

type Step = "puppy" | "contact" | "living" | "agreement";

type ReservationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  puppy?: {
    key: string;
    name: string;
    breed: string;
    price: string;
    gender: string;
    year: number;
  };
------ snippet (first lines) ------