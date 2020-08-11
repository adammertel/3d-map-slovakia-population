import React, { useMemo, useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "react-three-fiber";

import Box from "./box";
import Plane from "./plane";

const data = require("./../data/svk.json");

console.log(data);

function Rig({ drag, mouseMovePosition, mouseDownPosition, mouseWheel }) {
  const { camera } = useThree();

  const moveMultiplier = 0.005;

  useFrame(() => {
    const move = mouseMovePosition.current;
    const down = mouseDownPosition.current;

    camera.position.x -= (move[0] - down[0]) * moveMultiplier;
    camera.position.y += (move[1] - down[1]) * moveMultiplier;

    const zMin = 10;
    const zMax = 300;
    const zMultiplier = 0.05;
    const newZ = camera.position.z - mouseWheel.current * zMultiplier;
    camera.position.z = Math.max(zMin, Math.min(zMax, newZ));

    // actual lookAt
    const look = new THREE.Vector3(0, 0, -camera.position.x)
      .applyQuaternion(camera.quaternion)
      .add(camera.position);
    //camera.lookAt(new THREE.Vector3(10, 20, 30));
    //console.log(look);
  });
  return null;
}

const boxes = [];
data.forEach((row, x) => {
  row.forEach((value, y) => {
    if (value !== false && value !== 0) {
      const z = value / 10;

      boxes.push(
        <Box
          id={parseInt([x, y].join("000"))}
          sizes={[1, 1, z]}
          position={[x, -y, z / 2]}
        />
      );
    }
  });
});

const App: React.FC = () => {
  const mouseDownPosition = useRef([0, 0]);
  const mouseMovePosition = useRef([0, 0]);
  const mouseWheel = useRef(0);
  const [drag, setDrag] = useState(false);

  return (
    <Canvas
      camera={{ position: [0, -30, 70], fov: 120 }}
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
        mouseWheel.current = Math.abs(e.deltaY) > 10 ? e.deltaY : 0;
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
