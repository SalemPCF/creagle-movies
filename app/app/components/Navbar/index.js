import React, { Component } from 'react';
import BaselineMovie from 'react-md-icon/dist/BaselineMovie';

class Navbar extends Component {
    componentDidMount = () => {
        console.log('navbar mounted');
    }

    render () {
        return (
            <div style={{ height: '100vh', width: '50px', left: 0, top: 0, display: 'flex', justifyContent: 'center', backgroundColor: '#272727' }}>
                <BaselineMovie style={{ marginTop: '15px', fontSize: '25px', color: 'white' }} />
            </div>
        );
    }
}

export default Navbar;
