import React from "react";

export default function OutputDetail({ outputDetails }) {
  return (
    <div className="metrics-container mt-4 flex flex-col space-y-3">
      <p style={{ color: "white" }} className="text-sm">
        Status :{" "}
        <span
          style={{ color: "black" }}
          className="font-semibold px-2 py-1 rounded-md bg-gray-100"
        >
          {outputDetails?.status?.description}
        </span>
      </p>

      <p style={{ color: "white" }} className="text-sm">
        Memory :{" "}
        <span
          style={{ color: "black" }}
          className="font-semibold px-2 py-1 rounded-md bg-gray-100"
        >
          {outputDetails?.memory}
        </span>
      </p>
      <p style={{ color: "white" }} className="text-sm">
        Time:{" "}
        <span
          style={{ color: "black" }}
          className="font-semibold px-2 py-1 rounded-md bg-gray-100"
        >
          {outputDetails?.time}
        </span>
      </p>
    </div>
  );
}
