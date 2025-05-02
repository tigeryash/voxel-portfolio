import { useKeyboardControls } from "@react-three/drei";
import { useEffect, useState } from "react";
import { GLTFResult } from "types/types";
import { useRef } from "react";
import * as THREE from "three";
import { Vector3 } from "three";
import { useFrame, useThree } from "@react-three/fiber";
import {
  CapsuleCollider,
  RapierRigidBody,
  RigidBody,
  useRapier,
} from "@react-three/rapier";

const MOVE_SPEED = 5; // Adjust as needed
const JUMP_FORCE = 8; // Adjust as needed
const ROTATION_SPEED = 5; // How fast the character turns

const character = {
  initialPosition: new Vector3(117.36, 4, 113.657), // Start slightly higher for spawn
  initialRotation: new Vector3(0, -0.573, 0),
};

type PlayerProps = {
  nodes: GLTFResult["nodes"];
  materials: GLTFResult["materials"];
};

const Player = ({ nodes, materials }: PlayerProps) => {
  const playerMeshRef = useRef<THREE.Group>(null!); // Ref for the visual mesh group
  const rigidBodyRef = useRef<RapierRigidBody>(null!); // Ref for the physics body
  const [subscribeKeys, getKeys] = useKeyboardControls();
  const { camera } = useThree(); // Get the camera
  const { rapier, world } = useRapier();

  // --- Camera Offset ---
  const cameraOffset = useRef(new THREE.Vector3(0, 8, 15)); // Adjust as needed (x, y, z from player)
  const smoothTime = 0.1; // Camera smoothing factor

  const jump = () => {
    const origin = rigidBodyRef.current.translation();
    origin.y -= 0.31;
    const direction = { x: 0, y: -1, z: 0 };
    const ray = new rapier.Ray(origin, direction);
    const hit = world.castRay(ray, 10, true);

    if (hit && hit.timeOfImpact < 0.15)
      rigidBodyRef.current.setTranslation({ x: 0, y: 0.5, z: 0 }, true);
  };

  useFrame((state, delta) => {
    const { forward, backward, left, right } = getKeys();

    const translate = rigidBodyRef.current.translation();
    const rotate = playerMeshRef.current.rotation.clone();

    if (forward) {
      translate.z -= MOVE_SPEED;
      rotate.y = -Math.PI / 2;
    }
    if (backward) {
      translate.z += MOVE_SPEED;
      rotate.y = Math.PI / 2;
    }
    if (left) {
      translate.x -= MOVE_SPEED;
      rotate.y = 0;
    }
    if (right) {
      translate.x += MOVE_SPEED;
      rotate.y = -Math.PI;
    }

    rigidBodyRef.current.setTranslation(
      { x: translate.x, y: translate.y, z: translate.z },
      true
    );
    playerMeshRef.current.rotation.set(rotate.x, rotate.y, rotate.z);

    // --- Camera Follow ---
    const playerPosition = rigidBodyRef.current.translation();
    const desiredCameraPosition = new THREE.Vector3()
      .copy(playerPosition)
      .add(cameraOffset.current);
    camera.position.lerp(desiredCameraPosition, smoothTime);
    const lookAtPosition = new THREE.Vector3().copy(playerPosition);
    lookAtPosition.y += 1.0;
    camera.lookAt(lookAtPosition);
  });
  // --- Respawn Logic (Example) ---
  useEffect(() => {
    const unsubscribe = subscribeKeys(
      (state) => state.respawn,
      (respawn) => {
        if (respawn && rigidBodyRef.current) {
          rigidBodyRef.current.setTranslation(character.initialPosition, true);
          rigidBodyRef.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
          rigidBodyRef.current.setAngvel({ x: 0, y: 0, z: 0 }, true);
          // Reset mesh rotation if needed
          playerMeshRef.current?.rotation.set(
            character.initialRotation.x,
            character.initialRotation.y,
            character.initialRotation.z
          );
        }
      }
    );
    return () => unsubscribe();
  }, [subscribeKeys]);

  return (
    <RigidBody
      ref={rigidBodyRef}
      type="dynamic"
      colliders={false} // Use explicit collider below
      position={character.initialPosition}
      // rotation={character.initialRotation} // Rotation is handled by mesh now
      enabledRotations={[false, true, false]} // Allow Y rotation
      mass={1}
      friction={0.5}
      restitution={0.1}
      linearDamping={0.5} // Some damping to prevent sliding forever
      angularDamping={0.5}
      name="player" // Add a name for debugging/identification
    >
      {/* Adjust CapsuleCollider size and position to fit your model */}
      {/* args: [radius, height_of_cylinder_part] */}
      {/* position: [x, y, z] offset from RigidBody center */}
      <CapsuleCollider args={[0.8, 2.0]} position={[0, 2.8, 0]} />

      {/* Group for the visual model - offset it so its feet are near y=0 of the RigidBody */}
      <group
        ref={playerMeshRef}
        name="boots"
        // position={[0, -3.8, 0]} // Adjust Y so feet are near the bottom of the capsule
        position={[0, -2.8, 0]} // Example: If capsule bottom is at y=0
        rotation={[0, -0.573, 0]} // Initial visual rotation
        scale={[2.276, 3.736, 2.879]}
        userData={{ name: "boots" }}
      >
        <mesh
          name="Cube017"
          castShadow
          receiveShadow
          geometry={nodes.Cube017.geometry}
          material={materials.boots}
        />
        <mesh
          name="Cube017_1"
          castShadow
          receiveShadow
          geometry={nodes.Cube017_1.geometry}
          material={materials.button}
        />
        <mesh
          name="Cube017_2"
          castShadow
          receiveShadow
          geometry={nodes.Cube017_2.geometry}
          material={materials.cloak}
        />
        <mesh
          name="Cube017_3"
          castShadow
          receiveShadow
          geometry={nodes.Cube017_3.geometry}
          material={materials.bezel}
        />
        <mesh
          name="Cube017_4"
          castShadow
          receiveShadow
          geometry={nodes.Cube017_4.geometry}
          material={materials.Skin}
        />
        <mesh
          name="Cube017_5"
          castShadow
          receiveShadow
          geometry={nodes.Cube017_5.geometry}
          material={materials.pants}
        />
        <mesh
          name="Cube017_6"
          castShadow
          receiveShadow
          geometry={nodes.Cube017_6.geometry}
          material={materials.hair}
        />
        <mesh
          name="Cube017_7"
          castShadow
          receiveShadow
          geometry={nodes.Cube017_7.geometry}
          material={materials.buckle}
        />
        <mesh
          name="Cube017_8"
          castShadow
          receiveShadow
          geometry={nodes.Cube017_8.geometry}
          material={materials.eye}
        />
        <mesh
          name="Cube017_9"
          castShadow
          receiveShadow
          geometry={nodes.Cube017_9.geometry}
          material={materials.pupil}
        />
      </group>
    </RigidBody>
  );
};

export default Player;
