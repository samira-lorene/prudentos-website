"use client";
import { Cross1Icon } from "@radix-ui/react-icons";

export default function SizeGuide({
  openModal,
  closeModal,
}: {
  openModal: any;
  closeModal: any;
}) {
  {
    /* 
    Königsblau 
Wasserfall Kleid
 Brust jede Größe 
Taille 77 cm 
Hüfte 91cm 

Viscose 70%
Polyester 30% 


Kleid Türkis
76 cm Brust 
68 cm Taille 
88 cm Hüfte 
Stoff ist dehnbar 

Nylon 60%
Viscose 30%
Lcyra 10%


2 teiler
Brust verställbar 
72cm Tailie 
90cm Hüfte 

Viscose 70%
Polyester 30% 

Alles mit Handwäsche waschen
    */
  }

  return (
    <div
      className={`fixed top-0 flex flex-col px-8 py-6 right-0 w-screen md:w-5/12 bg-white h-screen shadow-sm md:border-l transition-transform transform duration-700 ${
        openModal ? "translate-x-0" : "translate-x-full"
      }`}
      style={{ zIndex: openModal ? 1000 : 50 }} // Increase z-index when sidebar is open
    >
      <div className="flex items-center justify-between py-2">
        <h1 className="font-light text-xs">Size Guide</h1>
        <button
          className="fixed right-6 transform transition-transform duration-200 hover:rotate-90 cursor-pointer"
          onClick={() => closeModal(!openModal)}
        >
          <Cross1Icon />
        </button>
      </div>
      <div className="flex flex-col p-4 gap-4 flex-1">
        <div className="text-center text-xs translate-y-1/3">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border-gray-200">
              <thead>
                <tr className="w-full">
                  <th className="py-2 px-4 text-left font-normal border-r">
                    Prudentos
                  </th>
                  <th className="py-2 px-4 text-left font-normal">Bust</th>
                  <th className="py-2 px-4 text-left font-normal">Waist</th>
                  <th className="py-2 px-4 text-left font-normal">Hip</th>
                </tr>
              </thead>
              <tbody className="opacity-50">
                <tr>
                  <td className="py-2 text-left px-4 border-t border-r">
                    Philomena
                  </td>
                  <td className="py-2 text-left px-4 border-t">Every size</td>
                  <td className="py-2 text-left px-4 border-t">77 cm</td>
                  <td className="py-2 text-left px-4 border-t">91 cm</td>
                </tr>
                <tr className="">
                  <td className="py-2 text-left px-4 border-t border-r">
                    Celina Lace
                  </td>
                  <td className="py-2 text-left px-4 border-t">76 cm</td>
                  <td className="py-2 text-left px-4 border-t">68 cm</td>
                  <td className="py-2 text-left px-4 border-t">88 cm</td>
                </tr>
                <tr>
                  <td className="py-2 text-left px-4 border-t border-r">
                    Atusa Two Piece
                  </td>
                  <td className="py-2 text-left px-4 border-t">Adjustable</td>
                  <td className="py-2 text-left px-4 border-t">72 cm</td>
                  <td className="py-2 text-left px-4 border-t">90 cm</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
