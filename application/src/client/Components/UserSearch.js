import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Table, Form } from 'react-bootstrap';

export default class UserSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: null,
      data: null
    };

    this.getUsers = this.getUsers.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  getUsers(e) {
    e.preventDefault();
    fetch('/users/userSearch', {
      method: 'PUT',
      credentials: 'same-origin',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then((res) => {
        this.setState(
          {
            data: res
          },
          () => console.log(this.state.data)
        );
      });
  }

  createTable = () => {
    const table = []; // Sets empty table
    const children = [];
    if (this.state.data !== null) {
      if (this.state.data.length === 0) {
      } else {
        children.push(
          <Table>
            <tbody>
              <tr className="lobby_Games">
                <th scope="col"> 
{' '}
{"users: "}
</th>
              </tr>
            </tbody>
          </Table>
        );

        for (let i = 0; i < this.state.data.length; i++) {
          // Inner loop to create children
          children.push(
            <Table>
              <tr>
                <td>{this.state.data[i].userid}</td>
              </tr>
            </Table>
          );
        }
      }
      // Creates the parent and adds the children
      table.push(<td>{children}</td>);
    }
    return table;
  };

  handleChange(event) {
    if (event.target.value == '') {
      this.setState({ userid: null });
    } else {
      this.setState({ userid: event.target.value });
    }
  }

  render() {
    return (
      <div className="wrapper">
        <div className="form-wrapper">
          <br />
          <Form onSubmit={this.getUsers}>
            <div className="userId">
              <Form.Label htmlFor="userid">Search Users</Form.Label>
              <Form.Control
                placeholder="User Name"
                type="text"
                value={this.state.userid}
                onChange={this.handleChange}
              />
            </div>
          </Form>
        </div>

        <Table>{this.createTable()}</Table>
      </div>
    );
  }
}
