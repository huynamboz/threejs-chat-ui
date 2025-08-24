import * as THREE from "three";
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { ChatUI } from "../components/ChatUI";
import { CharacterWithAnimation } from "../components/CharacterModel";

export function Home() {
  const chatRef = useRef<THREE.Group<THREE.Object3DEventMap>>(null);

  return (
    <div className="overflow-hidden h-lvh" 
    style={{
      backgroundImage: 'url(https://images.unsplash.com/photo-1515542706656-8e6ef17a1521?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}>

      <Canvas eventPrefix="client" shadows camera={{ position: [0, 2, 10] }}>
        <ModelParallax>
          <CharacterWithAnimation url="/model3.fbx" />
        </ModelParallax>

        <group ref={chatRef} position={[7, 1, -5]} rotation={[0, THREE.MathUtils.degToRad(-20), 0]}>
          <mesh>
            <ChatUI />
          </mesh>
        </group>

        {/* Lighting - Optimized for Performance */}
        <ambientLight intensity={0.6} />
        <directionalLight 
          position={[5, 10, 5]}
          intensity={1.0} 
          castShadow 
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={30}
          shadow-camera-left={-8}
          shadow-camera-right={8}
          shadow-camera-top={8}
          shadow-camera-bottom={-8}
        />
        <directionalLight 
          position={[-3, 5, -3]} 
          intensity={0.4} 
          color="#ffffff"
        />
        <Environment preset="sunset" />
        <Parallax refObj={chatRef} />
      </Canvas>
    </div>
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
      // Create gentle rotation effect for model around Y axis (to see the side view)
      // pointer.x ∈ [-1, 1]
      const rotationY = state.pointer.x * 0.3; // Light rotation angle (radians)
      
      modelRef.current.rotation.y = rotationY;
    }
  });
  
  return (
    <group ref={modelRef} position={[-1, -5.5, 6.5]} rotation={[0, THREE.MathUtils.degToRad(-20), 0]}>
      {children}
    </group>
  );
}
