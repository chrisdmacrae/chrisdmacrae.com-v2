import { useRef } from "react";
import { useFrame } from "react-three-fiber";

export interface ParticleProps {}

export function Particles(props: ParticleProps) {
  const mesh = useRef();
  let SEPARATION = 100,
        AMOUNTX = 100,
        AMOUNTY = 70;
 
  let container,
      camera,
      scene,
      renderer;
 
  let particles, particle, count = 0;
 
  let mouseX = 85,
      mouseY = -342;
 
  let windowHalfX = window.innerWidth / 2;
  let windowHalfY = window.innerHeight / 2;

  useFrame(() => ()

  return (

  )
}