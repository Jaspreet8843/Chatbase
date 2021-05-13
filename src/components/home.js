import React from 'react';
import './home.css';
import logo from '../logo.svg'
//import ReactDOM from 'react-dom';

const Home= () => {
    return(
        <div className="box">
            <div className="container">
                People
            </div>
            <div className="people">
                <img src={logo}></img>
                <h1>Jaspreet</h1>
            </div>
            <div className="people">
            <img src={logo}></img>
                <h1>Manab</h1>
            </div>
        </div>
        
    )
}


export default Home;