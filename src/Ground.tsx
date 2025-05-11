import { GLTFResult } from "types/types";
import { CuboidCollider, RigidBody } from "@react-three/rapier";

type GroundProps = {
  nodes: GLTFResult["nodes"];
  materials: GLTFResult["materials"];
};

const Ground = ({ nodes, materials }: GroundProps) => {
  console.log(nodes.Cube016_6.geometry);
  return (
    <group
      name="level"
      position={[0.303, -0.135, -0.077]}
      scale={[0.15, 0.15, 1.51]}
      userData={{ name: "level" }}
    >
      <mesh
        name="Cube016"
        castShadow
        receiveShadow
        geometry={nodes.Cube016.geometry}
        material={materials.benchframe}
      />
      //benches
      <RigidBody type="fixed">
        <CuboidCollider args={[25, 16, 1]} position={[63, 10, 35]} />
      </RigidBody>
      <RigidBody type="fixed">
        <CuboidCollider args={[11, 16, 3]} position={[-400, 10, 20]} />
      </RigidBody>
      <RigidBody type="fixed">
        <CuboidCollider args={[25, 16, 1.3]} position={[-455, 10, -65.8]} />
      </RigidBody>
      <RigidBody type="fixed">
        <CuboidCollider args={[12, 16, 3]} position={[378, 10, -24]} />
      </RigidBody>
      <RigidBody type="fixed">
        <CuboidCollider args={[24, 16, 1]} position={[-530, 10, 57]} />
      </RigidBody>
      <RigidBody type="fixed">
        <CuboidCollider args={[24, 16, 1]} position={[8, 14, -16.8]} />
      </RigidBody>
      //garden trunk
      <RigidBody type="fixed">
        <CuboidCollider args={[28, 35, 2]} position={[125, 40, -14]} />
      </RigidBody>
      <mesh
        name="Cube016_1"
        castShadow
        receiveShadow
        geometry={nodes.Cube016_1.geometry}
        material={materials.benchwood}
      />
      <mesh
        name="Cube016_2"
        castShadow
        receiveShadow
        geometry={nodes.Cube016_2.geometry}
        material={materials.signborder}
      />
      <mesh
        name="Cube016_3"
        castShadow
        receiveShadow
        geometry={nodes.Cube016_3.geometry}
        material={materials.signcolor}
      />
      <mesh
        name="Cube016_4"
        castShadow
        receiveShadow
        geometry={nodes.Cube016_4.geometry}
        material={materials.text}
      />
      <mesh
        name="Cube016_5"
        castShadow
        receiveShadow
        geometry={nodes.Cube016_5.geometry}
        material={materials.signstand}
      />
      <RigidBody type="fixed" colliders="trimesh">
        <mesh
          name="Cube016_6"
          castShadow
          receiveShadow
          geometry={nodes.Cube016_6.geometry}
          material={materials.signstandbase}
        />
      </RigidBody>
      <RigidBody type="fixed">
        <mesh
          name="Cube016_7"
          castShadow
          receiveShadow
          geometry={nodes.Cube016_7.geometry}
          material={materials.grass}
        />
      </RigidBody>
      <mesh
        name="Cube016_8"
        castShadow
        receiveShadow
        geometry={nodes.Cube016_8.geometry}
        material={materials.tarmac}
      />
      <mesh
        name="Cube016_9"
        castShadow
        receiveShadow
        geometry={nodes.Cube016_9.geometry}
        material={materials["road curb"]}
      />
      <mesh
        name="Cube016_10"
        castShadow
        receiveShadow
        geometry={nodes.Cube016_10.geometry}
        material={materials["road paint"]}
      />
      <RigidBody type="fixed" restitution={0.2} friction={0}>
        <CuboidCollider
          args={[10, 30, 85]}
          position={[840, 36, 0]}
          friction={1}
          restitution={0.2}
        />
      </RigidBody>
      <RigidBody type="fixed" restitution={0.2} friction={0}>
        <CuboidCollider
          args={[900, 30, 1]}
          position={[0, 36, 85]}
          friction={1}
          restitution={0.2}
        />
      </RigidBody>
      <RigidBody type="fixed" restitution={0.2} friction={0}>
        <CuboidCollider
          args={[10, 30, 85]}
          position={[-830, 36, 0]}
          friction={1}
          restitution={0.2}
        />
      </RigidBody>
      <RigidBody type="fixed" restitution={0.2} friction={0}>
        <CuboidCollider
          args={[900, 30, 1]}
          position={[0, 36, -82]}
          friction={1}
          restitution={0.2}
        />
      </RigidBody>
      <mesh
        name="Cube016_11"
        castShadow
        receiveShadow
        geometry={nodes.Cube016_11.geometry}
        material={materials.leaves}
      />
      <mesh
        name="Cube016_12"
        castShadow
        receiveShadow
        geometry={nodes.Cube016_12.geometry}
        material={materials.trunk}
      />
      <mesh
        name="Cube016_13"
        castShadow
        receiveShadow
        geometry={nodes.Cube016_13.geometry}
        material={materials.fence}
      />
      <RigidBody type="fixed" colliders="trimesh">
        <CuboidCollider args={[266, 12.4, 26.35]} position={[-3, 0, -1.6]} />
        <mesh
          name="Cube016_14"
          castShadow
          receiveShadow
          geometry={nodes.Cube016_14.geometry}
          material={materials.zengarden}
        />
      </RigidBody>
      <mesh
        name="Cube016_15"
        castShadow
        receiveShadow
        geometry={nodes.Cube016_15.geometry}
        material={materials.gardenrocks}
      />
      <mesh
        name="Cube016_16"
        castShadow
        receiveShadow
        geometry={nodes.Cube016_16.geometry}
        material={materials["grass.001"]}
      />
      <mesh
        name="Cube016_17"
        castShadow
        receiveShadow
        geometry={nodes.Cube016_17.geometry}
        material={materials.pond}
      />
      <mesh
        name="Cube016_18"
        castShadow
        receiveShadow
        geometry={nodes.Cube016_18.geometry}
        material={materials.gardenborder}
      />
      <mesh
        name="Cube016_19"
        castShadow
        receiveShadow
        geometry={nodes.Cube016_19.geometry}
        material={materials.gardentree}
      />
      <mesh
        name="Cube016_20"
        castShadow
        receiveShadow
        geometry={nodes.Cube016_20.geometry}
        material={materials.gardenleaves}
      />
    </group>
  );
};

export default Ground;
