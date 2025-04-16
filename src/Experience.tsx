import { OrbitControls, useGLTF, useHelper, Helper } from "@react-three/drei";
import { useControls } from "leva";
import Models from "./Models.tsx";
import { Perf } from "r3f-perf";
import { useRef } from "react";
import { DirectionalLight, CameraHelper } from "three";

function Experience() {
  const lightRef = useRef<DirectionalLight>(null!);

  // useHelper(lightRef, DirectionalLight, 1, "hotpink");
  const {
    intensity,
    color,
    castShadow,
    position,
    shadowBias,
    softness,
    blurSamples,
  } = useControls("Directional Light", {
    intensity: { value: 4.6, min: 0, max: 10, step: 0.1 },
    color: "#9c9c9c",
    castShadow: true,
    position: [-90, 180, 200],
    shadowBias: { value: -0.0005, min: -0.01, max: 0.01, step: 0.0001 }, // More precise bias
    normalBias: { value: 0.002, min: 0, max: 0.01, step: 0.0001 },
    softness: { value: 8, min: 0, max: 20, step: 0.1 },
    blurSamples: { value: 16, min: 1, max: 25, step: 1 },
  });

  // useFrame(() => {
  //   console.log(camera.position);
  // });
  return (
    <>
      <Perf position="top-left" />
      <OrbitControls />

      <Models />
      <directionalLight
        ref={lightRef}
        castShadow={castShadow}
        intensity={intensity}
        color={color}
        position={position}
        shadow-camera-far={600}
        shadow-mapSize={[4096, 4096]}
        shadow-camera-near={150}
        shadow-camera-top={500} // Adjusted for better coverage
        shadow-camera-right={500} // Adjusted for better coverage
        shadow-camera-bottom={-500} // Adjusted for better coverage
        shadow-camera-left={-500} // Adjusted for better coverage
        shadow-radius={softness} // Add shadow softening
        shadow-blurSamples={blurSamples}
        shadow-bias={-0.001} // More precise bias
      ></directionalLight>
      <ambientLight intensity={0.45} color="#ffffff" />
    </>
  );
}

export default Experience;

useGLTF.preload("/voxel1.glb");
