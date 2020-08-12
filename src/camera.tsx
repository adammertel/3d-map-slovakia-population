import React, { useEffect } from "react";
import { useFrame, useThree } from "react-three-fiber";
import { MapControls } from "three/examples/jsm/controls/OrbitControls";

const minZPosition = 20;
const Camera = ({}) => {
  const { camera, gl } = useThree();

  useFrame(() => {
    if (camera.position.z < minZPosition) {
      camera.position.z = minZPosition;
    }
  });

  useEffect(() => {
    const controls = new MapControls(camera, gl.domElement);

    controls.screenSpacePanning = true;
    controls.autoRotate = true;
    controls.panSpeed = 1.5;
    controls.zoomSpeed = 0.5;

    controls.minDistance = 100;
    controls.maxDistance = 5000;

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
