import React from 'react';

class Leslie extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isClicked: false,
        }
    }
    render() {
        return (
            <div>
            Leslie's page
            </div>
        );
    }
}

export default Leslie;