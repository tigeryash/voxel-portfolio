import * as THREE from "three";
import { useGLTF, useHelper } from "@react-three/drei";
import { useRef } from "react";
import { GLTFResult } from "types/types";
import { useSignStore } from "./stores/useSignStore";

export default function Models() {
  const { nodes, materials } = useGLTF("/voxel1.glb") as unknown as GLTFResult;
  const light = useRef<THREE.SpotLight>(null!);
  useHelper(light, THREE.SpotLightHelper, "cyan");

  const { setSignTitle, setIsModalOpen } = useSignStore();

  return (
    <group dispose={null}>
      <group name="Scene">
        <group
          name="gaming"
          position={[93.36, 13.588, -109.787]}
          rotation={[0, 0.589, -Math.PI]}
          scale={[-12.922, -6.923, -0.422]}
          userData={{ name: "gaming" }}
        >
          <mesh
            name="Cube044"
            castShadow
            geometry={nodes.Cube044.geometry}
            material={materials["tv frame"]}
          />
          <mesh
            name="Cube044_1"
            castShadow
            geometry={nodes.Cube044_1.geometry}
            material={materials.tvscreen}
          />
          <mesh
            name="Cube044_2"
            castShadow
            receiveShadow
            geometry={nodes.Cube044_2.geometry}
            material={materials["tv stand"]}
          />
          <mesh
            name="Cube044_3"
            castShadow
            receiveShadow
            geometry={nodes.Cube044_3.geometry}
            material={materials.coffetable}
          />
          <mesh
            name="Cube044_4"
            castShadow
            receiveShadow
            geometry={nodes.Cube044_4.geometry}
            material={materials.coffeetable2}
          />
          <mesh
            name="Cube044_5"
            castShadow
            receiveShadow
            geometry={nodes.Cube044_5.geometry}
            material={materials.couch}
          />
          <mesh
            name="Cube044_6"
            castShadow
            receiveShadow
            geometry={nodes.Cube044_6.geometry}
            material={materials["couch 2"]}
          />
          <mesh
            name="Cube044_7"
            castShadow
            receiveShadow
            geometry={nodes.Cube044_7.geometry}
            material={materials.ps4}
          />
          <mesh
            name="Cube044_8"
            castShadow
            receiveShadow
            geometry={nodes.Cube044_8.geometry}
            material={materials.ps5}
          />
          <mesh
            name="Cube044_9"
            castShadow
            geometry={nodes.Cube044_9.geometry}
            material={materials.ps5sides}
          />
          <mesh
            name="Cube044_10"
            castShadow
            geometry={nodes.Cube044_10.geometry}
            material={materials.ps5controller}
          />
          <mesh
            name="Cube044_11"
            castShadow
            receiveShadow
            geometry={nodes.Cube044_11.geometry}
            material={materials.controllerin}
          />
          <mesh
            name="Cube044_12"
            castShadow
            geometry={nodes.Cube044_12.geometry}
            material={materials.switchdock}
          />
          <mesh
            name="Cube044_13"
            castShadow
            receiveShadow
            geometry={nodes.Cube044_13.geometry}
            material={materials.switchscreen}
          />
        </group>
        <group
          name="sign"
          position={[-33.194, 7.644, -107.146]}
          rotation={[0, 0.17, 0]}
          scale={[6.045, 4.167, 0.47]}
          userData={{ name: "sign" }}
          onClick={() => {
            setIsModalOpen(true);
            setSignTitle("marble");
          }}
        >
          <mesh
            name="Cube015"
            castShadow
            geometry={nodes.Cube015.geometry}
            material={materials.Material}
          />
          <mesh
            name="Cube015_1"
            castShadow
            geometry={nodes.Cube015_1.geometry}
            material={materials.sign4}
          />
        </group>
        <group
          name="sign001"
          position={[30.905, 7.644, -107.543]}
          rotation={[0, 0.17, 0]}
          scale={[6.045, 4.167, 0.47]}
          userData={{ name: "sign.001" }}
          onClick={() => {
            setIsModalOpen(true);
            setSignTitle("chatgpt");
          }}
        >
          <mesh
            name="Cube006"
            castShadow
            geometry={nodes.Cube006.geometry}
            material={materials.Material}
          />
          <mesh
            name="Cube006_1"
            castShadow
            geometry={nodes.Cube006_1.geometry}
            material={materials.sign3}
          />
        </group>
        <group
          name="sign002"
          position={[108.32, 7.644, -27.025]}
          rotation={[0, -0.648, 0]}
          scale={[6.045, 4.167, 0.47]}
          userData={{ name: "sign.002" }}
          onClick={() => {
            setIsModalOpen(true);
            setSignTitle("solarite");
          }}
        >
          <mesh
            name="Cube007"
            castShadow
            geometry={nodes.Cube007.geometry}
            material={materials.Material}
          />
          <mesh
            name="Cube007_1"
            castShadow
            geometry={nodes.Cube007_1.geometry}
            material={materials.sign2}
          />
        </group>
        <group
          name="sign003"
          position={[109.451, 7.644, 39.836]}
          rotation={[0, -0.5, 0]}
          scale={[6.045, 4.167, 0.47]}
          userData={{ name: "sign.003" }}
          onClick={() => {
            setIsModalOpen(true);
            setSignTitle("portal");
          }}
        >
          <mesh
            name="Cube008"
            castShadow
            geometry={nodes.Cube008.geometry}
            material={materials.Material}
          />
          <mesh
            name="Cube008_1"
            castShadow
            geometry={nodes.Cube008_1.geometry}
            material={materials.sign1}
          />
        </group>
        <group
          name="sign004"
          position={[-112.336, 6.672, -36.044]}
          rotation={[0, 0.939, 0]}
          scale={[7.755, 5.346, 0.603]}
          userData={{ name: "sign.004" }}
          onClick={() => {
            setIsModalOpen(true);
            setSignTitle("spotlight");
          }}
        >
          <mesh
            name="Cube009"
            castShadow
            geometry={nodes.Cube009.geometry}
            material={materials.Material}
          />
          <mesh
            name="Cube009_1"
            castShadow
            geometry={nodes.Cube009_1.geometry}
            material={materials.sign5}
          />
        </group>
        <group
          name="sign005"
          position={[-107.396, 7.644, 47.283]}
          rotation={[0, 1.001, 0]}
          scale={[6.045, 4.167, 0.47]}
          userData={{ name: "sign.005" }}
          onClick={() => {
            setIsModalOpen(true);
            setSignTitle("awwwards");
          }}
        >
          <mesh
            name="Cube010"
            castShadow
            geometry={nodes.Cube010.geometry}
            material={materials.Material}
          />
          <mesh
            name="Cube010_1"
            castShadow
            geometry={nodes.Cube010_1.geometry}
            material={materials.sign6}
          />
        </group>
        <group
          name="level"
          position={[-71.214, 1.593, -99.663]}
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
            geometry={nodes.Cube016_2.geometry}
            material={materials.signborder}
          />
          <mesh
            name="Cube016_3"
            castShadow
            geometry={nodes.Cube016_3.geometry}
            material={materials.signcolor}
          />
          <mesh
            name="Cube016_4"
            castShadow
            geometry={nodes.Cube016_4.geometry}
            material={materials.text}
          />
          <mesh
            name="Cube016_5"
            castShadow
            geometry={nodes.Cube016_5.geometry}
            material={materials.signstand}
          />
          <mesh
            name="Cube016_6"
            castShadow
            geometry={nodes.Cube016_6.geometry}
            material={materials.signstandbase}
          />
          <mesh
            name="Cube016_7"
            receiveShadow
            geometry={nodes.Cube016_7.geometry}
            material={materials.grass}
          >
            <meshStandardMaterial
              color="#4CAF50"
              roughness={0.8}
              metalness={0.1}
            />
          </mesh>
          <mesh
            name="Cube016_8"
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
            geometry={nodes.Cube016_13.geometry}
            material={materials.fence}
          />
          <mesh
            name="Cube016_14"
            receiveShadow
            geometry={nodes.Cube016_14.geometry}
            material={materials.zengarden}
          />
          <mesh
            name="Cube016_15"
            castShadow
            geometry={nodes.Cube016_15.geometry}
            material={materials.gardenrocks}
          />
          <mesh
            name="Cube016_16"
            receiveShadow
            geometry={nodes.Cube016_16.geometry}
            material={materials["grass.001"]}
          />
          <mesh
            name="Cube016_17"
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
            geometry={nodes.Cube016_20.geometry}
            material={materials.gardenleaves}
          />
        </group>
        <group
          name="dumbell001"
          position={[-91.582, 0.649, 94.462]}
          rotation={[0, 0.74, Math.PI / 2]}
          scale={[0.238, 0.815, 0.238]}
          userData={{ name: "dumbell.001" }}
        >
          <mesh
            name="Cylinder010"
            castShadow
            geometry={nodes.Cylinder010.geometry}
            material={materials.dumbell}
          />
          <mesh
            name="Cylinder010_1"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder010_1.geometry}
            material={materials.gymbenchstand}
          />
          <mesh
            name="Cylinder010_2"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder010_2.geometry}
            material={materials.gymbench}
          />
          <mesh
            name="Cylinder010_3"
            receiveShadow
            geometry={nodes.Cylinder010_3.geometry}
            material={materials["yoga mat"]}
          />
          <mesh
            name="Cylinder010_4"
            castShadow
            geometry={nodes.Cylinder010_4.geometry}
            material={materials["pullup bar"]}
          />
        </group>
        <group
          name="ichirakugas"
          position={[-82.07, 2.567, -111.898]}
          rotation={[-Math.PI, 1.075, -Math.PI]}
          scale={[1.395, 3.108, 1.395]}
          userData={{ name: "ichirakugas" }}
        >
          <mesh
            name="Cylinder004"
            receiveShadow
            geometry={nodes.Cylinder004.geometry}
            material={materials["pullup bar"]}
          />
          <mesh
            name="Cylinder004_1"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder004_1.geometry}
            material={materials.roofichiraku}
          />
          <mesh
            name="Cylinder004_2"
            geometry={nodes.Cylinder004_2.geometry}
            material={materials.counterichiraku}
          />
          <mesh
            name="Cylinder004_3"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder004_3.geometry}
            material={materials.ichirakuwalls}
          />
          <mesh
            name="Cylinder004_4"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder004_4.geometry}
            material={materials.irchiraku1}
          />
          <mesh
            name="Cylinder004_5"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder004_5.geometry}
            material={materials.ichiraku2}
          />
          <mesh
            name="Cylinder004_6"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder004_6.geometry}
            material={materials.ichiraku3}
          />
          <mesh
            name="Cylinder004_7"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder004_7.geometry}
            material={materials.ichiraku4}
          />
          <mesh
            name="Cylinder004_8"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder004_8.geometry}
            material={materials.ichiraku5}
          />
          <mesh
            name="Cylinder004_9"
            castShadow
            geometry={nodes.Cylinder004_9.geometry}
            material={materials.inchirakutower}
          />
          <mesh
            name="Cylinder004_10"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder004_10.geometry}
            material={materials.ichirkausignthread}
          />
          <mesh
            name="Cylinder004_11"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder004_11.geometry}
            material={materials.ichirakusignthing}
          />
          <mesh
            name="Cylinder004_12"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder004_12.geometry}
            material={materials.ichirakusignthingplain}
          />
          <mesh
            name="Cylinder004_13"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder004_13.geometry}
            material={materials["Material.001"]}
          />
        </group>
        <group
          name="boots"
          position={[117.36, -0.006, 113.657]}
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
      </group>
    </group>
  );
}

useGLTF.preload("/voxel1.glb");
