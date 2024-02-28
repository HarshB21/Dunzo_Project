import axios from 'axios';
import React, {  useState } from 'react'
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { FaEyeSlash,FaEye } from "react-icons/fa";
import Header from '../Components/Header';
import { Button } from 'react-bootstrap';

const Login = () => {
    
    const [showpassword,setshowpassword]=useState(false);
    const [logindata, setlogindata] = useState({ userEmail: '', userPassword: '' });
    const handelInput = (e) => {
        setlogindata({ ...logindata, [e.target.name]: e.target.value });
    };

    const togglePassword =() => {
        setshowpassword(!showpassword);
    }
    const navigate = useNavigate();
    const handelLogin = async (e) => {
        e.preventDefault();

        try{
            const response = await axios.post(`http://localhost:8080/Dunzo/Login`,logindata)

            const responsedata = response.data;
            localStorage.setItem('userdata',responsedata);

            const token = localStorage.getItem('userdata');
        

         await axios.get(`http://localhost:8080/Dunzo/GET/${logindata.userEmail}/${logindata.userPassword}`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
         })
            .then((response) => {
                const {userRole,userName,userPhone,userEmail,userId} = response.data;
                console.log(response.data);
                
                if (userRole === 'Admin') {
                    navigate('/adminpage')
                } else {
                    localStorage.setItem('userId',userId)
                    localStorage.setItem('userName',userName)
                    localStorage.setItem('userPhone',userPhone)
                    localStorage.setItem('userEmail',userEmail)
                    toast.success('Successfully Logged In',{autoClose:1000})
                    setTimeout(()=>{
                        navigate('/')
                    },2000) 
                }     
            })
            .catch(error => {
                console.log(error);
                if (error.response) {
                    toast.error(error.response.data.message);
                } else if (error.request) {
                    toast.error(error.request);
                }
            })
        }catch{

            }
    }

    return (
        <div>
            <Header/>
            <main >
                <div class="container" style={{ width: "500px " }} >
                    <div class="row">
                        <div class="col-md-12" style={{ width: "100%" }}>
                            <div class="login-container" style={{ maxWidth: "392px", backgroundColor: "black", color: 'white', borderRadius: "10px", height: "400px", padding: "52px",marginLeft:'60px', marginTop: "150px", marginBottom: "50px" }}>
                                <h2 classNames="text-center mb-4">Login</h2>
                             <form onSubmit={handelLogin}> 
                                    <div class="form-group" style={{ marginBottom: "1rem" }}>
                                        <label for="email">Email</label>
                                        <input type="email" class="form-control" name="userEmail" placeholder="Enter Email" value={logindata.userEmail} onChange={handelInput} />
                                    </div>
                                    <div class="form-group" >
                                        <label for="password">Password</label>
                                        <div style={{display:'flex'}}>
                                        <input type={showpassword ? "text" : "password"} class="form-control" name="userPassword" placeholder="Enter Password" value={logindata.userPassword} onChange={handelInput} />
                                        <Button style={{backgroundColor:'white', color:'black'}} onClick={togglePassword}>{showpassword ? <FaEye /> : <FaEyeSlash />}</Button>
                                        </div>
                                    </div>
                                    <div>
                                        <button style={{marginTop:'1rem'}} type="submit" class="btn btn-primary btn-block">Login</button>
                                    </div>
                                    <p class="text-end"><a href="/Register">Dont't Have Account</a></p>
                                </form>
                                <ToastContainer/>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Login;
