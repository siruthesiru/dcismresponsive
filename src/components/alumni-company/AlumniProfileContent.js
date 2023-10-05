import React from "react";
export default function AlumniProfileContent({ data, skills }) {
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
          <Head head="Personal Information" />
          <Content title="sex" desc={data.sex} />
          <Content title="Bday" desc={data.Bday} />
          <Content title="Address" desc={data.Address} />

          <Line />
          <Head head="Account Information" />

          <Content title="Email" desc={data.Email} />
          <Content title="Number" desc={data.Number} />
          <Line />
          <Head head="Academic Information" />

          <Content title="Degree" desc={data.Degree} />
          <Content title="Departnemnt" desc={data.Departnemnt} />
          <Content title="Graduation Date" desc={data.Graduation} />
          <Content title="Honors" desc={data.Honors} />
          <Line />
          <Head head="Professional Information" />

          <Content title="Status" desc={data.Status} />
          <Content title="Company" desc={data.Company} />
          <Content title="Company Address" desc={data.Company_Address} />
          <Content title="Occupation" desc={data.Occupation} />
          <Content title="Previous Company" desc={data.Prev_Company} />
          <Content title="Previous Occupation" desc={data.Prev_Occupation} />
          <Content title="Years" desc={data.Years} />
          <Line />

          <Head head="Skills & Profeciencies" />

          <div>
            {skills[0].skill.map((skill, index) => (
              <div key={index} className="border-[1px] rounded-3xl p-2 mt-2 inline-block mx-1 bg-slate-100">
                <div>{skill}</div>
              </div>
            ))}
          </div>

          <Line />

          <Head head="Resume" />
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
