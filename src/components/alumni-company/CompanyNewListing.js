import React from "react";

function NewListing() {
  return (
    <div className="flex flex-col bg-white border rounded-lg p-4 mx-4 sm:mx-0 space-y-2">
      <h1 className="font-bold uppercase">Create New Listing</h1>
      <p className="text-slate-500 text-[12px]">
        Post a Job offer for the Alumni of the University of San Carlos
      </p>
      <div className="flex justify-center">
        <div className="w-1/2 hover:cursor-pointer border-2 p-2 bg-[#284858] text-white uppercase mt-4 rounded-xl flex justify-center items-center ">
          <p>Create Listing</p>
        </div>
      </div>

    </div>
  );
}

export default NewListing;
