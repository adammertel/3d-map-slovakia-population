import React, { useRef, useState } from "react";
import { useFrame } from "react-three-fiber";
import { Vector3 } from "three";

const r = () => Math.random();

const Plane = (props) => {
  const vectors = [];
  [...Array(5).keys()].forEach((x) => {
    [...Array(5).keys()].forEach((y) => {
      vectors.push(new Vector3(x, y, r() * r() * r() * 4));
    });
  });

  return (
    <>
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <planeGeometry
          attach="geometry"
          args={[10, 10, 4, 4]}
          vertices={vectors}
        />
        <meshStandardMaterial attach="material" color="lightblue" />
      </mesh>
      <mesh position={[10, 10, 0]} castShadow receiveShadow>
        <planeGeometry
          attach="geometry"
          args={[10, 10, 4, 4]}
          vertices={vectors}
        />
        <meshStandardMaterial attach="material" color="lightblue" />
      </mesh>
    </>
  );
};

export default Plane;
