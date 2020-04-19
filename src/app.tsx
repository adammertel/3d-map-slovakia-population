import React, { useMemo, useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "react-three-fiber";

import Box from "./box";
import Plane from "./plane";

function Rig({ drag, mouseMovePosition, mouseDownPosition, mouseWheel }) {
  const { camera } = useThree();

  const moveBonus = 0;

  useFrame(() => {
    const move = mouseMovePosition.current;
    const down = mouseDownPosition.current;
    let theta = -(move[0] - down[0]) * 0.75 + moveBonus;
    let phi = (move[1] - down[1]) * 0.75 + moveBonus;
    //phi = Math.min(180, Math.max(0, phi));

    if (theta || phi) {
      camera.position.x +=
        Math.sin((theta * Math.PI) / 360) * Math.cos((phi * Math.PI) / 360);
      camera.position.y += Math.sin((phi * Math.PI) / 360);
    }
    camera.position.z += mouseWheel.current * 0.05;

    //console.log(camera.position);
  });
  return null;
}

const boxes = [];
[...Array(25).keys()].forEach((x) => {
  [...Array(25).keys()].forEach((y) => {
    const z = 1 + (x + y) * 0.25 + parseInt(Math.random() * 2);
    boxes.push(
      <Box key={x + "-" + y} sizes={[1, 1, z]} position={[x, y, z / 2]} />
    );
  });
});

const App: React.FC = () => {
  const mouseDownPosition = useRef([0, 0]);
  const mouseMovePosition = useRef([0, 0]);
  const mouseWheel = useRef(0);
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
        mouseMovePosition.current = [e.clientX, e.clientY];
        mouseDownPosition.current = [e.clientX, e.clientY];
        setDrag(false);
      }}
      onMouseMove={(e) => {
        if (drag) {
          mouseMovePosition.current = [e.clientX, e.clientY];
        }
      }}
      onWheel={(e) => {
        //console.log("y", e.deltaY);
        mouseWheel.current = e.deltaY;
        setTimeout(() => {
          mouseWheel.current = 0;
        }, 500);
        //mouseWheel.current = 0;
      }}
    >
      <pointLight
        intensity={4}
        position={[0, 200, 40]}
        onUpdate={(self) => self.lookAt(new THREE.Vector3(0, 0, 0))}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        castShadow
      />
      {boxes}
      <Rig
        drag={drag}
        mouseMovePosition={mouseMovePosition}
        mouseDownPosition={mouseDownPosition}
        mouseWheel={mouseWheel}
      />
    </Canvas>
  );
};
/*
<Box position={[1.2, -2, 0]} />
<Plane position={[-25, -25, 0]} />,
*/
export default App;
