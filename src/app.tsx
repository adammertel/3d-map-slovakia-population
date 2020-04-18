import React, { useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "react-three-fiber";

import Box from "./box";
import Plane from "./plane";

/*
function Rig({ mouse }) {
  const { camera } = useThree();
  useFrame(() => {
    camera.position.x += (mouse.current[0] / 50 - camera.position.x) * 0.05;
    camera.position.y += (-mouse.current[1] / 50 - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);
  });
  return null;
}
*/

const App: React.FC = () => {
  const mouse = useRef([0, 0]);
  return (
    <Canvas
      camera={{ position: [0, -20, 10] }}
      /*
      onMouseMove={(e) =>
        (mouse.current = [
          e.clientX - window.innerWidth / 2,
          e.clientY - window.innerHeight / 2,
        ])
      }
      */
    >
      >
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Plane position={[0, 0, 0]} />
      <Box position={[1.2, 0, 0]} />
    </Canvas>
  );
};
/*
<Box position={[1.2, -2, 0]} />
<Rig mouse={mouse} />
*/
export default App;
