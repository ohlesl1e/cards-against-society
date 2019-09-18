import React from 'react';

class Jose extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isClicked: false,
        }
    }
    render() {
        return (
            <div>
            Jose's message
            </div>
        );
    }
}

export default Jose;