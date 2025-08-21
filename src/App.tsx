import * as THREE from "three";
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, Environment, OrbitControls } from "@react-three/drei";
import { ControlledInput } from "./ControlledInput";
import { ChatUI } from "./components/ChatUI";
import { CharacterWithAnimation } from "./components/CharacterModel";


const messages = [
  {
    id: 1,
    text: "Hello, how are you?",
    sender: "user"
  },
  {
    id: 2,
    text: "Im ok",
    sender: "me"
  },
  {
    id: 3,
    text: "What about you?",
    sender: "user"
  },
  {
    id: 4,
    text: "I'm doing well, thank you!",
    sender: "me"
  }
]
export default function App() {
  const chatRef = useRef<THREE.Group<THREE.Object3DEventMap>>(null);

  return (
    <Canvas eventPrefix="client" shadows camera={{ position: [0, 2, 10] }}>
      
      <CharacterWithAnimation url="/model.fbx" position={[-2, -5, 6]} />
      
      {/* Ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.25, 0]} receiveShadow>
        {/* <planeGeometry args={[10, 10]} /> */}
        {/* <meshStandardMaterial color="#f0f0f0" /> */}
      </mesh>
      <group ref={chatRef} position={[7, 1, -5]} rotation={[0, THREE.MathUtils.degToRad(-20), 0]}>
        <mesh>
          <Html transform>
            <div className="max-w-[300px]">
              <ChatUI messages={messages}/>
            <div
              className="flex items-center gap-2 mt-4"
              style={{ pointerEvents: "auto" }}
            >
              <div className="flex-1 px-3 py-1 text-white border border-gray-100 h-fit rounded-2xl">
                <ControlledInput/>
              </div>
              <button className="px-2 py-1 bg-white rounded-full cursor-pointer">Send</button>
            </div>
            </div>
          </Html>
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
      {/* <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} /> */}
      <Parallax refObj={chatRef} />
    </Canvas>
  );
}

function Parallax({ refObj }) {
  useFrame((state) => {
    if (refObj.current) {
      // pointer.x, pointer.y ∈ [-1, 1]
      refObj.current.position.x = 10 + state.pointer.x * 0.5;
      refObj.current.position.y = 1 + state.pointer.y * 0.5;
    }
  });
  return null;
}
