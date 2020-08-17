import React, { useEffect, useState } from "react";
import { useFrame, useThree } from "react-three-fiber";
import * as THREE from "three";
import { MapControls } from "three/examples/jsm/controls/OrbitControls";

const minYPosition = 20;
const keyPanningSpeed = 1;

const Camera = ({}) => {
  const { camera, gl } = useThree();

  const [keyDown, setKeyDown] = useState(false);

  useEffect(() => {
    console.log("did mount");
  }, []);

  useFrame(() => {
    /*
    console.log(
      camera.rotation.y.toPrecision(2),
      camera.rotation.z.toPrecision(2)
    );
    */
    //console.log(camera.toJSON());

    if (camera.position.y < minYPosition) {
      camera.position.y = minYPosition;
    }

    //camera.rotation.x = 0;
    //camera.rotation.y = 0;

    //left
    if (keyDown === 37) {
      //camera.position.x -= keyPanningSpeed;
    }
    //right
    if (keyDown === 39) {
      //camera.position.x += keyPanningSpeed;
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
    console.log("setting camera");

    //camera.lookAt(new THREE.Vector3(300, 0, 0));

    const controls = new MapControls(camera, gl.domElement);
    controls.enableDamping = false; // an animation loop is required when either damping or auto-rotation are enabled
    controls.dampingFactor = 0.05;

    controls.screenSpacePanning = false;
    controls.autoRotate = false;
    controls.panSpeed = 1.5;
    controls.zoomSpeed = 0.5;

    controls.minDistance = 5;
    controls.maxDistance = 500;
    controls.enableKeys = false;

    //controls.minPolarAngle = Math.PI * 0.05;
    controls.maxPolarAngle = Math.PI * 0.95;
    // controls.minAzimuthAngle = Math.PI * 0;
    // controls.maxAzimuthAngle = Math.PI * 0;

    camera.position.z = -200;
    camera.position.y = 300;
    camera.position.x = 0;

    //camera.lookAt(0, 0, 0);
    controls.update();

    return () => {
      controls.dispose();
    };
  }, [camera, gl]);
  return null;
};

export default Camera;
