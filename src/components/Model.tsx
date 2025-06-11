"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { RefObject, useEffect, useRef, useState } from "react";
import ModelView from "./ModelView";
import { yellowImg } from "@/utils";
import * as Three from "three";
import { Canvas } from "@react-three/fiber";
import { View } from "@react-three/drei";
import { models, sizes } from "@/constants";
import { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { animateWithGsapTimeline } from "@/utils/animations";

const Model = () => {
  const [size, setSize] = useState("small");
  const [model, setModel] = useState({
    title: "IPhone 15 Pro in Natural Titanium",
    color: ["#8F8A81", "#ffe7b9", "#6f6c64"],
    img: yellowImg,
  });
  const [eventSource, setEventSource] = useState<HTMLElement | undefined>();

  useEffect(() => {
    setEventSource(document.getElementById("root") || undefined);
  }, []);

  const cametraControllSmall = useRef<RefObject<OrbitControlsImpl>>(undefined);
  const cametraControllLarge = useRef<RefObject<OrbitControlsImpl>>(undefined);

  const small = useRef(new Three.Group());
  const large = useRef(new Three.Group());

  const [smallRotation, setSmallRotation] = useState(0);
  const [largeRotation, setLargeRotation] = useState(0);

  const tl = gsap.timeline();

  useEffect(() => {
    if (size === "large") {
      animateWithGsapTimeline(tl, small, smallRotation, "#view1", "#view2", {
        transform: "translateX(-100%)",
        duration: 2,
      });
    }

    if (size === "small") {
      animateWithGsapTimeline(tl, large, largeRotation, "#view2", "#view1", {
        transform: "translateX(0%)",
        duration: 2,
      });
    }
  }, [size]);

  useGSAP(() => {
    gsap.to("#heading", {
      opacity: 1,
      y: 0,
      scrollTrigger: {
        trigger: "#heading",
        toggleActions: "restart none none none",
      },
    });
  }, []);

  return (
    <section className="common-padding">
      <div className="screen-max-width">
        <h1 id="heading" className="section-heading">
          Take a closer look.
        </h1>

        <div className="flex flex-col items-center mt-5">
          <div className="w-full h-[75vh] md:h-[90vh] overflow-hidden relative">
            <ModelView
              index={1}
              groupRef={small}
              gsapType={"view1"}
              controlRef={
                cametraControllSmall as unknown as RefObject<OrbitControlsImpl>
              }
              setRotationState={setSmallRotation}
              item={model}
              size={size}
            />
            <ModelView
              index={2}
              groupRef={large}
              gsapType={"view2"}
              controlRef={
                cametraControllLarge as unknown as RefObject<OrbitControlsImpl>
              }
              setRotationState={setLargeRotation}
              item={model}
              size={size}
            />

            <Canvas
              className="w-full h-full"
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                overflow: "hidden",
              }}
              eventSource={eventSource}
            >
              <View.Port />
            </Canvas>
          </div>
          <div className="mx-auto w-full">
            <p className="text-sm font-light text-center mb-5">{model.title}</p>
            <div className="flex-center">
              <ul className="color-container">
                {models.map((item, i) => (
                  <li
                    key={i}
                    className="w-6 h-6 rounded-full mx-2 cursor-pointer"
                    style={{ backgroundColor: item.color[0] }}
                    onClick={() => setModel(item)}
                  ></li>
                ))}
              </ul>

              <button className="size-btn-container">
                {sizes.map(({ label, value }) => (
                  <span
                    key={label}
                    className="size-btn cursor-pointer"
                    style={{
                      backgroundColor: size === value ? "white" : "transparent",
                      color: size === value ? "black" : "white",
                    }}
                    onClick={() => setSize(value)}
                  >
                    {label}
                  </span>
                ))}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Model;
