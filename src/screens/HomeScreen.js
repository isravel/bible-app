import React from 'react';
import logo from '../logo.svg';
import '../App.css';
import home from './HomeScreen.module.css';

class HomeScreen extends React.Component{
    render(){
        return (
            <div className="App">
                <header className={home.Home}>
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Bible App
                </a>
                </header>
      </div>
        );
    }
}

export default HomeScreen;