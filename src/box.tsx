import React, { useRef, useState } from "react";
import { useFrame } from "react-three-fiber";

const Box = ({ position, sizes, keyValue }) => {
  // This reference will give us direct access to the mesh
  //const mesh = useRef();

  // Set up state for the hovered and active state
  //const [hovered, setHover] = useState(false);
  //const [active, setActive] = useState(false);

  return (
    <mesh
      position={position}
      //ref={mesh}
      key={keyValue}
      //onClick={(e) => setActive(!active)}
      //onPointerOver={(e) => setHover(true)}
      //onPointerOut={(e) => setHover(false)}
      receiveShadow
      castShadow
    >
      <boxBufferGeometry attach="geometry" args={sizes} key="buffer" />
      <meshStandardMaterial
        attach="material"
        key="material"
        color={"hotpink"}
      />
    </mesh>
  );
};

export default Box;
