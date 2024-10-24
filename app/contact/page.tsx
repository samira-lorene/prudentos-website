import React from "react";
import Image from "next/image";

export default function Contact() {

  return (
    <div className="h-fit w-fit">
      <div className="z-40 fixed inset-0 bg-black opacity-50"></div>

      <Image
        src="/image00003.webp"
        alt="contact image"
        fill
        className="object-cover md:hidden"
      />
      <Image
        src="/contact.webp"
        alt="hero"
        fill
        className="object-cover hidden md:block"
      />
      <div className="fixed z-50 inset-0 flex justify-center items-center">
        <span className="text-white text-sm uppercase tracking-wide w-[80vw] sm:w-[50vw] md:w-[40vw] lg:w-[30vw] text-center">
          FOR ALL CUSTOM ORDERS, POTENTIAL COLLABORATIONS AND OTHER INQUIRIES
          PLEASE EMAIL US AT:{" "}
          <a className=" italic" href="mailto:samira.prudentos@web.de">
            samira.prudentos@web.de
          </a>
        </span>
      </div>
    </div>
  );
}
