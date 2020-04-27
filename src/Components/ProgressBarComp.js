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
        duration={2}
        easingFunction={easeQuadInOut}
      >
        {(value) => {
          const roundedValue = Math.round(value);
          return (
            <CircularProgressbar
              value={value}
              text={`${roundedValue}%`}
              styles={buildStyles({
                pathTransition: "none",
                textColor: "#00af80",
                pathColor: "#00af80",
              })}
            />
          );
        }}
      </AnimatedProgressProvider>
    </div>
  );
};

export default ProgressBarComp;
