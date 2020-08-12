import React, { useEffect, useState } from "react";
import { useFrame, useThree } from "react-three-fiber";
import { MapControls } from "three/examples/jsm/controls/OrbitControls";

const minZPosition = 20;
const keyPanningSpeed = 1;

const Camera = ({}) => {
  const { camera, gl } = useThree();

  const [keyDown, setKeyDown] = useState(false);

  useFrame(() => {
    if (camera.position.z < minZPosition) {
      camera.position.z = minZPosition;
    }

    //left
    if (keyDown === 37) {
      camera.position.x -= keyPanningSpeed;
    }
    //right
    if (keyDown === 39) {
      camera.position.x += keyPanningSpeed;
    }
    //up
    if (keyDown === 38) {
      camera.position.y += keyPanningSpeed;
    }
    //down
    if (keyDown === 40) {
      camera.position.y -= keyPanningSpeed;
    }
  });

  useEffect(() => {
    // setting the key down/up listeners
    document.addEventListener("keydown", (e) => {
      setKeyDown(e.keyCode);
    });
    document.addEventListener("keyup", (e) => {
      setKeyDown(false);
    });

    const controls = new MapControls(camera, gl.domElement);

    controls.screenSpacePanning = true;
    controls.autoRotate = true;
    controls.panSpeed = 1.5;
    controls.zoomSpeed = 0.5;

    controls.minDistance = 100;
    controls.maxDistance = 5000;
    controls.enableKeys = false;

    controls.minPolarAngle = Math.PI * 0.6;
    controls.maxPolarAngle = Math.PI * 0.95;
    controls.minAzimuthAngle = Math.PI * 0;
    controls.maxAzimuthAngle = Math.PI * 0;

    return () => {
      controls.dispose();
    };
  }, [camera, gl]);
  return null;
};

export default Camera;
