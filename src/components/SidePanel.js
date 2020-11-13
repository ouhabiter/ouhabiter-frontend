import React, { Component } from 'react';
import './SidePanel.css'
import Station from './Station.js';
import Search from './Search.js';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';

class SidePanel extends Component {
    render() {
        return (
            <Box p={1} className="SidePanel">
                <Search onSearchChange={this.props.onSearchChange}></Search>
                { this.props.station && 
                    <div>
                        <Box m={2}>
                            <Divider />
                        </Box>
                        <Station station={this.props.station} />
                    </div>
                }
            </Box>
        )
    }
}

export default SidePanel;