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
  const cameraOffset = useRef(new THREE.Vector3(9, 16, 22)); // Adjust as needed (x, y, z from player)

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
    if (!rigidBodyRef.current || !playerMeshRef.current) return;

    const { forward, backward, left, right } = getKeys();
    const currentLinvel = rigidBodyRef.current.linvel();
    const currentRbRotationQuat = rigidBodyRef.current.rotation();

    const currentRbEuler = new THREE.Euler().setFromQuaternion(
      currentRbRotationQuat,
      "YXZ"
    );

    const movementInput = { x: 0, z: 0 };
    let newWorldOrientationY = currentRbEuler.y; // Default to current orientation

    let hasMovementInput = false;

    if (forward) {
      movementInput.z = -1;
      newWorldOrientationY = -Math.PI / 2;
      hasMovementInput = true;
    }
    if (backward) {
      movementInput.z = 1;
      newWorldOrientationY = Math.PI / 2;
      hasMovementInput = true;
    }
    if (left) {
      movementInput.x = -1;
      newWorldOrientationY = 0; // Or Math.PI if 0 is right for your setup
      hasMovementInput = true;
    }
    if (right) {
      movementInput.x = 1;
      newWorldOrientationY = -Math.PI; // Or 0 if -Math.PI is left for your setup
      hasMovementInput = true;
    }

    const moveDirection = new THREE.Vector3(
      movementInput.x,
      0,
      movementInput.z
    );
    if (moveDirection.lengthSq() > 0) {
      moveDirection.normalize().multiplyScalar(MOVE_SPEED);
    } else {
      moveDirection.set(0, 0, 0);
    }
    rigidBodyRef.current.setLinvel(
      { x: moveDirection.x, y: currentLinvel.y, z: moveDirection.z },
      true
    );

    // --- Instantly rotate the RigidBody itself ---
    // Only update rotation if there was movement input that dictates a new facing direction
    if (hasMovementInput) {
      rigidBodyRef.current.setRotation(
        // Convert the target world Y Euler angle directly to a quaternion for the RigidBody
        new THREE.Quaternion().setFromEuler(
          new THREE.Euler(0, newWorldOrientationY, 0, "YXZ")
        ),
        true
      );
    }

    rigidBodyRef.current.setAngvel({ x: 0, y: 0, z: 0 }, true);

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
