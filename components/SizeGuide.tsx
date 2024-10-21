"use client";
import { Cross1Icon } from "@radix-ui/react-icons";

export default function SizeGuide({
  openModal,
  closeModal,
}: {
  openModal: any;
  closeModal: any;
}) {
  // TODO: get static size chart

  return (
    <div
      className={`fixed top-0 flex flex-col px-8 py-6 right-0 w-screen md:w-5/12 bg-white h-full shadow-sm md:border-l transition-transform transform duration-700 ${
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
                  <th className="py-2 px-4 text-left font-normal">Age</th>
                  <th className="py-2 px-4 text-left font-normal">Email</th>
                </tr>
              </thead>
              <tbody className="opacity-50">
                <tr>
                  <td className="py-2 text-left px-4 border-t border-r">
                    Taille denim
                  </td>
                  <td className="py-2 text-left px-4 border-t">25</td>
                  <td className="py-2 text-left px-4 border-t">
                    john@example.com
                  </td>
                </tr>
                <tr className="">
                  <td className="py-2 text-left px-4 border-t border-r">UK</td>
                  <td className="py-2 text-left px-4 border-t">30</td>
                  <td className="py-2 text-left px-4 border-t">
                    jane@example.com
                  </td>
                </tr>
                <tr>
                  <td className="py-2 text-left px-4 border-t border-r">
                    Europe
                  </td>
                  <td className="py-2 text-left px-4 border-t">28</td>
                  <td className="py-2 text-left px-4 border-t">
                    michael@example.com
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
