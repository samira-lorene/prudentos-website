"use client";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  return (
    <>
      {!pathname.includes("about") && !pathname.includes("contact") && (
        <div style={{ zIndex: 100 }}>
          <div className="text-xs py-8 opacity-65 footerLink">
            These garments are handmade in Berlin and won&apos;t be reproduced
            in the same color shape combination ever again.
          </div>
          <div className="text-xs flex flex-col">
            <a
              href="https://www.instagram.com/samira_prudentos/"
              target="_blank"
              className="flex opacity-65 footerLink gap-6 items-center cursor-pointer"
            >
              <span>Instagram</span>
            </a>
            <a
              href="mailto:samira.prudentos@web.de"
              className="footerLink opacity-65 flex cursor-pointer gap-6 items-center"
            >
              <span>Contact</span>
            </a>
            <div className="flex footerLink logoText border-none gap-6 items-center">
              <span className="tracking-tighter opacity-65">
                © PRUDENTOS 2024
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
