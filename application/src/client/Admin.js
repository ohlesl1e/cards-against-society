import React, {Component} from 'react'
import Header from './Components/Header';
import { retrieveCookie } from './Components/cookies'
import './app.css';
import ListRooms from './Components/ListRooms';
import {Table} from 'react-bootstrap';
import UserSearch from './Components/UserSearch';

export default class Admin extends Component{
    state ={
        userid: retrieveCookie('userid')
    }

    render(){
        return(

            <body>
                <div className="homePage">
                    <Header userid={this.state.userid} />
                </div>

                <div className="admin-title">
                    <h2>Admin</h2>
                </div>

                <div className="column2">
                    <h2>Active Game Rooms</h2>
                    <ListRooms url="http://localhost:4000/game/allgames" />
                    <h5># of Active Game Rooms:</h5>
                </div>

                <div className="column2">
                    <h2>Users</h2>
                    <UserSearch userid=" "/>
                    <h5># of Users:</h5>
                </div>
            </body>


        );
    }
}