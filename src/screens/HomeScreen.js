import React from 'react';
import logo from '../logo.svg';
import '../App.css';
import home from './HomeScreen.module.css';
import NavScreen from './NavScreen';


class HomeScreen extends React.Component{
    render(){
        return (
            <div className="App">
                <NavScreen/>
      </div>
        );
    }
}

export default HomeScreen;