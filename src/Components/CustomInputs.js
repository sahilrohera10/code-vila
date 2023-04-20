import React from "react";
import { classnames } from "../utils/general";

export default function CustomInputs({ customInput, setCustomInput }) {
  return (
    <>
      <h1
        style={{
          color: "white",
          marginRight: "245px",
          marginTop: "20px",
          marginBottom: "0px",
        }}
        className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 mb-2"
      >
        Custom Input
      </h1>{" "}
      <textarea
        rows="5"
        value={customInput}
        onChange={(e) => setCustomInput(e.target.value)}
        // placeholder={`Custom Input`}
        className={classnames(
          "focus:outline-none w-full border-2 border-black z-10 rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow transition duration-200 bg-white mt-2"
        )}
      ></textarea>
    </>
  );
}
