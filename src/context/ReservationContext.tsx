"use client";

import { createContext, useContext, useState, useReducer, ReactNode } from "react";

type Step = "puppy" | "contact" | "living" | "agreement";

type PuppyData = {
  key: string;
  name: string;
  breed: string;
  price: string;
  gender: string;
  year: string;
};

type FormStepData = {
  puppy: PuppyData | null;
  // Step 1: Puppy (read-only, pre-filled from card click)
  // Step 2: Contact
  name: string;
  email: string;
  phone: string;
  // Step 3: Living Situation
  homeType: "house" | "apartment" | "other";
  hasYard: boolean;
  otherPets: string;
  childrenAges: string;
  hoursAlone: string;
  // Step 4: Agreement & Deposit
  healthGuaranteeAck: boolean;
  spayNeuterAck: boolean;
  depositPaid: boolean;
  paymentMethodId?: string;
};

type ReservationState = {
  step: Step;
  data: FormStepData;
  isOpen: boolean;
};

type ReservationActions = {
  open: (puppy?: PuppyData) => void;
  close: () => void;
  next: () => void;
  back: () => void;
  setField: (field: keyof FormStepData, value: string | boolean) => void;
  reset: () => void;
};

type ReservationProviderProps = {
  children: ReactNode;
};

const initialState: ReservationState = {
  step: "puppy",
  data: {
    puppy: null,
    name: "",
    email: "",
    phone: "",
    homeType: "house",
    hasYard: false,
    otherPets: "",
    childrenAges: "",
    hoursAlone: "",
    healthGuaranteeAck: false,
    spayNeuterAck: false,
    depositPaid: false,
  },
  isOpen: false,
};

const ReservationContext = createContext<{
  state: ReservationState;
  actions: ReservationActions;
} | null>(null);

export const ReservationProvider = ({ children }: ReservationProviderProps) => {
  const [state, dispatch] = useReducer(
    (state: ReservationState, action: any) => {
      switch (action.type) {
        case "open":
          return {
            ...state,
            isOpen: true,
            step: "puppy",
            data: {
              ...state.data,
              puppy: action.puppy || null,
              name: "",
              email: "",
              phone: "",
              homeType: "house",
              hasYard: false,
              otherPets: "",
              childrenAges: "",
              hoursAlone: "",
              healthGuaranteeAck: false,
              spayNeuterAck: false,
              depositPaid: false,
            },
          };
        case "close":
          return {
            ...state,
            isOpen: false,
            step: "puppy",
            data: {
              puppy: null,
              name: "",
              email: "",
              phone: "",
              homeType: "house",
              hasYard: false,
              otherPets: "",
              childrenAges: "",
              hoursAlone: "",
              healthGuaranteeAck: false,
              spayNeuterAck: false,
              depositPaid: false,
            },
          };
        case "next":
          const nextStep =
            state.step === "puppy"
              ? "contact"
              : state.step === "contact"
              ? "living"
              : state.step === "living"
              ? "agreement"
              : "puppy";
          return {
            ...state,
            step: nextStep,
          };
        case "back":
          const prevStep =
            state.step === "puppy"
              ? "agreement"
              : state.step === "agreement"
              ? "living"
              : state.step === "living"
              ? "contact"
              : "puppy";
          return {
            ...state,
            step: prevStep,
          };
        case "setField":
          const { field, value } = action;
          return {
            ...state,
            data: {
              ...state.data,
              [field]: value,
            },
          };
        case "reset":
          return {
            ...initialState,
          };
        default:
          return state;
      }
    },
    initialState
  );

  const value = { 
    state, 
    actions: {
      open: (puppy) => dispatch({ type: "open", puppy }),
      close: () => dispatch({ type: "close" }),
      next: () => dispatch({ type: "next" }),
      back: () => dispatch({ type: "back" }),
      setField: (field, value) => dispatch({ type: "setField", field, value }),
      reset: () => dispatch({ type: "reset" }),
    }
  };

  return (
    <ReservationContext.Provider value={value}>
      {children}
    </ReservationContext.Provider>
  );
};

export const useReservation = () => {
  const context = useContext(ReservationContext);
  if (!context) {
    throw new Error("useReservation must be used within ReservationProvider");
  }
  return context;
};