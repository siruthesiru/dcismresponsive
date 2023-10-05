import React from "react";

export default function CompanyCard({ data }) {
  return (
    <div className="flex flex-col bg-white border rounded-lg p-8 mx-4 sm:mx-0 space-y-6">
      <div className="flex flex-col mx-auto justify-center items-center text-center">
        <img
          src={data.img}
          alt="placeholder"
          className="w-[90px] h-[90px] rounded-full border border-slate-300  mb-2"
        />
        <h1 className="font-bold py-2">{data.Name}</h1>
      </div>
    </div>
  );
}