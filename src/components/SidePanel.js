import React, { Component } from 'react';
import Station from './Station.js';
import Search from './Search.js';
import Divider from '@material-ui/core/Divider';

class SidePanel extends Component {
    render() {
        return (
            <div style={{
                height: "78vh",
                width: "20%",
                position: "absolute",
                "z-index": "2",
                "background-color": "white",
                "margin-top": "12vh",
                padding: 10,
                "box-shadow": "3px 3px 3px #cccccc"
            }}>
                <Search onSearchChange={this.props.onSearchChange}></Search>
                { this.props.station && 
                    <div>
                        <Divider style={{ "margin-top": 20, "margin-bottom": 10 }}/>
                        <Station station={this.props.station} />
                    </div>
                }
            </div>
        )
    }
}

export default SidePanel;