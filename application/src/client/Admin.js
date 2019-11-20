import React, {Component} from 'react'
import Header from './Components/Header';
import { retrieveCookie } from './Components/cookies'
import './app.css';
import ListRooms from './Components/ListRooms';
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
            
                <div class="sidebarContainer">
                    <div class="sidebarAdmin">
                    Admin Control
                    </div>

                <div className="sidebarNav">
                    <li><a href='/Lobby'>
                        Lobby
                    </a></li>
                </div>

                <div className="sidebarNav">
                    <li><a href='/About'>
                        About
                    </a></li>
                </div>

                <div className="sidebarNav">
                    <li><a href='/Profile'>
                        Profile
                    </a></li>
                </div>

                <div className="sidebarNav">
                    <li><a href='/Custom'>
                        Custom Cards
                    </a></li>
                </div>

                <div className="sidebarNav">
                    <li><a href='/Registration'>
                        Registration
                    </a></li>
                </div>

                <div className="sidebarNav">
                    <li><a href='/FAQ'>
                        FAQ
                    </a></li>
                </div>
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