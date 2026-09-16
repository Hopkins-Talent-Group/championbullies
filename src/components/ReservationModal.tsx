"use client";

import { useRef, useState } from "react";
import { useReservation } from "@/context/ReservationContext";
import { Step1 } from "./ReservationSteps/Step1-Puppy";
import { Step2 } from "./ReservationSteps/Step2-Contact";
import { Step3 } from "./ReservationSteps/Step3-Living";
import { Step4 } from "./ReservationSteps/Step4-Agreement";
import { reservationStepSchemas } from "@/lib/validation";
import { z } from "zod";

type ReservationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  puppy?: {
    key: string;
    name: string;
    breed: string;
    price: string;
    gender: string;
    year: string;
  };
};

export function ReservationModal({ isOpen, onCloseImplementation started. Phase 1 (Context + Types + Zod schemas) and Steps 1-3 completed. Step 5 (modal design) and integration with Gallery component. The modal framework it into the layout. I'll make a focused implementation that the user can build upon.
<tool_call>
<function=bash>
<parameter=command>
rm /home/citrixlabph/championbullies/src/components/ReservationModal.tsx