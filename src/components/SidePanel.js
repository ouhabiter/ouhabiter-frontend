import React, { Component } from 'react';
import './SidePanel.css'
import Station from './Station.js';
import Search from './Search.js';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import { withRouter } from "react-router-dom";
import stationService from '../services/StationService';
import HistoryHelper from '../helpers/HistoryHelper';

class SidePanel extends Component {
    constructor(props) {
        super(props);
        this.handleCloseStation = this.handleCloseStation.bind(this);
        this.state = {
            searchActive: true,
            station: null,
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.destination && !this.props.destination) { // no destination anymore
            this.setState({
                searchActive: true,
                station: null,
            });
        } else if (
            (!prevProps.destination && this.props.destination) || // first destination
            (prevProps.destination !== this.props.destination) // new destination
        ) {
            let station = stationService.getStationBySlug(this.props.destination);
            this.setState({
                searchActive: false,
                station: station
            });
        }
    }

    handleCloseStation() {
        HistoryHelper.setDestination(null);
        this.setState({
            searchActive: true
        });
    }

    render() {
        return (
            <Box pl={1} className="SidePanel">
                <img alt="logo" src={process.env.PUBLIC_URL + "/logo.png"} width="30%"/>
                <Collapse in={this.state.searchActive}>
                    <Search onSearchChange={this.props.onSearchChange}></Search>
                </Collapse>
                { !this.state.searchActive &&
                    <Box m={2}>
                        <Box display="flex" justifyContent="flex-end">
                            <IconButton onClick={this.handleCloseStation}><CloseIcon /></IconButton>
                        </Box>
                        <Station station={this.state.station} />
                    </Box>
                }
            </Box>
        )
    }
}

export default withRouter(SidePanel);
