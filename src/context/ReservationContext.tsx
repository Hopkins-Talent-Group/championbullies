"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  type ReactNode,
} from "react";
import {
  RESERVATION_STEPS,
  reservationSubmissionSchema,
  type HomeType,
  type PuppyDetails,
  type ReservationResponse,
  type ReservationSubmission,
  type StepName,
} from "@/lib/validation";

export type PuppyData = PuppyDetails;

export type ReservationStatus = "idle" | "submitting" | "success" | "error";

export type FailureReason = "invalid" | "unconfigured" | "delivery_failed" | "network";

export type FormData = {
  puppy: PuppyData | null;
  name: string;
  email: string;
  phone: string;
  homeType: HomeType | "";
  hasYard: boolean | null;
  otherPets: string;
  childrenAges: string;
  hoursAlone: string;
  healthGuaranteeAck: boolean;
  spayNeuterAck: boolean;
  depositAck: boolean;
};

export type ReservationState = {
  isOpen: boolean;
  step: StepName;
  status: ReservationStatus;
  reference: string | null;
  failure: FailureReason | null;
  data: FormData;
  // The validated payload of the attempt in flight, kept so a failed delivery
  // can still be sent from the visitor's own mail client without retyping.
  submission: ReservationSubmission | null;
};

export type ReservationActions = {
  open: (puppy: PuppyData) => void;
  close: () => void;
  next: () => void;
  back: () => void;
  goto: (step: StepName) => void;
  setFields: (fields: Partial<FormData>) => void;
  submit: (fields?: Partial<FormData>) => Promise<void>;
};

const EMPTY_DATA: FormData = {
  puppy: null,
  name: "",
  email: "",
  phone: "",
  homeType: "",
  hasYard: null,
  otherPets: "",
  childrenAges: "",
  hoursAlone: "",
  healthGuaranteeAck: false,
  spayNeuterAck: false,
  depositAck: false,
};

const initialState: ReservationState = {
  isOpen: false,
  step: "puppy",
  status: "idle",
  reference: null,
  failure: null,
  data: EMPTY_DATA,
  submission: null,
};

type Action =
  | { type: "open"; puppy: PuppyData }
  | { type: "close" }
  | { type: "next" }
  | { type: "back" }
  | { type: "goto"; step: StepName }
  | { type: "setFields"; fields: Partial<FormData> }
  | { type: "attemptStarted"; submission: ReservationSubmission }
  | { type: "attemptSucceeded"; reference: string }
  | { type: "attemptFailed"; failure: FailureReason; step?: StepName };

function stepIndex(step: StepName): number {
  return RESERVATION_STEPS.indexOf(step);
}

function reducer(state: ReservationState, action: Action): ReservationState {
  switch (action.type) {
    case "open":
      // Cleared here rather than on close so the panel keeps its content while
      // it animates out, and nothing is retained between visits.
      return {
        ...initialState,
        data: { ...EMPTY_DATA, puppy: action.puppy },
        isOpen: true,
      };
    case "close":
      return { ...state, isOpen: false };
    case "next": {
      const nextIndex = Math.min(stepIndex(state.step) + 1, RESERVATION_STEPS.length - 1);
      return { ...state, step: RESERVATION_STEPS[nextIndex] };
    }
    case "back": {
      const previousIndex = Math.max(stepIndex(state.step) - 1, 0);
      return { ...state, step: RESERVATION_STEPS[previousIndex] };
    }
    case "goto":
      // Only backwards: a forward jump would skip the step's own validation.
      return stepIndex(action.step) <= stepIndex(state.step)
        ? { ...state, step: action.step }
        : state;
    case "setFields":
      return { ...state, data: { ...state.data, ...action.fields } };
    case "attemptStarted":
      return { ...state, status: "submitting", failure: null, submission: action.submission };
    case "attemptSucceeded":
      return { ...state, status: "success", reference: action.reference, failure: null };
    case "attemptFailed":
      return {
        ...state,
        status: "error",
        failure: action.failure,
        step: action.step ?? state.step,
      };
    default:
      return state;
  }
}

const ReservationContext = createContext<{
  state: ReservationState;
  actions: ReservationActions;
} | null>(null);

function buildCandidate(data: FormData) {
  return {
    puppy: data.puppy,
    contact: { name: data.name, email: data.email, phone: data.phone },
    living: {
      homeType: data.homeType,
      hasYard: data.hasYard,
      otherPets: data.otherPets.trim() || undefined,
      childrenAges: data.childrenAges.trim() || undefined,
      hoursAlone: data.hoursAlone,
    },
    agreement: {
      healthGuaranteeAck: data.healthGuaranteeAck,
      spayNeuterAck: data.spayNeuterAck,
      depositAck: data.depositAck,
    },
  };
}

export function toSubmission(data: FormData): ReservationSubmission | null {
  const parsed = reservationSubmissionSchema.safeParse(buildCandidate(data));
  return parsed.success ? parsed.data : null;
}

// Names the step holding the first missing answer, so a failed submit can send
// the visitor back to it instead of showing a dead error.
export function missingStep(data: FormData): StepName | null {
  const parsed = reservationSubmissionSchema.safeParse(buildCandidate(data));
  if (parsed.success) return null;

  const first = parsed.error.issues[0]?.path[0];
  return typeof first === "string" && (RESERVATION_STEPS as readonly string[]).includes(first)
    ? (first as StepName)
    : "contact";
}

export function ReservationProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const stateRef = useRef(state);

  // Kept in a ref so the submit callback reads the latest data without being
  // rebuilt on every keystroke.
  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  const submit = useCallback(async (fields?: Partial<FormData>) => {
    // The last step collects its acknowledgements and sends in one gesture, so
    // the fresh values arrive here rather than through the reducer a tick later.
    if (fields) dispatch({ type: "setFields", fields });

    const current = stateRef.current;
    const data = fields ? { ...current.data, ...fields } : current.data;
    const submission = toSubmission(data);

    if (!submission) {
      dispatch({
        type: "attemptFailed",
        failure: "invalid",
        step: missingStep(data) ?? current.step,
      });
      return;
    }

    dispatch({ type: "attemptStarted", submission });

    try {
      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submission),
        signal: AbortSignal.timeout(15000),
      });

      const payload = (await response.json().catch(() => null)) as ReservationResponse | null;

      if (payload?.ok) {
        dispatch({ type: "attemptSucceeded", reference: payload.reference });
        return;
      }

      dispatch({
        type: "attemptFailed",
        failure:
          payload && !payload.ok && payload.reason === "unconfigured"
            ? "unconfigured"
            : "delivery_failed",
      });
    } catch {
      dispatch({ type: "attemptFailed", failure: "network" });
    }
  }, []);

  const actions = useMemo<ReservationActions>(
    () => ({
      open: (puppy) => dispatch({ type: "open", puppy }),
      close: () => dispatch({ type: "close" }),
      next: () => dispatch({ type: "next" }),
      back: () => dispatch({ type: "back" }),
      goto: (step) => dispatch({ type: "goto", step }),
      setFields: (fields) => dispatch({ type: "setFields", fields }),
      submit,
    }),
    [submit]
  );

  const value = useMemo(() => ({ state, actions }), [state, actions]);

  return <ReservationContext.Provider value={value}>{children}</ReservationContext.Provider>;
}

export function useReservation() {
  const context = useContext(ReservationContext);
  if (!context) {
    throw new Error("useReservation must be used inside ReservationProvider");
  }
  return context;
}