import React, { useState } from "react";
import { Form, Button, InputGroup, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { SignIn } from "../../../services/authentication";
import { NavLink } from "react-router-dom";
import AuthImage from "../../../components/authprops/authImage";
import AuthHeader from "../../../components/authprops/authHeader";
import { FaEnvelope, FaLock } from "react-icons/fa";

const Login = () => {
    const error = useSelector((state) => state.authenticationSlice.error)

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();
        SignIn(dispatch, { username, password });
    };

    return (
        <div className="container mx-auto flex py-8 gap-2 p-2 sm:p-0 pt-5 mt-10">
            <AuthImage />
            <div className="w-full md:w-[70%] lg::w-[60%] ml-auto justify-end border rounded-md p-8 space-y-4 border-slate-300 bg-white ">
                <AuthHeader />
                <Form onSubmit={handleSubmit}>
                    <InputGroup className="mb-3">
                        <FaEnvelope size={25} className="mx-2" />
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
                        <FaLock size={25} className="mx-2" />
                        <FormControl
                            type="password"
                            placeholder="Password"
                            autoComplete="current-password"
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
                    <div className="flex text-sm p-4">
                        <p>
                            Forgot Password?{" "}
                            <span>
                                <NavLink to="/forgotpassword" className="text-second underline">
                                    Click Here
                                </NavLink>
                            </span>
                        </p>
                    </div>

                    <Button
                        type="submit"
                        variant="primary"
                        style={{ margin: "auto", display: "block", width: "10rem" }}
                    >
                        Login
                    </Button>

                    <p className="text-[16px] mt-[20px] text-center">
                        Don't have an account? Register as
                        <span className="text-second underline px-2">
                            <NavLink to="/signup">Alumni</NavLink>
                        </span>
                        or
                        <span className="text-second underline px-2">
                            <NavLink to="/signup/company">Company</NavLink>
                        </span>
                    </p>
                </Form>
            </div>
        </div>
    );
};

export default Login;
