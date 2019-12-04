import React, { Component } from "react";
import "../app.css";
import { Table, Button } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import io from "socket.io-client";
import { retrieveCookie } from "./Cookies";

export default class ListRooms extends Component {
  constructor() {
    super();
    this.state = {
      data: null,
      socket: io.connect("http://localhost:8080/lobby", {
        reconnection: true,
        reconnectionDelay: 500,
        reconnectionAttempts: 10
      })
    };
    this.getLobbies = this.getLobbies.bind(this);
  }

  componentDidMount() {
    this.getLobbies();
    this.state.socket.on("roomUpdate", () => this.getLobbies());
  }

  cellButton(cell, row, enumObject, rowIndex) {
    if (
      this.state.data[enumObject].playerCount !==
      this.state.data[enumObject].capacity
    ) {
      return (
        <Button size="sm" onClick={() => this.handleRouteChange(row)}>
          Join
        </Button>
      );
    }
  }

  roomCapacity(cell, row, enumObject, rowIndex) {
    return row.playerCount + "/" + row.capacity;
  }

  getLobbies() {
    fetch("http://localhost:4000" + this.props.url)
      .then(response => response.json())
      .then(res => {
        this.setState(
          {
            data: res
          },
          () => console.log(this.state.data)
        );
      });
  }

  // Create a table function
  createTable = () => {
    const { SearchBar } = Search;
    if (this.state.data !== null) {
      if (this.state.data.length === 0) {
        children.push(<div>No games available... please create one.</div>);
      } else {
        const columns = [
          {
            dataField: "roomName",
            text: "Room Name"
          },
          {
            dataField: "HostUserid",
            text: "Host"
          },
          {
            dataField: "capacity",
            text: "Room Capacity",
            formatter: this.roomCapacity.bind(this),
            searchable: false
          },
          {
            dataField: "button",
            text: "Join",
            formatter: this.cellButton.bind(this),
            searchable: false
          }
        ];
        return (
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
                  pagination={paginationFactory()}
                />
              </div>
            )}
          </ToolkitProvider>
        );
      }
    }
  };

  handleRouteChange(link) {
    fetch(`http://localhost:4000/games/join/${link.gameid}`, {
      method: "POST",
      credentials: "same-origin",
      body: JSON.stringify({ userid: retrieveCookie() }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(res => {
        window.open("/Game/" + link.gameid);
      });
  }

  render() {
    return (
      <Table scrollY maxHeight="70vh" striped boredered centered small>
        {this.createTable()}
      </Table>
    );
  }
}
