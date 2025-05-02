import { useKeyboardControls } from "@react-three/drei";
import { useEffect } from "react";
import { GLTFResult } from "types/types";
import { useRef } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import { Vector3 } from "three";
import { useFrame } from "@react-three/fiber";
import { CapsuleCollider, RigidBody } from "@react-three/rapier";

const character = {
  moveDistance: 5,
  moveDuration: 0.23,
  jumpHeight: 2,
  initialPosition: new Vector3(117.36, -0.006, 113.657),
  initialRotation: new Vector3(0, -0.573, 0),
};

type PlayerProps = {
  nodes: GLTFResult["nodes"];
  materials: GLTFResult["materials"];
};

const PlayerGSAP = ({ nodes, materials }: PlayerProps) => {
  const playerRef = useRef<THREE.Group>(null!);
  const rigidBodyRef = useRef(null!);
  const [subscribeKeys, getKeys] = useKeyboardControls();

  const currentAnimationRef = useRef<gsap.core.Timeline | null>(null);
  const isMovingRef = useRef(false);
  const currentDirectionRef = useRef<string | null>(null);

  // Handle continuous movement with useFrame
  useFrame(() => {
    if (!playerRef.current) return;

    const { forward, backward, left, right } = getKeys();

    // If no keys are pressed, reset direction tracking
    if (!forward && !backward && !left && !right) {
      currentDirectionRef.current = null;
      return;
    }

    // Don't process if we're already moving in this direction
    const newDirection = forward
      ? "forward"
      : backward
      ? "backward"
      : left
      ? "left"
      : right
      ? "right"
      : null;

    // if (newDirection === currentDirectionRef.current) {
    //   return;
    // }

    // If we have an ongoing animation for a different direction, kill it
    if (
      currentAnimationRef.current &&
      newDirection !== currentDirectionRef.current
    ) {
      currentAnimationRef.current.kill();
      currentAnimationRef.current = null;
      isMovingRef.current = false;
    }

    if (isMovingRef.current) return;

    // Set the new direction and start movement
    currentDirectionRef.current = newDirection;
    moveCharacter(newDirection);
  });

  const moveCharacter = (direction: string | null) => {
    if (!playerRef.current || !direction || isMovingRef.current) return;

    isMovingRef.current = true;
    const newPosition = playerRef.current.position.clone();
    const newRotation = new THREE.Euler().copy(playerRef.current.rotation);
    const groundLevel = character.initialPosition.y;

    // Determine movement based on direction
    switch (direction) {
      case "forward":
        newPosition.z -= character.moveDistance;
        newRotation.y = -Math.PI / 2;
        break;
      case "backward":
        newPosition.z += character.moveDistance;
        newRotation.y = Math.PI / 2;
        break;
      case "left":
        newPosition.x -= character.moveDistance;
        newRotation.y = 0;
        break;
      case "right":
        newPosition.x += character.moveDistance;
        newRotation.y = -Math.PI;
        break;
      default:
        return;
    }
    newPosition.y = groundLevel;

    // Create animation timeline
    const tl = gsap.timeline({
      onComplete: () => {
        isMovingRef.current = false;
        currentAnimationRef.current = null;

        // Immediately trigger next movement if key is still pressed
        const keys = getKeys();
        const nextDirection = keys.forward
          ? "forward"
          : keys.backward
          ? "backward"
          : keys.left
          ? "left"
          : keys.right
          ? "right"
          : null;

        if (nextDirection && nextDirection !== direction) {
          currentDirectionRef.current = nextDirection;
          moveCharacter(nextDirection);
        }
      },
    });

    // Store timeline reference for potential interruption
    currentAnimationRef.current = tl;
    if (Math.abs(playerRef.current.position.y - groundLevel) > 0.01) {
      tl.to(
        playerRef.current.position,
        {
          y: groundLevel,
          duration: 0,
          ease: "power2.out",
        },
        0
      );
    }

    // Animate position
    tl.to(
      playerRef.current.position,
      {
        x: newPosition.x,
        y: newPosition.y,
        z: newPosition.z,
        duration: character.moveDuration,
        ease: "power1.out",
      },
      0
    );

    // Animate rotation simultaneously (slightly faster)
    tl.to(
      playerRef.current.rotation,
      {
        y: newRotation.y,
        duration: character.moveDuration * 0.6,
        ease: "power1.out",
      },
      0
    );
    tl.to(
      playerRef.current.position,
      {
        y: character.jumpHeight,
        duration: character.moveDuration / 2,
        ease: "power1.out",
        yoyo: true,
        repeat: 1,
        onComplete: () => {
          // Ensure we end at ground level
          if (playerRef.current) {
            playerRef.current.position.y = groundLevel;
          }
        },
      },
      0
    );
  };

  useEffect(() => {
    const unsubscribe = subscribeKeys(
      (state) => state.respawn,
      (respawn) => {
        if (respawn && playerRef.current) {
          // Kill any ongoing animations
          if (currentAnimationRef.current) {
            currentAnimationRef.current.kill();
            currentAnimationRef.current = null;
          }

          isMovingRef.current = true;
          currentDirectionRef.current = null;

          // Create respawn animation
          const tl = gsap.timeline({
            onComplete: () => {
              isMovingRef.current = false;
            },
          });

          // Store timeline reference
          currentAnimationRef.current = tl;

          // Animate position and rotation
          tl.to(playerRef.current.position, {
            x: character.initialPosition.x,
            y: character.initialPosition.y,
            z: character.initialPosition.z,
            duration: 0.3,
            ease: "power3.inOut",
          });

          tl.to(
            playerRef.current.rotation,
            {
              x: character.initialRotation.x,
              y: character.initialRotation.y,
              z: character.initialRotation.z,
              duration: 0.3,
              ease: "power3.inOut",
            },
            0
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
      colliders={false} // disables auto colliders
      position={[117.36, 4, 113.657]}
      rotation={[0, -0.573, 0]}
      enabledRotations={[false, true, false]} // lock X/Z rotation for upright character
      mass={1}
      friction={0.5}
      restitution={0.1}
      linearDamping={0.9}
      angularDamping={1}
    >
      <CapsuleCollider args={[3, 2.5]} position={[0, 1.5, 0]} />
      <group
        name="boots"
        position={[0, -3.8, 0]}
        rotation={[0, -0.573, 0]}
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

export default PlayerGSAP;
