import React from 'react';
import '../About.css';
import {
  Button,
  FormGroup,
  FormControl,
  FormLabel,
  FormCheck,
  Dropdown
} from 'react-bootstrap';

const GameForm = (state) => {
  const settingButton = {
    width: '100%',
    borderRadius: 0,
    height: '4.5rem',
    color: 'white'
  };

  const formStyle = {
    width: '100%',
    display: 'inline-flex',
    flexDirection: 'column',
    textAlign: 'center'
  };

  const inputGameStyle = {
    borderRadius: 0,
    height: '3rem'
  };

  const CheckStyle = {
    flexDirection: 'row',
    display: 'inline-flex',
    justifyContent: 'flex-end'
  };

  const [points, setPoints] = React.useState('');
  const [size, setSize] = React.useState('');
  const [card, setCard] = React.useState('');
  const [roomName, setRoomName] = React.useState('');
  const [isPrivate, setPrivate] = React.useState(false);

  const submitChange = () => {
    const stateObj = {
      room: roomName,
      private: isPrivate,
      points,
      size,
      card
    };
    console.log(stateObj);
  };

  return (
    <div>
      <FormGroup style={formStyle}>
        Setup Room
        <FormControl
          placeholder="Room Name:"
          style={inputGameStyle}
          value={roomName}
          onChange={e => setRoomName(e.target.value)}
        />
        <div style={CheckStyle}>
          <FormLabel>Private</FormLabel>
          <FormCheck
            style={{ marginLeft: '1rem' }}
            checked={isPrivate}
            onChange={e => setPrivate(e.target.checked)}
          />
        </div>
        <br />
        Game Rules
        <FormGroup>
          <FormControl
            style={inputGameStyle}
            as="select"
            value={points}
            onChange={e => setPoints(e.target.value)}
          >
            <option>Points to Win: </option>
            <option>1</option>
            <option>2</option>
          </FormControl>
        </FormGroup>
        <br />
        <FormGroup>
          <FormControl
            style={inputGameStyle}
            as="select"
            value={size}
            onChange={e => setSize(e.target.value)}
          >
            <option>Room Size: </option>
            <option>1</option>
            <option>2</option>
          </FormControl>
        </FormGroup>
        <br />
        <FormGroup>
          <FormControl
            style={inputGameStyle}
            as="select"
            value={card}
            onChange={e => setCard(e.target.value)}
          >
            <option>Custom Card: </option>
            <option>Sample Card I</option>
            <option>Sample Card II</option>
          </FormControl>
        </FormGroup>
        <br />
        <Button variant="dark" style={settingButton} onClick={submitChange}>
          Create Room
        </Button>
      </FormGroup>
    </div>
  );
};

export default GameForm;
