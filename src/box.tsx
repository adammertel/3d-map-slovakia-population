import React, { useRef, useState, useMemo } from "react";
import { useFrame } from "react-three-fiber";
import * as THREE from "three";

const Box = ({ position, sizes }) => {
  // This reference will give us direct access to the mesh
  //const mesh = useRef();

  // Set up state for the hovered and active state
  //const [hovered, setHover] = useState(false);
  //const [active, setActive] = useState(false);

  const boxMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#3182bd" })
  );

  return (
    <mesh
      position={position}
      //ref={mesh}
      //onClick={(e) => setActive(!active)}
      //onPointerOver={(e) => setHover(true)}
      //onPointerOut={(e) => setHover(false)}

      receiveShadow
      castShadow
      material={boxMaterial}
    >
      <boxBufferGeometry attach="geometry" args={sizes} />
    </mesh>
  );
};

export default Box;
