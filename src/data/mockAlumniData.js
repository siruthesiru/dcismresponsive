import { Prev } from "react-bootstrap/esm/PageItem";
import placeholder from "../../src/assets/placeholder.png";

// import { EventData,HelpData, JobsData,NotifData,UserCardData} from "../../../data/mockAdminData";

export const EventData = [
  {
    data: [
      {
        id: 1,
        img: placeholder,
        alt: "image",
        title: "New Job Offerings Added from Galliance, JAWS",
        Posted_by: "DCISM",
        Posted_on: "December 1, 2023",
        Content:
          "The DCISM Office would like to inform you that we will not be providing services on November 30, 2023 as it is the non-working holiday, Bonifacio Day. <br/> We will resume services on December 1, 2023.",
      },
      {
        id: 2,
        img: placeholder,
        alt: "image",
        title: "DCISM Office closed for November 30, Bonifacio Day",
        Posted_by: "DCISM",
        Posted_on: "December 1, 2023",
        Content:
          "The latest batch of graduates from the Department of Computer & Information Sciences and Mathematics has just been added to the system..",
      },
      {
        id: 3,
        img: placeholder,
        alt: "image",
        title: "Frontend Developer",
        Posted_by: "DCISM",
        Posted_on: "December 1, 2023",
        Content:
          "The DCISM Office would like to inform you that we will not be providing services on November 30, 2023 as it is the non-working holiday, Bonifacio Day. <br/> We will resume services on December 1, 2023.",
      },
      {
        id: 4,
        img: placeholder,
        alt: "image",
        title: "Frontend Developer",
        Posted_by: "DCISM",
        Posted_on: "December 1, 2023",
        Content:
          "The DCISM Office would like to inform you that we will not be providing services on November 30, 2023 as it is the non-working holiday, Bonifacio Day. <br/> We will resume services on December 1, 2023.",
      },
      {
        id: 5,
        img: placeholder,
        alt: "image",
        title: "New Job Offerings Added from Galliance, JAWS",
        Posted_by: "DCISM",
        Posted_on: "December 1, 2023",
        Content:
          "The DCISM Office would like to inform you that we will not be providing services on November 30, 2023 as it is the non-working holiday, Bonifacio Day. <br/> We will resume services on December 1, 2023.",
      },
    ],
  },
];

export const HelpData = [
  {
    data: [
      {
        id: 1,
        title:
          "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit?",
        Content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam accumsan leo mi, ut posuere tellus ornare in. Maecenas mauris sapien, aliquet nec quam quis, eleifend auctor felis. Nunc ut nisi purus.",
      },
      {
        id: 2,
        title: "ut posuere tellus ornare in?",
        Content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam accumsan leo mi, ut posuere tellus ornare in. Maecenas mauris sapien, aliquet nec quam quis, eleifend auctor felis. <br/>Nunc ut nisi purus. Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit? <br/>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam accumsan leo mi, ut posuere tellus ornare in. Maecenas mauris sapien, aliquet nec quam quis, eleifend auctor felis.<br/> Nunc ut nisi purus.",
      },
      {
        id: 3,
        title: "Fquia dolor sit amet, consectetur, adipisci velit?",
        Content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam accumsan leo mi, ut posuere tellus ornare in. Maecenas mauris sapien, aliquet nec quam quis, eleifend auctor felis. Nunc ut nisi purus.",
      },
    ],
  },
];

export const JobsData = [
  {
    Head: "Reommended for you",
    Desc: "Based on your skills, previous and current occupation, location, course, and experience.",
    data: [
      {
        Title: "Web Developer",
        Company: "Accenture",
        Location: "Cebu City",
        Years: "5",
        Salary: "P20,000",
        Slots: "5",
      },
      {
        Title: "Quality Assurance",
        Company: "Touch Fire",
        Location: "Cebu City",
        Years: "5",
        Salary: "P20,000",
        Slots: "5",
      },
    ],
  },
  {
    Head: "Hiring in your course",
    Desc: "Based on your course.",
    data: [
      {
        Title: "Tech Support",
        Company: "Accenture",
        Location: "Cebu City",
        Years: "5",
        Salary: "P20,000",
        Slots: "5",
      },
      {
        Title: "Data Analyst",
        Company: "Touch Fire",
        Location: "Cebu City",
        Years: "5",
        Salary: "P20,000",
        Slots: "5",
      },
    ],
  },
  {
    Head: "Others in your area",
    Desc: "Jobs you might want to check out",
    data: [
      {
        Title: "Human Resorces",
        Company: "Accenture",
        Location: "Cebu City",
        Years: "5",
        Salary: "P20,000",
        Slots: "5",
      },
      {
        Title: "Programming Teacher",
        Company: "Touch Fire",
        Location: "Cebu City",
        Years: "5",
        Salary: "P20,000",
        Slots: "5",
      },
    ],
  },
];

export const NotifData = [
  {
    data: [
      {
        id: 1,
        title: "New Job Offerings Added from Galliance, JAWS",
        Recieved: "December 1, 2023",
        Content:
          "The DCISM Office would like to inform you that we will not be providing services on November 30, 2023 as it is the non-working holiday, Bonifacio Day. <br/> <br/> We will resume services on December 1, 2023.",
      },
      {
        id: 2,
        title: "DCISM Office closed for November 30, Bonifacio Day",
        Recieved: "December 1, 2023",
        Content:
          "The latest batch of graduates from the Department of Computer & Information Sciences and Mathematics has just been added to the system..",
      },
      {
        id: 3,
        title: "Frontend Developer",
        Recieved: "December 1, 2023",
        Content:
          "Your school email has been successfully added to your profile. You can make changes to your details through the Profile page..",
      },
    ],
  },
];

export const UserCardData = [
  {
    img: placeholder,
    Name: "Jose Rizal",
    title: "Web Developer",
    Company: "Perkins Co.",
    Location: "Cebu City",
    Years: "5",
    Graduated: "2023",
    Program: "BS-IT",
    Department: "DCISM",
    Skills: "HTML, CSS ",
  },
];

export const PendingData = [
  {
    Head: "Pending Applications",

    data: [
      {
        Title: "Web Developer",
        Company: "Accenture",
        Location: "Cebu City",
        Years: "5",
        Salary: "P20,000",
        Slots: "5",
      },
      {
        Title: "Quality Assurance",
        Company: "Touch Fire",
        Location: "Cebu City",
        Years: "5",
        Salary: "P20,000",
        Slots: "5",
      },
    ],
  },
];

export const ProfileData = [
  {
    img: placeholder,
    name: "Jose Rizal",
    sex: "Male",
    Bday: "June 19,1999",
    Address: "Talamban,Cebu City",
    Email: "joserizal@gmail.com",
    Number: "123456789",
    Degree: "BS Information Technology",
    Departnemnt: "DCISM",
    Graduation: "June 21, 2023",
    Honors: "None",
    Status: "Employed",
    Company: "Touch Fire",
    Company_Address: "Mandaue City",
    Occupation: "Web Developer",
    Prev_Company: "N/A",
    Prev_Occupation: "N/A",
    Years: "1",
  },
];

export const SkillsData = [
  {
    skill: [
      "HTML, CSS, Javascript",
      "React/ReactJS",
      "NodeJS",
      "Laravel",
      "Office",
    ],
  },
];

export const FilesData = [
  {
    skill: [
      "Resume",
      "Portfolio",

    ],
  },
];

export const SearchData = [
  {
    Head: "Search Results for 'Dev'",
    data: [
      {
        Title: "Web Developer",
        Company: "Accenture",
        Location: "Cebu City",
        Years: "5",
        Salary: "P20,000",
        Slots: "5",
      },
      {
        Title: "Quality Assurance",
        Company: "Touch Fire",
        Location: "Cebu City",
        Years: "5",
        Salary: "P20,000",
        Slots: "5",
      },
    ],
  },
];

export const CompanyProfileData = [
  {
    img: placeholder,
    name: "Touch Fire",
    email: "support@spinneret.com",
    contact_name: "Jose Rizal",
    contact_number: "123456789",
    contact_email: "joserizal@spinneret.com",

  },
];