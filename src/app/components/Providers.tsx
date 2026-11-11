"use client";
import React from "react";
import { MotionConfig } from "motion/react";
import { DonateProvider } from "./DonateProvider";

// reducedMotion="user" turns transform/layout animation off for people who ask for it.
const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <MotionConfig reducedMotion="user">
    <DonateProvider>{children}</DonateProvider>
  </MotionConfig>
);

export default Providers;
