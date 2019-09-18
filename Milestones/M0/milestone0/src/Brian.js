import React from 'react';

class Brian extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isClicked: false,
        }
    }
    render() {
        return (
            <div>
            Brian's says
            </div>
        );
    }
}

export default Brian;