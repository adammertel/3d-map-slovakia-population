import React, { useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "react-three-fiber";

import Box from "./box";
import Plane from "./plane";

function Rig({ mouse }) {
  const { camera } = useThree();
  useFrame(() => {
    camera.position.x += (mouse.current[0] / 20 - camera.position.x) * 0.25;
    camera.position.y +=
      (-mouse.current[1] / 20 - camera.position.y) * 0.25 - 5;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

const App: React.FC = () => {
  const mouse = useRef([0, -20]);
  return (
    <Canvas
      camera={{ position: [0, -20, 30], fov: 120 }}
      onMouseMove={(e) =>
        (mouse.current = [
          e.clientX - window.innerWidth / 2,
          e.clientY - window.innerHeight / 2,
        ])
      }
    >
      <pointLight intensity={0.2} position={[0, 0, 50]} />
      <Plane position={[-25, -25, 0]} />
      <Box position={[0, 0, 20]} />
      <Rig mouse={mouse} />
    </Canvas>
  );
};
/*
<Box position={[1.2, -2, 0]} />
*/
export default App;
