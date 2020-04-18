import React, { useRef, useState } from "react";
import { useFrame } from "react-three-fiber";

const Plane = (props) => {
  return (
    <mesh {...props}>
      <planeGeometry attach="geometry" args={[5, 5, 5, 5]} />
      <meshStandardMaterial attach="material" color={"blue"} />
    </mesh>
  );
};

export default Plane;
