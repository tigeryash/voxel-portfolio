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
      <RigidBody type="fixed" colliders="trimesh">
        <mesh
          name="Cube016_1"
          castShadow
          receiveShadow
          geometry={nodes.Cube016_1.geometry}
          material={materials.benchwood}
        />
      </RigidBody>
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
      <RigidBody type="fixed" colliders="trimesh">
        <mesh
          name="Cube016_7"
          castShadow
          receiveShadow
          geometry={nodes.Cube016_7.geometry}
          material={materials.grass}
        />
      </RigidBody>
      <RigidBody type="fixed" colliders="hull">
        <mesh
          name="Cube016_8"
          castShadow
          receiveShadow
          geometry={nodes.Cube016_8.geometry}
          material={materials.tarmac}
        />
      </RigidBody>
      <RigidBody type="fixed" colliders="trimesh">
        <mesh
          name="Cube016_9"
          castShadow
          receiveShadow
          geometry={nodes.Cube016_9.geometry}
          material={materials["road curb"]}
        />
      </RigidBody>
      <mesh
        name="Cube016_10"
        castShadow
        receiveShadow
        geometry={nodes.Cube016_10.geometry}
        material={materials["road paint"]}
      />
      <RigidBody type="fixed" colliders="trimesh">
        <CuboidCollider args={[10, 30, 85]} position={[840, 36, 0]} />
      </RigidBody>
      <RigidBody type="fixed" colliders="trimesh">
        <CuboidCollider args={[900, 30, 1]} position={[0, 36, 85]} />
      </RigidBody>
      <RigidBody type="fixed" colliders="trimesh">
        <CuboidCollider args={[10, 30, 85]} position={[-830, 36, 0]} />
      </RigidBody>
      <RigidBody type="fixed" colliders="trimesh">
        <CuboidCollider args={[900, 30, 1]} position={[0, 36, -82]} />
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
      <RigidBody type="fixed" colliders="trimesh">
        <mesh
          name="Cube016_19"
          castShadow
          receiveShadow
          geometry={nodes.Cube016_19.geometry}
          material={materials.gardentree}
        />
      </RigidBody>
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
