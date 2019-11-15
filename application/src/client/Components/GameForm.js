import React, {useState} from 'react'
import '../About.css'
import { Button, FormGroup, FormControl, FormLabel, FormCheck, Dropdown} from "react-bootstrap";

const GameForm = () => {
    const settingButton = {
        width: '100%',
        borderRadius: 0,
        height: '4.5rem',
        color: 'white',
    }
    
    const formStyle = {
        width: '100%',
        display:'inline-flex',
        flexDirection:'column',
        textAlign: 'center'
    }

    const inputGameStyle = {
        borderRadius: 0,
        height: '3rem'
    }

    const CheckStyle = {
        flexDirection:'row',
        display:'inline-flex',
        justifyContent: 'flex-end',
    }

    const divStyle = {
        width:'20rem', 
        marginLeft:'30%',
        marginTop:'10%',
        display:'inline-flex'
    }

    return(
        <div style={divStyle}>
            <FormGroup style={formStyle}>
                Setup Room
                <FormControl placeholder='Room Name:' style={inputGameStyle}/>
                <div style={CheckStyle}>
                    <FormLabel>Private</FormLabel> 
                    <FormCheck style={{marginLeft:'1rem'}}/>
                </div>
                <br/>
                Game Rules
                <FormGroup>
                    <FormControl style={inputGameStyle} as="select">
                        <option>Points to Win: </option>
                        <option>1</option>
                        <option>2</option>
                    </FormControl>
                </FormGroup>
                <br/>
                <FormGroup>
                    <FormControl style={inputGameStyle} as="select">
                        <option>Room Size: </option>
                        <option>1</option>
                        <option>2</option>
                    </FormControl>
                </FormGroup>
                <br/>
                <FormGroup>
                    <FormControl style={inputGameStyle} as="select">
                        <option>Custom Card: </option>
                        <option>1</option>
                        <option>2</option>
                    </FormControl>
                </FormGroup>
                <br/>
                <Button variant='dark' style={settingButton}>Create Room</Button>
            </FormGroup>
        </div>
    )
}

export default GameForm