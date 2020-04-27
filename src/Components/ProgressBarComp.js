import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import AnimatedProgressProvider from "./AnimatedProgressProvider";
import { easeQuadInOut } from "d3-ease";

const ProgressBarComp = () => {
  return (
    <div>
      <AnimatedProgressProvider
        valueStart={0}
        valueEnd={100}
        duration={5}
        easingFunction={easeQuadInOut}
        repeat
      >
        {(value) => {
          const roundedValue = Math.round(value);
          return (
            <CircularProgressbar
              value={value}
              strokeWidth={5}
              styles={buildStyles({
                pathTransition: "none",
                textColor: "#00af80",
                pathColor: "#00af80",
                strokeLinecap: "butt",
              })}
            />
          );
        }}
      </AnimatedProgressProvider>
    </div>
  );
};

export default ProgressBarComp;
