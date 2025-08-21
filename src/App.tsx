import * as THREE from "three";
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { ChatUI } from "./components/ChatUI";
import { CharacterWithAnimation } from "./components/CharacterModel";

export default function App() {
  const chatRef = useRef<THREE.Group<THREE.Object3DEventMap>>(null);

  return (
    <Canvas eventPrefix="client" shadows camera={{ position: [0, 2, 10] }}>
      
      <ModelParallax>
        <CharacterWithAnimation url="/model.fbx" />
      </ModelParallax>
      
      {/* Ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.25, 0]} receiveShadow>
        {/* <planeGeometry args={[10, 10]} /> */}
        {/* <meshStandardMaterial color="#f0f0f0" /> */}
      </mesh>
      <group ref={chatRef} position={[7, 1, -5]} rotation={[0, THREE.MathUtils.degToRad(-20), 0]}>
        <mesh>
          <ChatUI />
        </mesh>
      </group>

      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={1} 
        castShadow 
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      
      <Environment preset="city" />
      {/* OrbitControls đã được di chuyển vào ModelParallax */}
      <Parallax refObj={chatRef} />
    </Canvas>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
function Parallax({ refObj }: { refObj: any }) {
  useFrame((state) => {
    if (refObj.current) {
      // pointer.x, pointer.y ∈ [-1, 1]
      refObj.current.position.x = 10 + state.pointer.x * 0.5;
      refObj.current.position.y = 1 + state.pointer.y * 0.5;
    }
  });
  return null;
}

function ModelParallax({ children }: { children: React.ReactNode }) {
  const modelRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (modelRef.current) {
      // Tạo hiệu ứng xoay nhẹ cho model theo trục Y (để thấy mặt bên)
      // pointer.x ∈ [-1, 1]
      const rotationY = state.pointer.x * 0.3; // Độ xoay nhẹ (radians)
      
      modelRef.current.rotation.y = rotationY;
    }
  });
  
  return (
    <group ref={modelRef} position={[-1, -6, 6]}>
      {children}

      {/* <OrbitControls 
        enablePan={false} 
        enableZoom={true} 
        enableRotate={true}
        target={[0, 0, 0]}
        minDistance={3}
        maxDistance={15}
        enableDamping={true}
        dampingFactor={0.05}
      /> */}
    </group>
  );
}
