import { GLTFResult } from "types/types";
import { CuboidCollider, RigidBody } from "@react-three/rapier";

type GroundProps = {
  nodes: GLTFResult["nodes"];
  materials: GLTFResult["materials"];
};

const Ground = ({ nodes, materials }: GroundProps) => {
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
      <mesh
        name="Cube016_6"
        castShadow
        receiveShadow
        geometry={nodes.Cube016_6.geometry}
        material={materials.signstandbase}
      />
      <RigidBody type="fixed" colliders="cuboid">
        <mesh
          name="Cube016_7"
          castShadow
          receiveShadow
          geometry={nodes.Cube016_7.geometry}
          material={materials.grass}
        />
      </RigidBody>
      <RigidBody type="fixed" colliders="cuboid">
        <mesh
          name="Cube016_8"
          castShadow
          receiveShadow
          geometry={nodes.Cube016_8.geometry}
          material={materials.tarmac}
        />
      </RigidBody>
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
      <mesh
        name="Cube016_11"
        castShadow
        receiveShadow
        geometry={nodes.Cube016_11.geometry}
        material={materials.leaves}
      />
      <RigidBody type="fixed" colliders="cuboid">
        <mesh
          name="Cube016_12"
          castShadow
          receiveShadow
          geometry={nodes.Cube016_12.geometry}
          material={materials.trunk}
        />
      </RigidBody>
      <RigidBody type="fixed" colliders="cuboid" scale={[1, 1, 1]}>
        <mesh
          name="Cube016_13"
          castShadow
          receiveShadow
          geometry={nodes.Cube016_13.geometry}
          material={materials.fence}
        />
      </RigidBody>
      <RigidBody type="fixed" colliders="cuboid">
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
      <RigidBody type="fixed" colliders="cuboid">
        <mesh
          name="Cube016_18"
          castShadow
          receiveShadow
          geometry={nodes.Cube016_18.geometry}
          material={materials.gardenborder}
        />
      </RigidBody>
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
