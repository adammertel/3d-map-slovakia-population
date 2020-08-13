import React, { useMemo, useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useLoader, useThree } from "react-three-fiber";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import Box from "./box";
import Camera from "./camera";
import Plane from "./plane";
import Text from "./text";

const data = require("./../data/svk.json");

//console.log(data);

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
  const mouseDownPosition = useRef([0, 0]);
  const mouseMovePosition = useRef([0, 0]);
  const mouseWheel = useRef(0);

  const [drag, setDrag] = useState(false);
  const [keyDown, setKeyDown] = useState(false);

  /*
  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      setKeyDown(e.keyCode);
    });
    document.addEventListener("keyup", (e) => {
      setKeyDown(false);
    });
    this.controls = new OrbitControls(camera, domElement);
    //return () => document.removeEventListener("keypress", intersect);
  }, []);
  */

  const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  //camera.lookAt(300, -300, 0);
  camera.position.set(0, 0, 200);

  /*
  const font = new THREE.FontLoader().parse(fontFile);

  const textRef = useRef(null);

  useEffect(() => {
    console.log("looking at text 1");
    setTimeout(() => {
      console.log("looking at text 2", textRef.current.position);
      camera.lookAt(textRef.current.position);
    }, 3000);
  }, []);

  const font = useLoader(
    THREE.FontLoader,
    "three/examples/fonts/helvetiker_regular.typeface.json"
  );

  console.log(font);
  //const font = new THREE.Font("helvetiker");
  const textConfig = {
    font,
    size: 120,
    height: 300,
    curveSegments: 32,
    bevelEnabled: true,
    bevelThickness: 6,
    bevelSize: 2.5,
    bevelOffset: 0,
    bevelSegments: 8,
  };
  */

  //camera.lookAt(new THREE.Vector3(0, -30, 200));

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
        {data
          .map((row, x) => {
            return row.map((value, y) => {
              if (value !== false && value !== 0 && x < 100) {
                const z = value / 10;
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
        <mesh position={[50, -150, 25]} receiveShadow castShadow>
          <boxBufferGeometry
            attach="geometry"
            args={[0.1, 0.1, 50]}
            key="buffer"
          />
          <meshStandardMaterial
            attach="material"
            key="material"
            color={"hotpink"}
          />
        </mesh>

        <Text
          color="black"
          size={2}
          position={[50, -150, 50]}
          children="random town"
        />
      </>
    </Canvas>
  );
};
/*
<Box position={[1.2, -2, 0]} />
<Plane position={[-25, -25, 0]} />,
*/
export default App;
