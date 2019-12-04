import React, { Component } from 'react';
import { Table} from 'react-bootstrap';

export default class UserList extends Component {
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
        fetch('http://localhost:4000/users', {
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


 // Create a table function
 createTable = () => {
    const table = []; // Sets empty table
    const children = [];
    if (this.state.data !== null) {
      if (this.state.data.length === 0) {
      } else {
        children.push(
          <Table>
            <tr className="lobby_users">
              <th>Username</th>
            </tr>
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

          
        <div className="wrapper_users">
          <Table scrollY maxHeight="70vh" striped boredered centered small>
            {this.createTable()}
          </Table>
          </div>
        );
      }
}
     

    