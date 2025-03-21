"use client";

import React, { useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react"; // For checkmark icons

type StepperProps = {
  children: ReactNode[];
  initialStep?: number;
  onStepChange?: (step: number) => void;
  onFinalStepCompleted?: () => void;
};

type StepProps = {
  children: ReactNode;
};

export default function Stepper({
  children,
  initialStep = 1,
  onStepChange,
  onFinalStepCompleted,
}: StepperProps) {
  const [currentStep, setCurrentStep] = useState<number>(initialStep);
  const [direction, setDirection] = useState<number>(0);
  const stepsArray = React.Children.toArray(children);
  const totalSteps = stepsArray.length;
  const isCompleted = currentStep > totalSteps;
  const isLastStep = currentStep === totalSteps;

  const updateStep = (newStep: number) => {
    setCurrentStep(newStep);
    if (newStep > totalSteps) {
      onFinalStepCompleted && onFinalStepCompleted();
    } else {
      onStepChange && onStepChange(newStep);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setDirection(-1);
      updateStep(currentStep - 1);
    }
  };

  const handleNext = () => {
    if (!isLastStep) {
      setDirection(1);
      updateStep(currentStep + 1);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 space-y-6">
      {/* Step Indicators with Connecting Lines */}
      <div className="flex items-center space-x-2">
        {stepsArray.map((_, index) => {
          const stepNumber = index + 1;
          const isCompleted = currentStep > stepNumber;
          const isActive = currentStep === stepNumber;

          return (
            <React.Fragment key={index}>
              <motion.div
                className={`h-10 w-10 flex items-center justify-center rounded-full font-semibold transition ${
                  isCompleted
                    ? "bg-blue-500 text-black" // Completed step
                    : isActive
                    ? "bg-blue-500 text-black ring-2 ring-white" // Current step
                    : "bg-gray-700 text-black" // Incomplete step
                }`}
                onClick={() => updateStep(stepNumber)}
              >
                {isCompleted ? <Check size={20} /> : stepNumber}
              </motion.div>
              {index < stepsArray.length - 1 && (
                <div
                  className={`h-1 w-12 ${
                    currentStep > stepNumber ? "bg-blue-500" : "bg-gray-500"
                  }`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Step Content */}
      <StepContentWrapper isCompleted={isCompleted} currentStep={currentStep} direction={direction}>
        {stepsArray[currentStep - 1]}
      </StepContentWrapper>

      {/* Navigation Buttons */}
      {!isCompleted && (
        <div className="flex justify-between w-full max-w-md">
          <button
            onClick={handleBack}
            disabled={currentStep === 1}
            className="px-4 py-2 bg-gray-300 text-black rounded disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            {isLastStep ? "Finish" : "Next"}
          </button>
        </div>
      )}
    </div>
  );
}

function StepContentWrapper({ isCompleted, currentStep, direction, children }: StepProps & { isCompleted: boolean; currentStep: number; direction: number }) {
  return (
    <motion.div
      className="relative overflow-hidden w-full max-w-md p-4 bg-black rounded-lg shadow-lg text-white text-2xl"
      animate={{ opacity: isCompleted ? 0 : 1 }}
    >
      <AnimatePresence initial={false} mode="sync" custom={direction}>
        {!isCompleted && (
          <SlideTransition key={currentStep} direction={direction}>
            {children}
          </SlideTransition>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function SlideTransition({ children, direction }: StepProps & { direction: number }) {
  return (
    <motion.div
      custom={direction}
      variants={{
        enter: (dir) => ({ x: dir >= 0 ? "100%" : "-100%", opacity: 0 }),
        center: { x: "0%", opacity: 1 },
        exit: (dir) => ({ x: dir >= 0 ? "-50%" : "50%", opacity: 0 }),
      }}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.4 }}
    >
      {children}
    </motion.div>
  );
}

export function Step({ children }: StepProps) {
  return <div className="p-4">{children}</div>;
}