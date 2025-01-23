import React, { useState } from "react";
import "./css/RegisterPage.css";
import nameWhite from "../assets/nameWhite.svg";
import { registerUser } from '../services/api/RegisterApi';
import {Link, useNavigate} from "react-router-dom";


const RegisterPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage(null);
        console.log('Sending registration data:', formData);
        try {
            await registerUser(formData);
            setSuccessMessage("Registration successful!");
            navigate("/login");
            // Optionally clear the form
            setFormData({
                name: '',
                username: '',
                email: '',
                password: '',
                password_confirmation: '',
            });
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message || 'Registration failed');
            } else {
                setError('An unknown error occurred');
            }
        }
    };

    return (
        <div className="flex justify-center items-center w-screen h-screen">
            <div className="register-grid-container rounded-custom bg-accent">

                <form onSubmit={handleSubmit} className="register-form">
                    <div className="fullName flex flex-col items-center">
                        <h1 className="text-big text-primary font-bold font-outfit w-full text-left">Name</h1>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="input-field bg-bgcolor rounded-custom p-4 font-outfit text-big"/>
                    </div>
                    <div className="usernameInput flex flex-col items-center">
                        <h1 className="text-big m0 font-outfit text-primary font-medium w-full text-left">
                            Username *
                        </h1>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="input-field bg-bgcolor rounded-custom p-4 font-outfit text-big"
                        />
                    </div>

                    <div className="emailInput flex flex-col items-center">
                        <h1 className="text-big m0 font-outfit text-primary font-medium w-full text-left">
                            Email *
                        </h1>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="input-field bg-bgcolor rounded-custom p-4 font-outfit text-big"
                        />
                    </div>

                    <div className="passwordInput flex flex-col items-center">
                        <h1 className="text-big m0 font-outfit text-primary font-medium w-full text-left">
                            Password *
                        </h1>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="input-field bg-bgcolor rounded-custom p-4 font-outfit text-big"
                        />
                    </div>

                    <div className="passwordConfirmInput flex flex-col items-center">
                        <h1 className="text-big m0 font-outfit text-primary font-medium w-full text-left">
                            Confirm Password *
                        </h1>
                        <input
                            type="password"
                            name="password_confirmation"
                            value={formData.password_confirmation}
                            onChange={handleChange}
                            className="input-field bg-bgcolor rounded-custom p-4 font-outfit text-big"
                        />
                    </div>

                    <div className="register flex flex-col items-center">
                        <button type="submit"
                                className="input-field bg-accent2 rounded-custom text-primary font-bold text-2xl">
                            Register
                        </button>
                        <div className="flex items-center gap-2">
                            <Link to={"/landing"}>
                                <button
                                    type="submit"
                                    className="text-big bg-accent w-[60px] h-[30px] btn rounded-custom text-primary font-outfit font-bold text-2xl">
                                    X
                                </button>
                            </Link>
                            <Link to={"/login"}>
                                <h1 className="text-small m0 font-outfit text-accent2 font-medium p-2">
                                    Already registered? Click here to sign in
                                </h1>
                            </Link>
                        </div>
                    </div>
                </form>

                {error && <div className="error-message text-red-500 text-center mt-4">{error}</div>}
                {successMessage &&
                    <div className="success-message text-green-500 text-center mt-4">{successMessage}</div>}


                <div className="backgroundLogin flex flex-col items-center justify-center">
                    <img
                        src={nameWhite}
                        alt="Settima Logo"
                        className="w-4/5 h-auto ml-4"
                    />
                    <h1 className="text-giant text-primary font-bold text-center">
                        Start to share your favourite moments <br/>
                        <u> one scene at a time.</u>
                    </h1>
                </div>
            </div>
        </div>
    );
};
export default RegisterPage;