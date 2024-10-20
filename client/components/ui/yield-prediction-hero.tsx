import React from "react";
import { FlipWords } from "./flip-words";
import YieldPredictionForm from "./yield-prediction-form";

const yieldPrediction = () => {
  const words = ["better crops", "higher crops", "maximized crops", "healthy crops"];

  return (
    <div className="flex flex-row">
      <div className="text-4xl font-normal mt-[15rem] ml-40 text-neutral-600 dark:text-neutral-400">
        Predict & Analyze yield with &ldquo;KUMBURA&ldquo; <br />
        for <FlipWords words={words} /> 
      </div>
      <div>
        <YieldPredictionForm />
      </div>
    </div>
  );
}

export default yieldPrediction;