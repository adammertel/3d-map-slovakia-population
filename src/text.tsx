import React, { useMemo, useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useLoader, useThree } from "react-three-fiber";

import fontFile from "./sans";

type TextProps = {
  children: string;
  size: number;
  letterSpacing: number;
  color: string;
  centerX: boolean;
  centerY: boolean;
  rotation: [number, number, number];
  position: [number, number, number];
};

const Text: React.FC = ({
  children,
  size = 1,
  letterSpacing = 0.01,
  color = "#000000",
  centerX = true,
  centerY = true,
  rotation = [0, 0, 0],
  position = [0, 0, 0],
}: TextProps) => {
  const [font] = useState(() => new THREE.FontLoader().parse(fontFile));
  console.log(rotation);

  const { camera } = useThree();

  const textRef = useRef(null);

  const [shapes, [x, y]] = useMemo(() => {
    let x = 0,
      y = 0;
    let letters = [...String(children)];
    let mat = new THREE.MeshBasicMaterial({
      color,
      opacity: 1,
      transparent: true,
    });

    return [
      letters
        .map((letter) => {
          if (letter === " ") {
            x += size / 2;
            return null;
          } else {
            const geom = new THREE.ShapeGeometry(
              font.generateShapes(letter, size, 1)
            );
            geom.computeBoundingBox();

            const mesh = new THREE.Mesh(geom, mat);
            mesh.position.x = x;

            x += geom.boundingBox.max.x + letterSpacing;
            y = Math.max(y, geom.boundingBox.max.y);
            return mesh;
          }
        })
        .filter((l) => l),
      [x, y],
    ];
  }, [font, children, size, letterSpacing, color]);

  useFrame(() => {
    textRef.current.rotation.x = camera.rotation.x;
  });

  return (
    <group position={position}>
      <group
        ref={textRef}
        position={[centerX ? -x / 2 : 0, centerY ? -y / 2 : 0, 0]}
      >
        {shapes.map((shape, index) => (
          <primitive key={index} object={shape} />
        ))}
      </group>
    </group>
  );
};

export default Text;
