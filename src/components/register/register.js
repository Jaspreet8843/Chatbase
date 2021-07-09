import React,{useState,useEffect} from 'react';
import Axios from 'axios';
import { baseUrl } from '../../base';
import { useHistory } from "react-router-dom";
import './register.css';

export default function Register() {

    const [usernameReg, setUsernameReg] = useState("");
    const [passwordReg, setPasswordReg] = useState("");
    const [fullnameReg, setFullnameReg] = useState("");
    const [registerStatus, setRegisterStatus] = useState("");
    let history = useHistory()
    Axios.defaults.withCredentials = true;

    useEffect(() => {
        Axios.get(baseUrl+"/login").then((response) => {
          if (response.data.loggedIn == true) {
            history.push('/');
          }
        });
    }, []);

    const register = (e) => {
        e.preventDefault();
        Axios.post(baseUrl+"/register", {
          username: usernameReg,
          password: passwordReg,
          fullname: fullnameReg,
        }).then((response) => {
          console.log(response);
          setRegisterStatus(response.data.message);
        });
    };
   
    return (
        <div className="row register-div m-0 p-0">
            <nav class="navbar navbar-light bg-light">
                <a class="navbar-brand" href="#">ChatBase</a>
            </nav>
            <h3>Register</h3>
            <form onSubmit={register} className="col-md-4 col-sm-8 col-10">
                    <label for="username">User Name</label>
                    <input id="username" type="text" onChange={(e) => {
                        setUsernameReg(e.target.value);
                    }}></input>
                    <label for="fullname">Full Name</label>
                    <input id="fullname" type="text" onChange={(e) => {
                        setFullnameReg(e.target.value);
                    }}></input>
                    <label for="password">Password</label>
                    <input id="password" type="password"
                        onChange={(e) => {
                            setPasswordReg(e.target.value);
                        }}></input>
                <div>
                    <button type="submit" className="btn btn-primary mt-2">Register</button>
                </div>
            </form>
            <h3>{registerStatus}</h3>
        </div>
    )
}