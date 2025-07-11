"use client";

import React, { RefObject, Suspense } from "react";
import { OrbitControls, PerspectiveCamera, View } from "@react-three/drei";
import * as THREE from "three";
import Lights from "./Lights";
import IPhoneModel from "./IPhone";
import { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import Loader from "./Loader";

type ModelViewType = {
  index: number;
  groupRef: RefObject<THREE.Group>;
  gsapType: string;
  controlRef: RefObject<OrbitControlsImpl>;
  setRotationState: React.Dispatch<React.SetStateAction<number>>;
  item: {
    title: string;
    color: string[];
    img: string;
  };
  size: string;
};

const ModelView = ({
  index,
  groupRef,
  gsapType,
  controlRef,
  setRotationState,
  item,
  size,
}: ModelViewType) => {
  return (
    <View
      index={index}
      id={gsapType}
      className={` w-full h-full absolute cursor-pointer ${index === 2 ? "right-[-100%]" : ""}`}
    >
      <ambientLight intensity={0.3} />

      <PerspectiveCamera makeDefault position={[0, 0, 4]} />

      <Lights />

      <OrbitControls
        makeDefault
        ref={controlRef}
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.4}
        target={new THREE.Vector3(0, 0, 0)}
        onEnd={() => setRotationState(controlRef.current.getAzimuthalAngle())}
      />
      <group
        ref={groupRef}
        name={`${index} === 1 ? "small" : "large"`}
        position={[0, 0, 0]}
      >
        <Suspense fallback={<Loader />}>
          <IPhoneModel
            item={item}
            scale={index === 1 ? [15, 15, 15] : [17, 17, 17]}
            size={size}
          />
        </Suspense>
      </group>
    </View>
  );
};

export default ModelView;
