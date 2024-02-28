import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../Components/Header';
import { useNavigate } from 'react-router-dom';

const Registration = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        userName: '',
        userPhone: '',
        userEmail: '',
        userPassword: '',
    });

    const [errors, setErrors] = useState({
        userName: '',
        userEmail: '',
        userPassword: '',
        userPhone:'',
    });

    const handleInput = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' }); // Clear error when input changes
    };
    const phoneRegex = /^\d{10}$/;
    const nameRegex = /^[a-zA-Z0-9]+$/;
    const emailRegex= /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    const handleRegister = async (e) => {
        e.preventDefault();

        if (!user.userName.trim()) {
            setErrors({ ...errors, userName: 'Name is required' });
            return;
        }
        if(!nameRegex.test(user.userName)){
            setErrors({ ...errors, userName:'Username should not contain special characters'});
        }

        if (!user.userEmail.trim()) {
            setErrors({ ...errors, userEmail: 'Email is required' });
            return;
        }
        if(!emailRegex.test(user.userEmail)){
            setErrors({ ...errors, userEmail:'Invalid email address'});
        }
        if (!user.userPhone.trim()) {
            setErrors({ ...errors, userPhone: 'Phone number is required' });
            return;
        }
        if (!phoneRegex.test(user.userPhone)){
            setErrors({ ...errors, userPhone:'Invalid Phone number'});
            return;
        }
        
       
        
        const url = 'http://localhost:8080/Dunzo/POST';

        await axios
            .post(url, user)
            .then((response) => {
                console.log(response.data);
                toast.success('Successfully registered.', { autoClose: 1000 });
                setUser({
                    userName: '',
                    userPhone: '',
                    userEmail: '',
                    userPassword: '',
                });
                setTimeout(() => {
                    navigate('/LogIn');
                }, 2000);
            })
            .catch((error) => {
                console.log(error);
                if (error.response) {
                    toast.error(error.response.data.message, { autoClose: 1000 });
                } else if (error.request) {
                    toast.error(error.request, { autoClose: 1000 });
                }
            });
    };




    return (
        <div>
            <Header />
            <main >
                <div className="mainbi" >
                    <div className="mask d-flex align-items-center style" >
                        <div className="container h-100">
                            <div className="row d-flex justify-content-center h-100">
                                <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                                    <div className="card" style={{ borderRadius: "15px", width: "105%", marginTop: "50px", marginBottom: "50px", backgroundColor: "black", color: "white" }}>
                                        <div className="card-body p-5">
                                            <h2 className="text-uppercase text-center mb-5">Create Account</h2>
                                            <form onSubmit={handleRegister}>
                                                <div className="form-outline mb-4">
                                                    <label className="form-label" htmlFor="name">
                                                        Enter name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="userName"
                                                        className={`form-control form-control-lg ${errors.userName ? 'is-invalid' : ''
                                                            }`}
                                                        placeholder="Enter Name"
                                                        value={user.userName}
                                                        onChange={handleInput}
                                                        
                                                    />
                                                    {errors.userName && (
                                                        <div className="invalid-feedback">{errors.userName}</div>
                                                    )}
                                                </div>

                                                <div className="form-outline mb-4">
                                                    <label className="form-label" htmlFor="name">
                                                        Enter Email
                                                    </label>
                                                    <input
                                                        type="email"
                                                        name="userEmail"
                                                        className={`form-control form-control-lg ${errors.userEmail ? 'is-invalid' : ''
                                                            }`}
                                                        placeholder="Enter Email"
                                                        value={user.userEmail}
                                                        onChange={handleInput}
                                                    />
                                                    {errors.userEmail && (
                                                        <div className="invalid-feedback">{errors.userEmail}</div>
                                                    )}
                                                </div>

                                                <div className="form-outline mb-4">
                                                    <label className="form-label" htmlFor="phonenumber">
                                                        Enter Phone Number
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="userPhone"
                                                        className={`form-control form-control-lg ${errors.userPhone ? 'is-invalid' : ''
                                                            }`}
                                                        placeholder="Enter Phone Number"
                                                        value={user.userPhone}
                                                        onChange={handleInput}
                                                    />
                                                     {errors.userPhone && (
                                                        <div className="invalid-feedback">{errors.userPhone}</div>
                                                    )}
                                                </div>

                                                <div className="form-outline mb-4">
                                                    <label className="form-label" htmlFor="password">
                                                        Enter Password
                                                    </label>
                                                    <input
                                                        type="password"
                                                        name="userPassword"
                                                        className={`form-control form-control-lg ${errors.userPassword ? 'is-invalid' : ''
                                                            }`}
                                                        placeholder="Enter Password"
                                                        value={user.userPassword}
                                                        onChange={handleInput}
                                                    />
                                                    {errors.userPassword && (
                                                        <div className="invalid-feedback">{errors.userPassword}</div>
                                                    )}
                                                </div>

                                                <div className="text-center">
                                                    <button
                                                        type="submit"
                                                        className="btn btn-success btn-block btn-lg"
                                                    >
                                                        Register
                                                    </button>
                                                </div>

                                                <h6 style={{ marginTop: '1rem' }} className="text-center">
                                                    Have already an account??<a href="/LogIn">Login here</a>
                                                </h6>
                                            </form>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            {/* {message && <p>{message}</p>}    */}
            <ToastContainer />
        </div>
    )
}

export default Registration;
