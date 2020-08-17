import React, { useMemo, useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useLoader, useThree } from "react-three-fiber";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import Box from "./box";
import Camera from "./camera";
import Plane from "./plane";
import Text from "./text";

const dataFile = require("./../data/population.json");
import settlements from "./../data/municipalities-slovakia.json";

//console.log(data);

const translateCoordinatesToPx = ([x, y]) => {
  const meta = dataFile.meta;
  const pxSize = meta.pxSize;
  const dX = x - meta.coordinatesOrigin[1];
  const dY = y - meta.coordinatesOrigin[0];
  return [dY / pxSize, dX / pxSize];
};

const App: React.FC = () => {
  useEffect(() => {}, []);

  const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );

  const labels = useMemo(() => {
    return settlements.features
      .filter((s) => s.properties.population > 15000)
      .map((settlement) => {
        const coords = settlement.geometry.coordinates;
        const pxs = translateCoordinatesToPx([coords[1], coords[0]]);
        return (
          <group>
            <mesh position={[-pxs[0], 25, pxs[1]]}>
              <boxBufferGeometry
                attach="geometry"
                args={[0.1, 50, 0.1]}
                key="buffer"
              />
              <meshStandardMaterial
                attach="material"
                key="material"
                color={"black"}
              />
            </mesh>
            <Text
              color="black"
              size={2}
              position={[-pxs[0], 50, pxs[1]]}
              children={
                settlement.properties.name +
                " - " +
                settlement.properties.population
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
              }
            />
          </group>
        );
      });
  }, []);

  const boxes = useMemo(() => {
    return dataFile.data
      .map((row, x) => {
        return row.map((value, z) => {
          if (value !== false && value !== 0) {
            const y = value / 5;
            return <Box sizes={[1, y, 1]} position={[-x, y / 2, -z]} />;
          }
        });
      })
      .flat(2);
  }, []);

  return (
    <div>
      <Canvas camera={camera} shadowMap>
        <Camera />
        <spotLight
          key="light"
          intensity={1.5}
          position={[
            -dataFile.data[0].length / 2,
            300,
            -dataFile.data[0].length * 2,
          ]}
          castShadow
        />
        <ambientLight key="light-ambient" intensity={0.1} color="#fff" />
        <>
          <group>{boxes}</group>
        </>
        <>
          <group>{labels}</group>
        </>
      </Canvas>
      <a
        href="https://github.com/adammertel/3d-map-slovakia-population"
        style={{
          position: "absolute",
          bottom: "2%",
          right: "2%",
          fontSize: "2em",
        }}
      >
        info
      </a>
    </div>
  );
};
/*
<Box position={[1.2, -2, 0]} />
<Plane position={[-25, -25, 0]} />,
*/
export default App;
