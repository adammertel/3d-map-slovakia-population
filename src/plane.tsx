import React, { useRef, useState } from "react";
import { useFrame } from "react-three-fiber";
import { Vector3 } from "three";

const r = () => Math.random();

const Plane = (props) => {
  const vectors = [];
  [...Array(50).keys()].forEach((x) => {
    [...Array(50).keys()].forEach((y) => {
      vectors.push(new Vector3(x, y, 5 - r() * 10));
    });
  });

  return (
    <mesh {...props} castShadow>
      <planeGeometry
        attach="geometry"
        args={[50, 50, 49, 49]}
        vertices={vectors}
      />
      <meshStandardMaterial
        attach="material"
        color="lightblue"
        metalness={1}
        fog
      />
    </mesh>
  );
};

export default Plane;
