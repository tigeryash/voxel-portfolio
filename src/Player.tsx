import { useKeyboardControls } from "@react-three/drei";
import { useEffect } from "react";
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

const MOVE_SPEED = 20; // Adjust as needed
const ROTATION_OFFSET = 2.13;

const character = {
  initialPosition: new Vector3(117.36, 4, 113.657), // Start slightly higher for spawn
  initialRotation: new Vector3(0, -0.573, 0),
};

const playerMeshBaseYOffset = -4;

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
  const cameraOffset = useRef(new THREE.Vector3(9, 16, 22)); // Adjust as needed (x, y, z from player)

  const hopAnim = useRef({
    active: false,
    time: 0,
    duration: 0.33, // Duration of one hop
    height: 0.6, // How high the hop goes
  });

  const isOnGround = () => {
    if (!rigidBodyRef.current || !rapier || !world) return false;
    const rbPosition = rigidBodyRef.current.translation();
    // Raycast from slightly below the capsule's actual bottom
    const rayOrigin = {
      x: rbPosition.x,
      y: rbPosition.y - 2.3 - 0.05, // Bottom of capsule + small offset
      z: rbPosition.z,
    };
    const rayDirection = { x: 0, y: -1, z: 0 };
    const ray = new rapier.Ray(rayOrigin, rayDirection);
    const hit = world.castRay(ray, 0.15, true); // Max TOI of 0.15 to be considered "on ground"
    return hit !== null;
  };

  useFrame((_, delta) => {
    if (!rigidBodyRef.current || !playerMeshRef.current || !world || !rapier)
      return;

    const { forward, backward, left, right } = getKeys();
    const currentLinvel = rigidBodyRef.current.linvel();

    const movementInput = { x: 0, z: 0 };
    if (forward) movementInput.z = -1;
    if (backward) movementInput.z = 1;
    if (left) movementInput.x = -1;
    if (right) movementInput.x = 1;

    const moveDirection = new THREE.Vector3(
      movementInput.x,
      0,
      movementInput.z
    );
    if (moveDirection.lengthSq() > 0) {
      moveDirection.normalize().multiplyScalar(MOVE_SPEED);
    }

    rigidBodyRef.current.setLinvel(
      { x: moveDirection.x, y: currentLinvel.y, z: moveDirection.z },
      true
    );

    if (movementInput.x !== 0 || movementInput.z !== 0) {
      const targetWorldYRotation =
        Math.atan2(movementInput.x, movementInput.z) + ROTATION_OFFSET;
      const targetRotationQuat = new THREE.Quaternion().setFromEuler(
        new THREE.Euler(0, targetWorldYRotation, 0)
      );
      // Smoothly interpolate rotation (optional, instant is also fine)
      const currentRotationQuat = rigidBodyRef.current.rotation();
      const slerpedRotation = new THREE.Quaternion()
        .copy(currentRotationQuat)
        .slerp(targetRotationQuat, delta * 15); // Adjust 15 for rotation speed
      rigidBodyRef.current.setRotation(slerpedRotation, true);
    }
    rigidBodyRef.current.setAngvel({ x: 0, y: 0, z: 0 }, true); // Prevent spinning from collisions

    // --- Hop Animation ---
    const isActuallyMovingHorizontally =
      Math.sqrt(moveDirection.x ** 2 + moveDirection.z ** 2) > 0.1;
    const currentlyOnGround = isOnGround();

    if (
      isActuallyMovingHorizontally &&
      currentlyOnGround &&
      !hopAnim.current.active
    ) {
      hopAnim.current.active = true;
      hopAnim.current.time = 0;
    }

    if (hopAnim.current.active) {
      hopAnim.current.time += delta;
      const progress = hopAnim.current.time / hopAnim.current.duration;

      if (progress >= 1) {
        hopAnim.current.active = false;
        playerMeshRef.current.position.y = playerMeshBaseYOffset;
      } else {
        // Sinusoidal hop: Math.sin(progress * Math.PI) goes 0 -> 1 -> 0
        const hopDisplacement =
          hopAnim.current.height * Math.sin(progress * Math.PI);
        playerMeshRef.current.position.y =
          playerMeshBaseYOffset + hopDisplacement;
      }
    } else if (currentlyOnGround) {
      // If not hopping but on ground, ensure mesh is at its base Y offset
      if (playerMeshRef.current.position.y !== playerMeshBaseYOffset) {
        playerMeshRef.current.position.y = playerMeshBaseYOffset;
      }
    }

    // --- Camera Follow ---
    const playerPosition = rigidBodyRef.current.translation();
    const desiredCameraPosition = new THREE.Vector3()
      .copy(playerPosition)
      .add(cameraOffset.current);
    camera.position.copy(desiredCameraPosition);
    const lookAtPosition = new THREE.Vector3().copy(playerPosition);
    lookAtPosition.y += 8.0;
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

          const respawnRotation = new THREE.Quaternion().setFromEuler(
            new THREE.Euler(0, character.initialRotation.y, 0) // Use the controlled initial Y
          );
          rigidBodyRef.current.setRotation(respawnRotation, true);

          // Reset hop animation
          hopAnim.current.active = false;
          if (playerMeshRef.current)
            playerMeshRef.current.position.y = playerMeshBaseYOffset;
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
      enabledRotations={[false, true, false]} // Allow Y rotation
      friction={1}
      restitution={0.2}
      canSleep={false}
      linearDamping={0.5} // Some damping to prevent sliding forever
      angularDamping={1}
      name="player" // Add a name for debugging/identification
      ccd={true}
    >
      {/* Adjust CapsuleCollider size and position to fit your model */}
      {/* args: [radius, height_of_cylinder_part] */}
      {/* position: [x, y, z] offset from RigidBody center */}
      <CapsuleCollider args={[2.5, 2.3]} position={[0, 0, 0]} />

      {/* Group for the visual model - offset it so its feet are near y=0 of the RigidBody */}
      <group
        ref={playerMeshRef}
        name="boots"
        // position={[0, -3.8, 0]} // Adjust Y so feet are near the bottom of the capsule
        position={[0, -4, 0]} // Example: If capsule bottom is at y=0
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
