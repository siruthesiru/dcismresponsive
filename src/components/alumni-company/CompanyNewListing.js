import React from "react";
import { useNavigate } from "react-router-dom";

function NewListing() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col bg-white border rounded-lg p-4 mx-4 sm:mx-0 space-y-2">
      <h1 className="font-bold uppercase">Create New Listing</h1>
      <p className="text-slate-500 text-[12px]">
        Post a Job offer for the Alumni of the University of San Carlos
      </p>
      <div className="flex justify-center" onClick={() => navigate("/company/add-posting")}>
        <div className="w-1/2 hover:cursor-pointer border-2 p-2 bg-[#221769] text-white uppercase mt-4 rounded-xl flex justify-center items-center ">
          <p>Create Listing</p>
        </div>
      </div>

    </div>
  );
}

export default NewListing;
