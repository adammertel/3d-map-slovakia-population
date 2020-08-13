import React, { useMemo, useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useLoader, useThree } from "react-three-fiber";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import Box from "./box";
import Camera from "./camera";
import Plane from "./plane";
import Text from "./text";

const dataFile = require("./../data/svk.json");

//console.log(data);

const translateCoordinatesToPx = ([x, y]) => {
  const meta = dataFile.meta;
  const pxSize = meta.pxSize;
  const dX = x - meta.coordinatesOrigin[1];
  const dY = y - meta.coordinatesOrigin[0];
  console.log(dX, dY);
  return [dY / pxSize, dX / pxSize];
};

const trnava = translateCoordinatesToPx([48.377779, 17.590289]);
console.log(trnava);

function Rig({
  drag,
  keyDown,
  mouseMovePosition,
  mouseDownPosition,
  mouseWheel,
}) {
  const { camera } = useThree();

  const moveMultiplier = 0.025 * (camera.position.z / 100);

  const rotationSpeed = 0.01;

  useFrame(() => {
    //console.log(camera.rotation);
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

    //left
    if (keyDown === 37) {
      camera.rotation.y += rotationSpeed;
      //camera.rotation.z += rotationSpeed;
    }
    //right
    if (keyDown === 39) {
      camera.rotation.y -= rotationSpeed;
      //camera.rotation.z -= rotationSpeed;
    }
    //up
    if (keyDown === 38) {
      camera.rotation.x += rotationSpeed;
    }
    //down
    if (keyDown === 40) {
      camera.rotation.x -= rotationSpeed;
    }
    //
    //camera.lookAt(new THREE.Vector3(10, 20, 30));
    //console.log(look);
  });
  return null;
}

const App: React.FC = () => {
  useEffect(() => {}, []);

  const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  //camera.lookAt(300, -300, 0);
  camera.position.set(0, 0, 200);

  return (
    <Canvas camera={camera}>
      <Camera />
      <pointLight
        key="light"
        intensity={4}
        position={[0, 200, 40]}
        onUpdate={(self) => self.lookAt(new THREE.Vector3(0, 0, 0))}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        castShadow
      />
      <>
        {dataFile.data
          .map((row, x) => {
            return row.map((value, y) => {
              if (value !== false && value !== 0 && x < 100) {
                const z = value / 5;
                return (
                  <Box
                    keyValue={x + "-" + y}
                    sizes={[1, 1, z]}
                    position={[x, -y, z / 2]}
                  />
                );
              }
            });
          })
          .flat(2)}
      </>
      <>
        <mesh position={[...trnava, 25]} receiveShadow castShadow>
          <boxBufferGeometry
            attach="geometry"
            args={[0.1, 0.1, 50]}
            key="buffer"
          />
          <meshStandardMaterial
            attach="material"
            key="material"
            color={"black"}
          />
        </mesh>
        <group>
          <Text
            color="black"
            size={2}
            position={[...trnava, 50]}
            children="Trnava"
          />
        </group>
      </>
    </Canvas>
  );
};
/*
<Box position={[1.2, -2, 0]} />
<Plane position={[-25, -25, 0]} />,
*/
export default App;
