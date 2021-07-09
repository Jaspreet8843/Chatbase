import React,{useState,useEffect} from 'react';
import Axios from 'axios';
import { baseUrl } from '../../base';
import { useHistory } from "react-router-dom";
import './login.css';

export default function Login(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginStatus, setLoginStatus] = useState("");
    let history = useHistory();
    Axios.defaults.withCredentials = true;

    useEffect(() => {
        Axios.get(baseUrl+"/login").then((response) => {
          if (response.data.loggedIn == true) {
            console.log(response.data);
            setLoginStatus(response.data.user[0].username);
            props.setusername(response.data.user[0].username);
            history.push('/');
          }
        });
    }, []);

    const login = (e) => {
        e.preventDefault();
        Axios.post(baseUrl+"/login", {
            username: username,
            password: password,
        }).then((response) => {
            if(response.data.message){
                setLoginStatus(response.data.message);
            }
            else{
                setLoginStatus(response.data[0].username);
                props.setusername(response.data[0].username);
                history.push('/');
            }
        });
    };

    return (
        <div class="container-fluid login-div m-0 p-0">
            <nav class="navbar navbar-light bg-light">
                <a class="navbar-brand" href="#">ChatBase</a>
            </nav>
            <h3>Login</h3>
            <form onSubmit={login} className="col-md-4 col-sm-8 col-10">
                    <label for="username">User Name</label>
                    <input id="username" type="text" onChange={(e) => {
                        setUsername(e.target.value);
                    }}></input>
                    <label for="password">Password</label>
                    <input id="password" type="password"
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}></input>
                    <div>
                        <button type="submit" className="btn btn-success mt-2">Login</button>
                    </div>
            </form>
            <h1>{loginStatus}</h1>
        </div>
    )
}