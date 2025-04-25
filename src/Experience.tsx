import {
  OrbitControls,
  OrbitControlsChangeEvent,
  SoftShadows,
  useGLTF,
  useHelper,
} from "@react-three/drei";
import { useControls } from "leva";
import Models from "./Models.tsx";
import { Perf } from "r3f-perf";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { useCameraStore } from "./stores/useCameraStore.ts";

function Experience() {
  const lightRef = useRef<THREE.DirectionalLight>(null!);
  const { camera } = useThree();
  const controlsRef = useRef<OrbitControlsChangeEvent | null>(null);
  const [isPositionApplied, setIsPositionApplied] = useState(false);

  const { position, setPosition } = useCameraStore();

  useEffect(() => {
    if (camera && !isPositionApplied) {
      camera.position.set(position.x, position.y, position.z);

      // Allow a small delay before we start tracking position changes
      setTimeout(() => {
        setIsPositionApplied(true);
      }, 100);
    }
  }, [camera, position, isPositionApplied, setPosition]);

  useFrame(() => {
    if (camera && isPositionApplied) {
      // Check if camera position has significantly changed to avoid constant saving

      // Save new position
      setPosition(
        new THREE.Vector3(
          camera.position.x,
          camera.position.y,
          camera.position.z
        )
      );
    }
  });

  // Save camera position when it changes
  const handleControlsChange = () => {
    if (camera && controlsRef.current) {
      // Save position when camera moves
      setPosition(
        new THREE.Vector3(
          camera.position.x,
          camera.position.y,
          camera.position.z
        )
      );
    }
  };

  useHelper(lightRef, THREE.DirectionalLightHelper, 1, "hotpink");

  const {
    dposition,
    intensity,
    color,
    castShadow,
    shadowBias,
    softness,
    blurSamples,
    shadowCameraFar,
    shadowCameraNear,
    shadowCameraTop,
    shadowCameraRight,
    shadowCameraBottom,
    shadowCameraLeft,
    ambientIntensity,
  } = useControls("Directional Light", {
    ambientIntensity: { value: 0.45, min: 0, max: 1, step: 0.01 },
    intensity: { value: 4.6, min: 0, max: 10, step: 0.1 },
    color: "#9c9c9c",
    castShadow: true,
    dposition: [0, 120, 170],
    shadowBias: { value: -0.0005, min: -0.01, max: 0.01, step: 0.0001 }, // More precise bias
    normalBias: { value: 0.002, min: 0, max: 0.01, step: 0.0001 },
    softness: { value: 8, min: 0, max: 20, step: 0.1 },
    blurSamples: { value: 16, min: 1, max: 25, step: 1 },
    shadowCameraFar: { value: 600, min: 0, max: 1000, step: 1 },
    shadowCameraNear: { value: 0.1, min: 0, max: 200, step: 0.1 },
    shadowCameraTop: { value: 500, min: 0, max: 1000, step: 1 },
    shadowCameraRight: { value: 500, min: 0, max: 1000, step: 1 },
    shadowCameraBottom: { value: -500, min: -1000, max: 0, step: 1 },
    shadowCameraLeft: { value: -500, min: -1000, max: 0, step: 1 },
  });

  useEffect(() => {
    if (lightRef.current && lightRef.current.shadow) {
      lightRef.current.shadow.bias = shadowBias;

      // Update camera settings
      lightRef.current.shadow.camera.near = shadowCameraNear;
      lightRef.current.shadow.camera.far = shadowCameraFar;
      lightRef.current.shadow.camera.left = shadowCameraLeft;
      lightRef.current.shadow.camera.right = shadowCameraRight;
      lightRef.current.shadow.camera.top = shadowCameraTop;
      lightRef.current.shadow.camera.bottom = shadowCameraBottom;

      // Critical step - update the projection matrix
      lightRef.current.shadow.camera.updateProjectionMatrix();

      // Force shadow map to update
      lightRef.current.shadow.needsUpdate = true;
    }
  }, [
    shadowBias,
    shadowCameraNear,
    shadowCameraFar,
    shadowCameraTop,
    shadowCameraRight,
    shadowCameraBottom,
    shadowCameraLeft,
  ]);

  return (
    <>
      <Perf position="top-left" />
      <OrbitControls onChange={handleControlsChange} />

      <SoftShadows size={10} samples={35} focus={5} />
      <Models />
      <directionalLight
        ref={lightRef}
        castShadow={castShadow}
        intensity={intensity}
        color={color}
        position={dposition}
        shadow-camera-far={shadowCameraFar}
        shadow-mapSize={[4096, 4096]}
        shadow-camera-near={shadowCameraNear}
        shadow-camera-top={shadowCameraTop}
        shadow-camera-right={shadowCameraRight}
        shadow-camera-bottom={shadowCameraBottom}
        shadow-camera-left={shadowCameraLeft}
        shadow-radius={softness} // Add shadow softening
        shadow-blurSamples={blurSamples}
        shadow-normalBias={1} // More precise bias
      ></directionalLight>
      <ambientLight intensity={ambientIntensity} color="#ffffff" />
    </>
  );
}

export default Experience;

useGLTF.preload("/voxel1.glb");
