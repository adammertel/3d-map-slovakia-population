import React, { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "react-three-fiber";

import Box from "./box";
import Plane from "./plane";

function Rig({ drag, mouseMovePosition, mouseDownPosition }) {
  const { camera } = useThree();

  const moveBonus = 0;

  useFrame(() => {
    if (drag) {
      const move = mouseMovePosition.current;
      const down = mouseDownPosition.current;
      let theta = -(move[0] - down[0]) * 0.75 + moveBonus;
      let phi = (move[1] - down[1]) * 0.75 + moveBonus;
      //phi = Math.min(180, Math.max(0, phi));

      camera.position.x +=
        Math.sin((theta * Math.PI) / 360) * Math.cos((phi * Math.PI) / 360);
      camera.position.y += Math.sin((phi * Math.PI) / 360);

      /*
      camera.position.z +=
        Math.cos((theta * Math.PI) / 360) * Math.cos((phi * Math.PI) / 360);
        */
    }
  });
  return null;
}

const App: React.FC = () => {
  const mouseDownPosition = useRef([0, 0]);
  const mouseMovePosition = useRef([0, 0]);
  const [drag, setDrag] = useState(false);

  return (
    <Canvas
      camera={{ position: [0, -20, 30], fov: 120 }}
      onMouseDown={(e) => {
        mouseMovePosition.current = [e.clientX, e.clientY];
        mouseDownPosition.current = [e.clientX, e.clientY];
        setDrag(true);
      }}
      onMouseUp={(e) => {
        setDrag(false);
      }}
      onMouseMove={(e) => {
        if (drag) {
          mouseMovePosition.current = [e.clientX, e.clientY];
        }
      }}
    >
      <pointLight intensity={0.2} position={[0, 0, 50]} />
      <Plane position={[-25, -25, 0]} />
      <Box position={[0, 0, 20]} />
      <Rig
        drag={drag}
        mouseMovePosition={mouseMovePosition}
        mouseDownPosition={mouseDownPosition}
      />
    </Canvas>
  );
};
/*
<Box position={[1.2, -2, 0]} />
*/
export default App;
