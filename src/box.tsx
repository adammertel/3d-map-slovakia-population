import React, { useRef, useState } from "react";
import { useFrame } from "react-three-fiber";

const Box = ({ position, sizes }) => {
  // This reference will give us direct access to the mesh
  //const mesh = useRef();

  // Set up state for the hovered and active state
  //const [hovered, setHover] = useState(false);
  //const [active, setActive] = useState(false);

  return (
    <mesh
      position={position}
      //ref={mesh}
      //onClick={(e) => setActive(!active)}
      //onPointerOver={(e) => setHover(true)}
      //onPointerOut={(e) => setHover(false)}

      castShadow
    >
      <boxBufferGeometry attach="geometry" args={sizes} key="buffer" />
      <meshStandardMaterial attach="material" key="material" color="#3182bd" />
    </mesh>
  );
};

export default Box;
