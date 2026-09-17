"use client";

import { useEffect, useRef, useState } from "react";

const interests = [
  { value: "daphne", label: "Daphne — English Bulldog Female ($4,500)" },
  { value: "fred", label: "Fred — English Bulldog Male ($4,800)" },
  { value: "scooby", label: "Scooby — English Bulldog Male ($4,200)" },
  { value: "scrappy", label: "Scrappy — English Bulldog Male ($4,500)" },
  { value: "shaggy", label: "Shaggy — English Bulldog Male ($4,000)" },
  { value: "velma", label: "Velma — English Bulldog Female ($4,800)" },
  { value: "blue-angel", label: "Blue Angel — French Bulldog Male ($5,500)" },
  { value: "margo", label: "Margo — French Bulldog Female ($5,200)" },
  { value: "general", label: "General Inquiry" },
];

export function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "", litterInterest: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
------ snippet (first lines) ------