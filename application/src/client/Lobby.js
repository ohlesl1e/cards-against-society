import React, { Component } from 'react';
import Header from './Components/Header';
import { retrieveCookie } from "./Components/cookies";

export default class Lobby extends Component {
    state = {
        userid: retrieveCookie("userid")
    }

    componentDidMount(){
        if(!retrieveCookie("userid")){
            alert("please log in!");
        }
    }

    render() {
        return (
            <div>
                <Header />
                
            </div>
        );
  }
}
