import React, { useState } from "react";
import "./css/RegisterPage.css";
import nameWhite from "../assets/nameWhite.svg";
import { registerUser } from '../services/api/RegisterApi';


const RegisterPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

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
            // Optionally clear the form
            setFormData({
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
                    <div className="usernameInput">
                        <h1 className="text-big m0 font-outfit text-primary font-medium">
                            Username
                        </h1>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="input-field bg-bgcolor rounded-custom p-4"
                        />
                    </div>

                    <div className="emailInput">
                        <h1 className="text-big m0 font-outfit text-primary font-medium">
                            Email
                        </h1>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="input-field bg-bgcolor rounded-custom p-4"
                        />
                    </div>

                    <div className="passwordInput">
                        <h1 className="text-big m0 font-outfit text-primary font-medium">
                            Password
                        </h1>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="input-field w-full h-[60px] bg-bgcolor rounded-custom p-4"
                        />
                    </div>

                    <div className="passwordConfirmInput">
                        <h1 className="text-big m0 font-outfit text-primary font-medium">
                            Confirm Password
                        </h1>
                        <input
                            type="password"
                            name="password_confirmation"
                            value={formData.password_confirmation}
                            onChange={handleChange}
                            className="input-field w-full h-[60px] bg-bgcolor rounded-custom p-4"
                        />
                    </div>

                    <div className="register flex flex-col items-center">
                        <button type="submit" className="input-field bg-accent2 rounded-custom text-primary font-bold text-2xl">
                            Register
                        </button>
                    </div>
                </form>

                {error && <div className="error-message text-red-500 text-center mt-4">{error}</div>}
                {successMessage && <div className="success-message text-green-500 text-center mt-4">{successMessage}</div>}


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
                    <div className="bg-accent w-11/12 h-[60]">
                        <h1 className="text-big text-primary font-bold font-outfit">Tell us about yourself</h1>
                        <input className="input-field bg-bgcolor rounded-custom p-4"/>

                    </div>
                </div>
            </div>
        </div>
    );
};
export default RegisterPage;