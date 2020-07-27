import React, { Component } from 'react';
import '../app.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import io from 'socket.io-client';
import { retrieveCookie } from './Cookies';
import {Table, 
  Button, 
  Container,
  Row, 
  Dropdown, 
  DropdownButton, 
  ButtonToolbar} from 'react-bootstrap';

export default class ListRooms extends Component {
  _isMounted = false;

  constructor() {
    super();
    this.state = {
      data: null,
      socket: io.connect('http://localhost:8080/lobby', {
        reconnection: true,
        reconnectionDelay: 500,
        reconnectionAttempts: 10
      })
    };
    this.getLobbies = this.getLobbies.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    this.getLobbies();
    this.state.socket.on('roomUpdate', () => this.getLobbies());
  }

  getLobbies() {
    fetch('http://localhost:4000' + this.props.url)
      .then(response => response.json())
      .then((res) => {
        if (this._isMounted) {
          this.setState(
            {
              data: res
            },
            () => console.log(this.state.data)
          );
        }
      });
  }

  // CreateTable function:
  // ---------------------------
  // IF the user has not created a room, it will display JSX tags specifically for the given usecase.
  // Otherwise, it will display a list of rooms that the user has created
  createTable = () => {
    const { SearchBar } = Search;
    if (this.state.data !== null) {
      if (this.state.data.length === 0) {
        return (
          <Container>
            <Row>
              <div className='wrapper_room'>
                <Table scrollY maxHeight="70vh" striped boredered centered small>
                  <h4>No games available...</h4>
                  <h4>wanna create one?</h4>
                  <h4>up to you</h4>
                </Table>
              </div>
            </Row>
          </Container>
        );
      }
      const columns = [
        {
          dataField: 'roomName',
          text: 'Room Name',
          headerStyle: () => {
            return { width: "40%" };
          }
        },
        {
          dataField: 'HostUserid',
          text: 'Host',
          headerStyle: () => {
            return { width: "30%" };
          }
        },
        {
          dataField: 'capacity',
          text: 'Room Capacity',
          formatter: this.roomCapacity.bind(this),
          searchable: false,
          headerStyle: () => {
            return { width: "10%" };
          }
        },
        {
          dataField: 'button',
          text: 'Join',
          formatter: this.cellButton.bind(this),
          searchable: false,
          headerStyle: () => {
            return { width: "10%" };
          }
        }
      ];

      // PAGINATION COMPONENT (LEFT SIDE)
      // ------------------------------------
      // since the PaginationFactory()'s component cannot be modified via 
      // traditional styling, new component must be initialized in order
      // to "modify" its styling
      const sizePerPageRenderer = ({options,currSizePerPage,onSizePerPageChange}) => (
        <ButtonToolbar>
          <DropdownButton 
            drop='down' 
            title={currSizePerPage} 
            variant='secondary' 
            className='pagination-style'
          >
          {
            options.map((option) => {
              const isSelect = currSizePerPage === `${option.page}`;
              return (
                  <Dropdown.Item
                    key={ option.text }
                    type="button"
                    onClick={ () => onSizePerPageChange(option.page) }
                    className={ `btn ${isSelect ? 'btn-secondary' : 'btn-secondary'}` }
                  >
                    { option.text }
                  </Dropdown.Item> 
              );
            })
          }
          </DropdownButton>
        </ButtonToolbar>
    );        
      
      // DROPDOWN PAGINATION COMPONENT (RIGHT SIDE)
      // --------------------------------------------
      // since the PaginationFactory()'s component cannot be modified via 
      // traditional styling, new component must be initialized in order
      // to "modify" its styling. 
      const pageButtonRenderer = ({page,onPageChange}) => {
        const handleClick = (e) => {
          e.preventDefault();
          onPageChange(page);
        };
        return (
          <div className='div-pagination'>
            <Button className='pagination-button'>
              <a href="#" onClick={ handleClick } className='pagination-href'>{ page }</a>
            </Button>
          </div>
        );
      };
  
      // object that wraps styling of the given pagination components,
      // which includes the sizePerPageRenderer (left side) and
      // pageButtonRenderer (right side)
      const options = {
        sizePerPageRenderer,
        pageButtonRenderer
      }

      return (
        <div className='wrapper_room'>
          <Table scrollY maxHeight="70vh" striped boredered centered small>
            <ToolkitProvider
              keyField="roomName"
              data={this.state.data}
              columns={columns}
              pagination={paginationFactory()}
              search
            >
              {props => (
                <div>
                  <center>
                    <h3>Game Rooms Active</h3>
                  </center>

                  <hr />
                  <SearchBar
                    {...props.searchProps}
                    placeholder="Search for a room"
                  />
                
                <BootstrapTable
                    {...props.baseProps}
                    pagination={paginationFactory(options)}
                  />
                </div>
              )}
            </ToolkitProvider>
          </Table>
        </div>
      );
    }
  };

  cellButton(cell, row, enumObject, rowIndex) {
    let userInGame = false;
    const { points } = this.state.data[enumObject].gameState;
    points.forEach((player) => {
      if (player[retrieveCookie()] !== undefined) {
        userInGame = true;
        console.log('user is in game' + enumObject);
      }
    });

    if (
      this.state.data[enumObject].playerCount
        !== this.state.data[enumObject].capacity
      || userInGame
    ) {
      return (
        <Button size="sm" onClick={() => this.handleRouteChange(row)}>
          Join
        </Button>
      );
    }
  }

  roomCapacity(cell, row, enumObject, rowIndex) {
    return `${row.playerCount}/${row.capacity}`;
  }

  handleRouteChange(link) {
    fetch(`http://localhost:4000/games/join/${link.gameid}`, {
      method: 'POST',
      credentials: 'same-origin',
      body: JSON.stringify({ userid: retrieveCookie() }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then((res) => {
        window.open('/Game/' + link.gameid);
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <div>
          {this.createTable()}
      </div>
    );
  }
}
