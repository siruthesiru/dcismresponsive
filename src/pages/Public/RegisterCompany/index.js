
import React, { useState } from "react";
import { FaEnvelope, FaLock, FaUserAlt, FaBuilding } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import AuthImage from "../../../components/authprops/authImage";
import AuthHeader from "../../../components/authprops/authHeader";
import { useDispatch, useSelector } from "react-redux";
import { SignUpCompany } from "../../../services/authentication";
import { Form, FormControl, InputGroup } from "react-bootstrap";

const RegisterCompany = () => {
    const error = useSelector((state) => state.authenticationSlice.error);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [email, setEmail] = useState("");


    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();
        SignUpCompany(dispatch, { username, password, name, companyName, email })

    };
    return (
        <div className="container mx-auto flex py-8 gap-2 p-2 sm:p-0 pt-5 mt-10">
            <AuthImage />
            <div className="w-full md:w-[70%] lg::w-[60%] ml-auto justify-end border rounded-md p-8 space-y-4 border-slate-300 bg-white ">
                <AuthHeader />
                <Form onSubmit={handleSubmit}>
                    <InputGroup className="mb-3">
                        <FaUserAlt size={25} className="mx-2" />
                        <FormControl
                            type="text"
                            placeholder="Username"
                            autoComplete="username"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <FaUserAlt size={25} className="mx-2" />
                        <FormControl
                            type="text"
                            placeholder="Complete Name (LastName, FirstName, MI)"
                            autoComplete="name"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <FaBuilding size={25} className="mx-2" />
                        <FormControl
                            type="text"
                            placeholder="Company Name"
                            autoComplete="companyName"
                            required
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <FaEnvelope size={25} className="mx-2" />
                        <FormControl
                            type="email"
                            placeholder="Email"
                            autoComplete="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <FaLock size={25} className="mx-2" />
                        <FormControl
                            type="password"
                            placeholder="Password"
                            autoComplete="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </InputGroup>
                    {
                        error && (
                            <div className="text-red-500 mx-4">
                                {error}
                            </div>
                        )
                    }
                    <button className="w-full p-4 bg-main rounded-md text-white mt-6">
                        Sign Up
                    </button>

                    <p className="text-[16px] mt-[20px] text-center">
                        Already have an account?
                        <span className=" text-second underline px-2">
                            <NavLink to="/signin">Login</NavLink>
                        </span>
                    </p>
                </Form>
            </div>
        </div>
    );
};

export default RegisterCompany;


