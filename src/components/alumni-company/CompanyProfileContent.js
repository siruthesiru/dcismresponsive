import React from "react";

export default function CompanyProfileContent({ data }) {
    console.log(data,"sadasd")
  return (
    <div className="flex flex-col bg-white border rounded-lg p-4 mx-4 sm:mx-0 space-y-2">
      <div className="flex flex-col mx-auto justify-center items-center text-center">
        <img
          src={data.img}
          alt="placeholder"
          className="w-[90px] h-[90px] rounded-full border border-slate-300 "
        />
        <h1 className="font-bold py-2">{data.name}</h1>
      </div>

      <div className="flex flex-col text-[12px] space-y-2">
        <div className="flex flex-col bg-white border border-slate-200 p-4 mb-2 rounded-lg">
          <Head head="Company Information" />
          <Content title="Name" desc={data.name} />
          <Content title="Email" desc={data.email} />

          <Line />
          <Head head="Contact Person Information" />
          <Content title="Contact Name" desc={data.contact_name} />
          <Content title="Contact Number" desc={data.contact_number} />
          <Content title="Contact Email" desc={data.contact_email} />

          <div className="flex justify-center">
            <div className="w-1/2 hover:cursor-pointer border-2 p-2 bg-[#284858] text-white uppercase mt-8 rounded-xl flex justify-center items-center ">
              <p>Edit Profile</p>
            </div>
          </div>
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

const Head = ({ head = "" }) => {
  return <p className="font-bold ">{head}</p>;
};
