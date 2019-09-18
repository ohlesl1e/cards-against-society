import React from 'react';

class Zhola extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isClicked: false,
        }
    }
    render() {
        return (
            <div>
            Zhola's message
            </div>
        );
    }
}

export default Zhola;