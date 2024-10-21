import React from "react";

export default function AddToCart({ color }: { color: string }) {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          fill={color}
          fillRule="evenodd"
          d="M10.5 8.38096C10.5 7.62784 11.1483 6.9762 12 6.9762C12.8517 6.9762 13.5 7.62784 13.5 8.38096H10.5ZM9.5 8.38096C9.5 7.03014 10.6426 5.9762 12 5.9762C13.3574 5.9762 14.5 7.03014 14.5 8.38096H16H17V9.38096V15V16H16H8H7V15V9.38096V8.38096H8H9.5ZM8 15V9.38096H16V15H8Z"
        ></path>
      </svg>
    </div>
  );
}
