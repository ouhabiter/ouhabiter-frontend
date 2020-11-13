import React, { Component } from 'react';
import './SidePanel.css'
import Station from './Station.js';
import Search from './Search.js';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

class SidePanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchActive: true
        }
        this.handleCloseStation = this.handleCloseStation.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (
            !this.props.station ||
            (this.props.station.id != prevProps.station.id)
        ) {
            this.setState({
                searchActive: false
            });
        }
    }

    handleCloseStation() {
        this.setState({
            searchActive: true
        });
    }

    render() {
        return (
            <Box p={1} className="SidePanel">
                <Collapse in={this.state.searchActive}>
                    <Search onSearchChange={this.props.onSearchChange}></Search>
                </Collapse>
                { !this.state.searchActive &&
                    <Box m={2}>
                        <Box display="flex" justifyContent="flex-end">
                            <IconButton onClick={this.handleCloseStation}><CloseIcon /></IconButton>
                        </Box>
                        <Station station={this.props.station} />
                    </Box>
                }
            </Box>
        )
    }
}

export default SidePanel;