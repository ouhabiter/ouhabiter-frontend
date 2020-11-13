import React, { Component } from 'react';
import Station from './Station.js';
import Search from './Search.js';
import Divider from '@material-ui/core/Divider';

class SidePanel extends Component {
    render() {
        return (
            <div style={{ height: "90vh", width: "25%", position: "absolute", "z-index": "2", "background-color": "white", "margin-top": "5vh" }}>
                <Search onSearchChange={this.props.onSearchChange}></Search>
                { this.props.station && 
                    <div>
                        <Divider style={{ "margin-top": 10 }}/>
                        <Station station={this.props.station} />
                    </div>
                }
            </div>
        )
    }
}

export default SidePanel;