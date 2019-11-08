import React, { Component } from 'react'

export class SignUp extends Component {
    render() {
        return (
            <div>
                <form>
                    <input>Username: </input>
                    <input>Email: </input>
                    <input>Password: </input>
                    <a>already have an account?</a>
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}

export default SignUp
