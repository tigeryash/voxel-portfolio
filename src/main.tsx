import { createRoot } from "react-dom/client";
import "./index.css";
import Experience from "./Experience.tsx";
import { Canvas } from "@react-three/fiber";
import { KeyboardControls } from "@react-three/drei";
import Modal from "./components/Modal.tsx";

createRoot(document.getElementById("root")!).render(
  <KeyboardControls
    map={[
      { name: "forward", keys: ["ArrowUp", "KeyW"] },
      { name: "backward", keys: ["ArrowDown", "KeyS"] },
      { name: "left", keys: ["ArrowLeft", "KeyA"] },
      { name: "right", keys: ["ArrowRight", "KeyD"] },
      { name: "jump", keys: ["Space"] },
      { name: "respawn", keys: ["KeyR"] },
    ]}
  >
    <Canvas
      gl={{ antialias: true }}
      shadows
      camera={{
        fov: 45,
        near: 0.1,
        far: 2000,
        position: [117.36, 2, 113.657],
      }}
    >
      <color args={["#5c9fe6"]} attach="background" />
      <Experience />
    </Canvas>
    <Modal />
  </KeyboardControls>
);
