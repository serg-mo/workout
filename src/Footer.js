import React from "react";
import { LOCAL_STORAGE_KEY } from "./lib";

const eraseLocalStorage = () => {
  localStorage.removeItem(LOCAL_STORAGE_KEY);
};

const copyLocalStorage = async () => {
  const json = localStorage.getItem(LOCAL_STORAGE_KEY);
  console.log(json);
  // NOTE: copy to clipboard does not work on mobile
};

export default function Footer() {
  return (
    <div className="w-full flex flex-row justify-center mt-3">
      <button
        className="m-auto bg-blue-200 p-2 font-bold rounded text-sm"
        onClick={() => window.confirm("Are you sure?") && eraseLocalStorage()}
      >
        Reset
      </button>

      <button
        className="m-auto bg-blue-200 p-2 font-bold rounded text-sm"
        onClick={() => window.confirm("Are you sure?") && copyLocalStorage()}
      >
        Export
      </button>
    </div>
  );
}
