import React from "react";
import { useNavigate } from "react-router-dom";

export default function UserCard({ data }) {

  const navigate = useNavigate();

  return (
    <div className="flex flex-col bg-white border rounded-lg p-4 mx-4 sm:mx-0 space-y-6">
      <div className="flex flex-col mx-auto justify-center items-center text-center">
        <img
          src={data.img}
          alt="placeholder"
          className="w-[90px] h-[90px] rounded-full border border-slate-300 "
        />
        <h1 className="font-bold py-2">{data.Name}</h1>
        <h1 className="text-[12px]">{data.title}</h1>
      </div>

      <div className="flex flex-col text-[12px] space-y-2">
        <Line />
        <Content title="Company" desc={data.Company} />
        <Content title="Location" desc={data.Location} />
        <Content title="Years of Exp" desc={data.Years} />

        <Line />
        <Content title="Graduated" desc={data.Graduated} />
        <Content title="Program" desc={data.Program} />
        <Content title="Department" desc={data.Department} />
        <Line />

        <div className="flex flex-col">
          <Content title="Skills" desc={data.Skills} />
          <p className="flex justify-end text-[#0098FF] cursor-pointer" onClick={() => navigate("/alumni/profile")}>View All</p>
        </div>
      </div>
    </div>
  );
}

const Content = ({ title = "", desc = "" }) => {
  return (
    <div className="flex justify-between">
      <p>{title}</p>
      <p className="font-bold ">{desc}</p>
    </div>
  );
};

const Line = () => {
  return (
    <div className="flex mx-auto border border-solid border-slate-200 h-px w-full my-2" />
  );
};
