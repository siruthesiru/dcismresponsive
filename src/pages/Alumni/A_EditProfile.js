import React, { Component } from 'react';

class MyForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        sex: '',
        Bday: '',
        Address: '',
        Email: '',
        Number: '',
        Degree: '',
        Departnemnt: '',
        Graduation: '',
        Honors: '',
        Status: '',
        Company: '',
        Company_Address: '',
        Occupation: '',
        Prev_Company: '',
        Prev_Occupation: '',
        Years: '',
      },
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      data: {
        ...prevState.data,
        [name]: value,
      },
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
  };

  render() {
    const { data } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <Head head="Personal Information" />
        <Content title="Sex" name="sex" value={data.sex} onChange={this.handleInputChange} />
        <Content title="Birthday" name="Bday" value={data.Bday} onChange={this.handleInputChange} />
        <Content title="Address" name="Address" value={data.Address} onChange={this.handleInputChange} />
        <Line />

        <Head head="Account Information" />
        <Content title="Email" name="Email" value={data.Email} onChange={this.handleInputChange} />
        <Content title="Number" name="Number" value={data.Number} onChange={this.handleInputChange} />
        <Line />

        <Head head="Academic Information" />
        <Content title="Degree" name="Degree" value={data.Degree} onChange={this.handleInputChange} />
        <Content title="Department" name="Departnemnt" value={data.Departnemnt} onChange={this.handleInputChange} />
        <Content
          title="Graduation Date"
          name="Graduation"
          value={data.Graduation}
          onChange={this.handleInputChange}
        />
        <Content title="Honors" name="Honors" value={data.Honors} onChange={this.handleInputChange} />
        <Line />

        <Head head="Professional Information" />
        <Content title="Status" name="Status" value={data.Status} onChange={this.handleInputChange} />
        <Content title="Company" name="Company" value={data.Company} onChange={this.handleInputChange} />
        <Content
          title="Company Address"
          name="Company_Address"
          value={data.Company_Address}
          onChange={this.handleInputChange}
        />
        <Content title="Occupation" name="Occupation" value={data.Occupation} onChange={this.handleInputChange} />
        <Content
          title="Previous Company"
          name="Prev_Company"
          value={data.Prev_Company}
          onChange={this.handleInputChange}
        />
        <Content
          title="Previous Occupation"
          name="Prev_Occupation"
          value={data.Prev_Occupation}
          onChange={this.handleInputChange}
        />
        <Content title="Years" name="Years" value={data.Years} onChange={this.handleInputChange} />
        <Line />

        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default MyForm;

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
  