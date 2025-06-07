"use client";

import { rightImg, watchImg } from "@/utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import React from "react";
import VideoCarousel from "./VideoCarousel";

const Highlights = () => {
  useGSAP(() => {
    gsap.to("#title", {
      opacity: 1,
      y: 0,
    });
    gsap.to(".link", { opacity: 1, y: 0, stagger: 0.25 });
  }, []);
  return (
    <section
      id="highlights"
      className="w-screen overflow-hidden h-full common-padding bg-zinc"
    >
      <div className="screen-max-width">
        <div className="mb-12 w-full items-end justify-between md:flex">
          <h1 id="title" className="section-heading">
            Get the highlights.
          </h1>

          <div className="flex flex-wrap items-end gap-5">
            <p className="link">
              Watch the film
              <Image
                alt="watch"
                src={watchImg}
                width={20}
                height={20}
                className="ml-2"
              />
            </p>
            <p className="link">
              Watch the event
              <Image
                alt="right"
                src={rightImg}
                width={7}
                height={11}
                className="ml-2"
              />
            </p>
          </div>
        </div>
            <VideoCarousel />
      </div>
    </section>
  );
};

export default Highlights;
