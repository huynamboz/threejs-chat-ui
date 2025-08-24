import { useLoader, useFrame } from "@react-three/fiber";
import { FBXLoader } from "three-stdlib";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export function CharacterWithAnimation({ url, position = [0, 0, 0] }: { url: string; position?: [number, number, number] }) {
  const fbx = useLoader(FBXLoader, url);
  const mixer = useRef<THREE.AnimationMixer | null>(null);

  useEffect(() => {
    fbx.scale.set(0.05, 0.05, 0.05);
    fbx.position.set(position[0], position[1], position[2]);
    
    // Enable shadows for the model
    fbx.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    // If there are animations in the file
    if (fbx.animations && fbx.animations.length > 0) {
      mixer.current = new THREE.AnimationMixer(fbx);
      const action = mixer.current.clipAction(fbx.animations[0]); // Get the first animation
      action.play();
    }
  }, [fbx, position]);

  // Update animation over time
  useFrame((_, delta) => {
    mixer.current?.update(delta);
  });

  return <primitive object={fbx} />;
}
